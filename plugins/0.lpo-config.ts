function StringLoader(v: string): string {
    return v
}

function JSONLoader(v: string): any {
    try {
        return JSON.parse(v)
    } catch (err) {
        console.debug(err)
    }
}

export default defineNuxtPlugin(() => {
    /**
     * LPOConfig is user modified configuration that can be set in the backoffice.
     * you can also set the lpoConfig locally in the nuxt.config.ts file of the LP.
     */

    const config = useRuntimeConfig()
    let lpoConfig: Partial<LPOConfig> = {}

    if (process.env.NODE_ENV === "development") {
        lpoConfig = config.public.devLpoConfig as typeof lpoConfig
    } else if (window.__LPO_CONFIG__ !== undefined) {
        // Prod env reads config from the data injected into the window object when LP is served.
        const fieldLoaders: Record<keyof LPOConfig, (v: string) => any> = {
            variation: StringLoader,
            locale: StringLoader,
            banners: JSONLoader,
            bannerBackground: StringLoader,
            bannerColor: StringLoader,
            gtm: JSONLoader,
            onetrust: JSONLoader,
            didomi: JSONLoader,
            messages: JSONLoader,
            numberFormats: JSONLoader,
            menu: JSONLoader,
            subMenu: JSONLoader,
            footerColumns: JSONLoader,
            footerItems: JSONLoader,
            crossSellData: JSONLoader,
            mirroredDomainOverride: StringLoader,
            useLightMainProduct: JSONLoader,
            customerSpecific: JSONLoader,
            cssVariables: JSONLoader,
            extraReco: StringLoader,
            colorData: JSONLoader,
            mainRecoParams: JSONLoader,
            sliderRecoParams: JSONLoader,
            searchRecoParams: JSONLoader,

            breadcrumbs: JSONLoader,
            carousel: JSONLoader,
            accessibilityVariant: JSONLoader,
        }

        try {
            for (let field of ((window.__LPO_CONFIG__).fields ?? [])) {
                if (!field.active) {
                    continue
                }

                let fieldLoader = fieldLoaders[field.name]
                if (fieldLoader) {
                    lpoConfig[field.name] = fieldLoader(field.value)
                } else {
                    console.debug("skipping undefined lpo config field", field.name)
                }
            }
        } catch (e) {
            console.error("invalid lpo config");
        }
    }

    // Pop a decpreciation warning is the nuxt config has a field also in the LPO config.
    if (process.env.NODE_ENV === "development") {
        class DepreciationError extends Error {
            constructor(message: string, ...params: any[]) {
                super(message, ...params);
                this.name = "DepreciationError";
            }
        }

        Object.keys(config.public).forEach(c => {
            if (!lpoConfig.hasOwnProperty(c)) {
                return
            }

            console.warn(`USING DEV VALUE: ${c} -> "${lpoConfig[c as keyof LPOConfig]}"`)
            throw new DepreciationError(`DEPRECATED: "${c}" has been found in the nuxt.config but is now handled by the LPO config`)
        })
    }

    return {
        provide: {
            lpoConfig: lpoConfig
        }
    }
})