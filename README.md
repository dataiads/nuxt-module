# dataiads-nuxt-layer

Generic layer for building Dataïads landing pages

## installation
First install package using `yarn add dataiads-nuxt-layer`.

Update your ts config to use the layer.

```
export default defineNuxtConfig({
  ssr: false,

  typescript: {
    strict: true,
  },

  extends: [
    "dataiads-nuxt-layer"
  ],

  runtimeConfig: {
    public: {
      lpoDomain: "https://lpo-demo.dataiads.io",
      mirroredDomain: "https://shop.dataiads.io",
    }
  }
})
```

## Available composables
* `useProduct` a shortcut to access the main product data stored inside a global state. data is automatically fetched on application startup.
* `useCollectorData` a shortcut to access the global collector data stored inside a global state. data is automatically fetched on application startup.
* `getCustomAttr`, `getCustomAttrInt`, `getCustomAttrFloat`, `getCustomAttrJSON` to access product custom attributes
* `salePriceDifference` to get a products regular/sale price difference as a percentage
* `mask` a utility function to extract parts of a string using a regular expression


## Plugins
### Core
Handles page initialization, error handling configuration and initial page data load.
Provides the following functions:
* `$fetchProductRecommendations` to retrieve product recommendations from Dataïads api
* `$errorRedirect` to fallback on mirrored domain product page when a critical error occurs
* `$reportError` to report an error to Dataïads api

This plugin cannot be disabled.

### Urls
Exposes URL related functions
* `oriUrl(link: string, query?: Record<string, string>): string` forces mirrored domain from runtime configuration on a link, with optional extra query paramaeters.
* `isSafeLink(link: string): boolean` a utility function to check that a links redirects to the mirrored domain

### Google Fonts
Loads Google Fonts on the page. The requested fonts must be listed in the runtime configuration using `googleFonts` attribute.
```
export default defineNuxtConfig({
  runtimeConfig: {
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
  runtimeConfig: {
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
  runtimeConfig: {
    public: {
        axeptio: { clientId: "123", otherSetting: "value" }
    }
  }
})
```

## Components

### Image
Display images from remote sources using Dataïads caching proxy servers and CDN.
```
<Image src="https://shop.dataiads.io/assets/product.png" height="300" width="400"/>
```
Can be disabled using `runtimeConfig.public.optimizeImageLoad` flag in nuxt options.



## Layouts


## TODO
* Optimized image load
* Filters
* LIA
* I18
* Ori-URL
* Components
* Layouts
