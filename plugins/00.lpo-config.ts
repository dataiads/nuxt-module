const StringLoader = (v: string, _?: string) => v

const JSONLoader = (v: string, debugInfo?: string) => {
  try {
    return JSON.parse(v)
  } catch (err) {
    console.debug(debugInfo || '', err)
  }
}

const useUrlConfig = () => {
  const route = useRoute()
  const inlineLPOparams = route.params?.[
    'lpo-config'
  ] as Partial<InlineLPOConfig>

  // remove this from URL
  if (route.params?.['lpo-config']) {
    delete route.params['lpo-config']
  }
  return inlineLPOparams
}

export default defineNuxtPlugin(async () => {
  /**
   * LPOConfig is user modified configuration that can be set in the backoffice.
   * you can also set the lpoConfig locally in the nuxt.config.ts file of the LP.
   */
  const inlineLPOConfig = process.server
    ? useUrlConfig()
    : window.__LPO_CONFIG__

  const config = useRuntimeConfig()
  let lpoConfig: Partial<LPOConfig> = {}


  if (process.env.NODE_ENV === 'development') {
    if (config.public.liveConfigUrl) {
      const cfg = await $fetch<InlineLPOConfig>(config.public.liveConfigUrl as string)
      lpoConfig = deserializeServerConfig(cfg)
      console.log('Loaded live config from ', config.public.liveConfigUrl)
    } else {
      lpoConfig = config.public.devLpoConfig as typeof lpoConfig
    }
  } else if (inlineLPOConfig !== undefined) {
    lpoConfig = deserializeServerConfig(inlineLPOConfig)
  }

  // Pop a decpreciation warning is the nuxt config has a field also in the LPO config.
  if (process.env.NODE_ENV === 'development') {
    class DepreciationError extends Error {
      constructor (message: string, ...params: any[]) {
        super(message, ...params)
        this.name = 'DepreciationError'
      }
    }

    Object.keys(config.public).forEach((c) => {
      if (!lpoConfig.hasOwnProperty(c)) {
        return
      }

      console.warn(
        `USING DEV VALUE: ${c} -> "${lpoConfig[c as keyof LPOConfig]}"`
      )
      throw new DepreciationError(
        `DEPRECATED: "${c}" has been found in the nuxt.config but is now handled by the LPO config`
      )
    })
  }

  return {
    provide: {
      lpoConfig: lpoConfig,
      dynamicLpoConfig: ref(lpoConfig)
    }
  }
})

function deserializeServerConfig (
  inlineLPOConfig: Partial<InlineLPOConfig>
): Partial<LPOConfig> {
  const lpoConfig = {}
  // Prod env reads config from the data injected into the window object when LP is served.
  const fieldLoaders: Record<keyof LPOConfig, (v: string) => any> = {
    variation: StringLoader,
    locale: StringLoader,
    banners: JSONLoader,
    imageBanner: JSONLoader,
    bannerBackground: StringLoader,
    bannerColor: StringLoader,
    gtm: JSONLoader,
    onetrust: JSONLoader,
    axeptio: JSONLoader,
    didomi: JSONLoader,
    messages: JSONLoader,
    numberFormats: JSONLoader,
    menu: JSONLoader,
    subMenu: JSONLoader,
    footerColumns: JSONLoader,
    footerItems: JSONLoader,
    crossSellData: JSONLoader,
    crossSellKey: JSONLoader,
    mirroredDomainOverride: StringLoader,
    useLightMainProduct: JSONLoader,
    customerSpecific: JSONLoader,
    cssVariables: JSONLoader,
    extraReco: StringLoader,
    colorData: JSONLoader,
    mainRecoParams: JSONLoader,
    sliderRecoParams: JSONLoader,
    searchRecoParams: JSONLoader,
    customScripts: JSONLoader,
    accessibilityVariant: JSONLoader,
    productHook: StringLoader,
    filterParams: JSONLoader,
    customLayout: JSONLoader,
    // unused but kept for compat compatibility
    breadcrumbs: JSONLoader,
    carousel: JSONLoader
  }

  try {
    for (const field of inlineLPOConfig.fields ?? []) {
      if (!field.active) {
        continue
      }

      const fieldLoader = fieldLoaders[field.name]
      if (fieldLoader) {
        // @ts-ignore: ts2590 error due to LPOConfig type being too complex. No true fix has been found yet. see: https://github.com/microsoft/TypeScript/issues/45149
        lpoConfig[field.name] = fieldLoader(field.value, `field ${field.name}:`)
      } else {
        console.debug('skipping undefined lpo config field', field.name)
      }
    }
  } catch (e) {
    console.error('invalid lpo config')
  }
  return lpoConfig
}
