# dataiads-nuxt-module

Generic blocks for building Dataïads landing pages

## installation
First install package using `yarn add dataiads-nuxt-plugin`.

Enable the module by adding it to your `nuxt.config.ts` modules. All module elements are loaded by default, but plugins/components can be specifically selected.
```
export default defineNuxtConfig({
  modules: [
    "dataiads-nuxt-module"
  ],

  dataiadsNuxtModule: {
    lpoDomain: "https://lpo-demo.dataiads.io",
    mirroredDomain: "https://shop.dataiads.io",

    // optional
    gtmPlugin: true,
    googleFontsPlugin: false
  }
})
```

## Module configuration configuration
Settings  provided inside `dataiadsNuxtModule` in `nuxt.config.ts`

|key|default|description
| - | - | - |
| `gtmPlugin` | `true` | enable GTM plugin
| `googleFontsPlugin` | `true` | enable Google Fonts plugin


## Runtime configuration

All settings should be provided inside `config.public` in `nuxt.config.ts` file.


|key|default|description
| - | - | - |
| `gtm.id` | | provide id to inject GTM snippet in the page
| `googleFonts[].family` | | Google fonts family to load
| `googleFonts[].weights` | | weights to load for this Google Font family


## Plugins

### GTM

## Components

## Composable