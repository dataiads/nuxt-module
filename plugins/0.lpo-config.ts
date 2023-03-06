interface InlineLPOConfig {
    name: string,
    isDefault: string,
    PublishUp: Date | null,
    PublishDown: Date | null,
    fields: InlineLPOConfigField[],
}
  
interface InlineLPOConfigField {
    name: string,
    type: string,
    value: string,
    active: boolean,
    updatedAt: Date
} 

export default defineNuxtPlugin(() => {
    /**
     * LPOConfig is user modified configuration that can be set in the backoffice.
     * you can also set the lpoConfig locally in the nuxt.config.ts file of the LP.
     * 
     */
    
    const config = useRuntimeConfig()
    let lpoConfig: LPOConfig = {}
    
    // Dev env reads config from local nuxt.config.
    if (process.env.NODE_ENV === "development") {
        lpoConfig = config.public.devLpoConfig
    } else if (window.__LPO_CONFIG__) {
        // Prod env reads config from the data injected into the window object when LP is served.

        try {
            for (let field of (window.__LPO_CONFIG__ as InlineLPOConfig).fields) {
                if (!field.active) {
                    continue
                }
    
                // TODO: Update here when adding a config field to this template.
                if (field.name === "variation") {
                    lpoConfig.variation = field.value
                } else if (field.name === "locale") {
                    lpoConfig.locale = field.value
                } else if (field.name === 'banners') {
                    try {
                        lpoConfig.banners = JSON.parse(field.value)
                    } catch(e) {}
                } else if (field.name === 'gtm') {
                    try {
                        lpoConfig.gtm = JSON.parse(field.value)
                    } catch(e) {}
                } else if (field.name === 'onetrust') {
                    try {
                        lpoConfig.onetrust = JSON.parse(field.value)
                    } catch(e) {}
                }
            }
        } catch (e) {
            console.error("Invalid LPO config");
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
            
            console.warn(`USING DEV VALUE: ${c} -> "${lpoConfig[c]}"`)
            throw new DepreciationError(`DEPRECATED: "${c}" has been found in the nuxt.config but is now handled by the LPO config`)
        })
    }

    return {
        provide: {
            lpoConfig: lpoConfig
        }
    }
})