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

## Module configuration
Settings provided inside `dataiadsNuxtModule` in `nuxt.config.ts`

|key|default|description
| - | - | - |
| `gtmPlugin` | `true` | enable GTM plugin
| `googleFontsPlugin` | `true` | enable Google Fonts plugin
| `axeptio` | `true` | enable Axeptio plugin


## Available composables
* `useProduct` a shortcut to access the main product data stored inside a global state. data is automatically fetched on application startup.
* `useCollectorData` a shortcut to access the global collector data stored inside a global state. data is automatically fetched on application startup.
* `getCustomAttr`, `getCustomAttrInt`, `getCustomAttrFloat`, `getCustomAttrJSON` to access product custom attributes
* `salePriceDifference` to get a products regular/sale price difference as a percentage
* `mask` a utility function to extract parts of a string using a regular expression
* `isSafeLink` a utility function to check that a links redirects to the mirrored domain


## Plugins
### Core
Handles page initialization, error handling configuration and initial page data load.
Provides the following functions:
* `fetchProductRecommendations` to retrieve product recommendations from Dataïads api
* `errorRedirect` to fallback on mirrored domain product page when a critical error occurs
* `reportError` to report an error to Dataïads api

This plugin cannot be disabled.

### Google Fonts
Loads Google Fonts on the page. The requested fonts must be listed in the runtime configuration using `googleFonts` attribute.
```
export default defineNuxtConfig({
  modules: [
    "dataiads-nuxt-module"
  ],

  dataiadsNuxtModule: {
    lpoDomain: "https://lpo-demo.dataiads.io",
    mirroredDomain: "https://shop.dataiads.io",
  },

  config: {
    public: {
        googleFonts: [
            { family: "Roboto", weights: ["600", "800"] }
        ]
    }
  }
})
```

### GTM
Inject GTM snippet in the page.
```
export default defineNuxtConfig({
  modules: [
    "dataiads-nuxt-module"
  ],

  dataiadsNuxtModule: {
    lpoDomain: "https://lpo-demo.dataiads.io",
    mirroredDomain: "https://shop.dataiads.io",
  },

  config: {
    public: {
        gtm: { id: "FOOBAR" }
    }
  }
})
```

### Axeptio
Inject Axeptio snippet in the page. `clientId` is mandatory. All other attributes are also injected in the configuration object.

```
export default defineNuxtConfig({
  modules: [
    "dataiads-nuxt-module"
  ],

  dataiadsNuxtModule: {
    lpoDomain: "https://lpo-demo.dataiads.io",
    mirroredDomain: "https://shop.dataiads.io",
  },

  config: {
    public: {
        axeptio: { clientId: "123", otherSetting: "value" }
    }
  }
})
```

## Components
todo

## Layouts
todo
