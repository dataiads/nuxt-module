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
*  `addToCartUrl(searchParams?: Record<string, string>): string` 

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

### I18n
Enable internationalization using vue-i18n package. 
Translation data must be available inside `locales/` directory. When adding a new locale data file, dont forget to import it inside `locales/index.ts`.

Set a locale value to enable this plugin:
```
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      locale: "fr-fr"
    }
  }
})
```

Provides `$t()` helper in templates


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


### Product Image
Main product image display. Shows the product primary image and any other additional images on the side.
Style can be customized using the two image slots or using class props
```
<ProductImage :product="product" :max-additional-images="4"
  class="flex flex-row"
  aside-class="hidden md:flex flex-col flex-nowrap overflow-y-scroll scrollbar-hide"
>
  <template #main-image="{ src, alt }">
    <Image class="mx-auto w-auto" height="400" width="400" :src="src" :alt="alt" ref="ref"/>
  </template>

  <template #aside-image="{ src, alt, active }">
    <Image height="80" width="80" class="border border-transparent mr-2 mb-2 cursor-pointer" :class="{ border: active, 'border-black': active }" :src="src"
      :alt="alt" />
  </template>

  <template #previous-btn>
    <div class="mx-1 p-8 cursor-pointer bg-green-100">&lt;</div> 
  </template>

  <template #next-btn>
    <div class="mx-1 p-8 cursor-pointer bg-green-100">&gt;</div> 
  </template>
</ProductImage>
```

### Slider
Horizontal or vertical slider with next / previous buttons on large screens. Can be toggled to autoscroll.
Buttons and items can be configured using slots and class props
```
<Slider :items="items" autoscroll>
    <template #item="{item}">{{ item.name }}</template>
    <template #previous-btn="scope"> prev </template>
    <template #next-btn="scope"> next </template>
</Slider>
```

### Pagination
Display pagination for `Filter` system. Style can be customized using class props on top level element or props for buttons.
```
<FiltersPagination :filter="filter" :max-visible-buttons="3" class="flex items-center justify-center gap-2">
  <template #previous-button>
    <div class="flex items-center justify-center w-[39px] h-[39px] rounded-full border border-grey3 hover:bg-third hover:border-third hover:text-white">
      <img class="pr-0.5" src="~/assets/icons/chevron-l.svg" width="10" height="" loading="lazy" alt=""/>
    </div>
  </template>

  <template #page-button="{ active, number }">
    <div v-if="active" class="flex items-center justify-center w-[39px] h-[39px] rounded-full border border-transparent text-white bg-secondary hover:bg-secondary hover:cursor-default">{{ number }}</div>
    <div v-else class="flex items-center justify-center w-[39px] h-[39px] rounded-full border border-grey3 hover:bg-third hover:border-third hover:text-white">{{ number }}</div>
  </template>

  <template #next-button>
    <div class="flex items-center justify-center w-[39px] h-[39px] rounded-full border border-grey3 hover:bg-third hover:border-third hover:text-white">
      <img class="pr-0.5" src="~/assets/icons/chevron-r.svg" width="10" height="" loading="lazy" alt=""/>
    </div>
  </template>
</FiltersPagination>
```

### Search
A search input that redirects to the mirrored website search page with the value as a parameter. A custom input can be provided as a slot
```
<Search redirect-url="https://shop.dataiads.io/search?lang=fr_FR" redirect-search-param="q" v-slot="{ value, input }">
  <input :value="value" @input="input" placeholder="rechercher...">
</Search>
```