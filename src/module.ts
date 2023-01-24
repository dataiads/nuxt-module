
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export interface ModuleOptions {
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
    gtmPlugin: true,
  },
  hooks: {},
  async setup(moduleOptions, nuxt) {

    if (moduleOptions.gtmPlugin) {
      addPlugin(resolve('runtime/gtm'))
    }
  }
})