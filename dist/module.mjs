import { createResolver, defineNuxtModule, addPlugin } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);
const module = defineNuxtModule({
  meta: {
    // Usually  npm package name of your module
    name: "@dataiads/nuxt-module",
    // The key in `nuxt.config` that holds your module options
    configKey: "dataiads",
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: "^3.0.0"
    }
  },
  // Default configuration options for your module
  defaults: {},
  hooks: {},
  async setup(moduleOptions, nuxt) {
    addPlugin(resolve("./runtime/"));
  }
});

export { module as default };
