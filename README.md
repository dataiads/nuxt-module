# dataiads-nuxt-module

Generic blocks for building Dataïads landing pages

## installation
First install package using `yarn add dataiads-nuxt-plugin`.

Enable the module by adding it to your `nuxt.config.ts` modules
```
export default defineNuxtConfig({
  modules: [
    "dataiads-nuxt-module"
  ]
})
```

All module elements are loaded by default, but plugins/components can be specifically selected.
```
export default defineNuxtConfig({
  modules: [
    "dataiads-nuxt-module"
  ],

  dataiadsNuxtModules: {
    gtmPlugin: true,
    googleFontsPlugin: false
  }
})
```

## Public configuration

|key|default|description
| - | - | - |
| `gtm.id` | | provide id to inject GTM snippet in the page


## Plugins

### GTM

## Components

## Composable