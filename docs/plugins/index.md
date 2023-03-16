---
nav_order: 4
---
# Plugins
## LPO Config
Handles loading the LPOConfig available for use in the composable `useLpoConfig`.
This currently allows you to modify only a few fields for the time being, but will soon be open to any field, allowing you to make your custom configurations be set via the backoffice.

Other plugins may rely on this for execution, it should therefore never be disabled.

## Core
Handles page initialization, error handling configuration and initial page data load.
Provides the following functions:
* `$fetchProductRecommendations` to retrieve product recommendations from Dataïads api
* `$errorRedirect` to fallback on mirrored domain product page when a critical error occurs
* `$reportError` to report an error to Dataïads api

These plugins cannot be disabled.

## Urls
Exposes URL related functions
* `oriUrl(link: string, query?: Record<string, string>): string` forces mirrored domain from runtime configuration on a link, with optional extra query paramaeters.
* `isSafeLink(link: string): boolean` a utility function to check that a links redirects to the mirrored domain
* `addToCartUrl(searchParams?: Record<string, string>): string` 

## Google Fonts
Loads Google Fonts on the page. The requested fonts must be listed in the runtime configuration using `googleFonts` attribute.
``` javascript
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

## I18n
Enable internationalization using vue-i18n package. 
Translation data must be available inside `locales/` directory. When adding a new locale data file, dont forget to import it inside `locales/index.ts`.

Set a locale value to enable this plugin:

**In production:**
Toggle the locale by changing its value in the backoffice.
This can be found on the Temlpates page, by editing the config of the concerend template.

**In dev env:**
``` javascript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      devLPOConfig: {
        locale: "fr-fr"
      }
    }
  }
})
```

Provides `$t()` helper in templates


## GTM
Inject GTM snippet in the page.
``` javascript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
        gtm: { id: "FOOBAR" }
    }
  }
})
```

## Axeptio
Inject Axeptio snippet in the page. `clientId` is mandatory. All other attributes are also injected in the configuration object.

``` javascript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
        axeptio: { clientId: "123", otherSetting: "value" }
    }
  }
})
```