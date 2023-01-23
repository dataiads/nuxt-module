
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export interface ModuleOptions {

}



export default defineNuxtModule<ModuleOptions>({
  meta: {
    // Usually  npm package name of your module
    name: '@dataiads/nuxt-module',
    // The key in `nuxt.config` that holds your module options
    configKey: 'dataiads',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  // Default configuration options for your module
  defaults: {},
  hooks: {},
  async setup(moduleOptions, nuxt) {

    addPlugin(resolve('runtime/gtm'))
  }
})