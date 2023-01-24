
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export interface ModuleOptions {
  // mandatory settings
  lpoDomain: string
  mirroredDomain: string

  // optional flags
  gtmPlugin: boolean
}

export interface GtmConfig {
  id: string
}

export interface ModulePublicRuntimeConfig {
  gtm: GtmConfig
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

    // setup development proxy
    nuxt.options.nitro = {
      devProxy: {
        "/api/": {
          target: (process.env.PROXY_URL || moduleOptions.lpoDomain) + "/api/",
          changeOrigin: true,
        },
      },
    }

    // load optional plugins
    if (moduleOptions.gtmPlugin) {
      addPlugin(resolve('runtime/plugins/gtm'))
    }
  }
})