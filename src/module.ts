
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export interface ModuleOptions {
  // mandatory settings
  lpoDomain: string
  mirroredDomain: string

  // optional flags
  gtmPlugin: boolean
  googleFontsPlugin: boolean
}

export interface TimeoutConfig {
  pageDataLoad: number
  initialPageLoad: number
}

export interface GtmConfig {
  id: string
}

export interface GoogleFontConfig {
  family: string
  weights: string[]
}

export interface ModulePublicRuntimeConfig {
  lpoDomain: string
  mirroredDomain: string
  lang: string

  timeout: TimeoutConfig
  gtm: GtmConfig
  googleFonts: GoogleFontConfig[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    // Usually  npm package name of your module
    name: 'dataiads-nuxt-module',
    // The key in `nuxt.config` that holds your module options
    configKey: 'dataiadsNuxtModule',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options for your module
  defaults: {
    lpoDomain: null,
    mirroredDomain: null,
    gtmPlugin: true,
  },
  hooks: {},
  async setup(moduleOptions, nuxt) {
    // check minimal configuration
    if (!moduleOptions.lpoDomain) {
      throw new Error("lpoDomain must be provided")
    }
    if (!moduleOptions.mirroredDomain) {
      throw new Error("mirroredDomain must be provided")
    }

    // inject runtimeConfig defaults
    nuxt.options.runtimeConfig.public.lpoDomain = moduleOptions.lpoDomain
    nuxt.options.runtimeConfig.public.mirroredDomain = moduleOptions.mirroredDomain

    if (!nuxt.options.runtimeConfig.public.timeouts) {
      nuxt.options.runtimeConfig.public.timeout = {}
    }
    nuxt.options.runtimeConfig.public.timeout.pageDataLoad = 1000
    nuxt.options.runtimeConfig.public.timeout.initialPageLoad = 5000

    // production build configuration
    nuxt.options.app.cdnURL = process.env.CDN_URL || ""

    // development environment configuration
    if (!nuxt.options.nitro) {
      nuxt.options.nitro = {}
    }
    nuxt.options.nitro.devProxy = {
      "/api/": {
        target: (process.env.PROXY_URL || moduleOptions.lpoDomain) + "/api/",
        changeOrigin: true,
      },
    }

    // Core plugins
    addPlugin(resolve('runtime/plugins/core'))

    // TODO components (filter-checkbox, searchbar, quantity selector)
    // TODO composable (product helpers, etc)

    // load optional plugins
    if (moduleOptions.gtmPlugin) {
      addPlugin(resolve('runtime/plugins/gtm'))
    }
    if (moduleOptions.googleFontsPlugin) {
      addPlugin(resolve('runtime/plugins/google-fonts'))
    }
    //TODO googleFontsPlugin
    //TODO axceptio
    //TODO imageLoader
  }
})