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
      mirroredDomain: "https://shop.dataiads.io",
    }
  }
})
```

## Available composables

- `useLpoConfig` in production: loads the config provided by the backend. In dev: loads the config found in `runtimeConfig.public.devLpoConfig`.
- `useProduct` a shortcut to access the main product data stored inside a global state. data is automatically fetched on application startup.
- `useCollectorData` a shortcut to access the global collector data stored inside a global state. data is automatically fetched on application startup.
- `getCustomAttr`, `getCustomAttrInt`, `getCustomAttrFloat`, `getCustomAttrJSON` to access product custom attributes
- `salePriceDifference` to get a products regular/sale price difference as a percentage
- `mask` a utility function to extract parts of a string using a regular expression
- `itemPart` a utility that splits a string and returns the requested part based on an index

## Plugins

### LPO Config

Handles loading the LPOConfig available for use in the composable `useLpoConfig`.
This currently allows you to modify only the `locale` and `variation` for the time being, but will soon be open to any field, allowing you to make your app configurable via the backoffice.

Other plugins may rely on this for execution, it should therefore never be disabled.

### Core

Handles page initialization, error handling configuration and initial page data load.
Provides the following functions:

- `$fetchProductRecommendations` to retrieve product recommendations from Dataïads api
- `$errorRedirect` to fallback on mirrored domain product page when a critical error occurs
- `$reportError` to report an error to Dataïads api

These plugins cannot be disabled.

### Urls

Exposes URL related functions

- `oriUrl(link: string, query?: Record<string, string>): string` forces mirrored domain from runtime configuration on a link, with optional extra query paramaeters.
- `isSafeLink(link: string): boolean` a utility function to check that a links redirects to the mirrored domain
- `addToCartUrl(searchParams?: Record<string, string>): string`

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
Set a locale value to enable this plugin, using the `locale` key in LPO Config

Provides `$t()` helper in templates

### GTM

Inject GTM snippet in the page. Configure using `gtm` key in LPO config.

```
{ "id": "FOOBAR" }
```

Multiple GTM instances are supported by providing an array instead of a string.

```
{ "id": ["GTM-1", "GTM-2"] }
```

### OneTrust

Inject Onetrust snippet in the page. Configure using `onetyrust` key in LPO config.

```
{"dataDomainScript": "123456-1234-1234-4321-654321"}
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

### Reviews star

Display a a product review as starts. Use slots to customize displayed stars

```
<StarsRating
  :value="getCustomAttrFloat(product, 'review-value')"
  :max-value="10"
  :count="getCustomAttr(product, 'review-count')"
  class="flex space-x-1 items-center mt-2 my-3 w-full"
>
  <template #star-full>
    <svg class="text-star w-[14px] h-[14px]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  </template>

  <template #star-empty>
    <svg class="text-star_empty w-[14px] h-[14px]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  </template>

  <template #count="{ value, count }">
    <span class="text-xs font-semibold ml-1 text-subtitle">
        {{ value }} <span class="hidden md:inline">{{ count }}</span>
    </span>
  </template>
</StarsRating>
```

### Price display

Display product price. Handles sale prices and collected data.

```
<PriceDisplay :product="product">
  <template #price="{ price, priceIntegerPart, priceDecimalPart }">
    <div class="text-tint-price text-[22px]">{{ price }} €</div>
    <div class="text-secondary mr-6">
      <span class="mx-2">&#x2022;</span> Non remisable
    </div>
  </template>

  <template #sale-price="{ price, salePrice, currency, priceDifference, priceIntegerPart, priceDecimalPart, salePriceIntegerPart, salePriceDecimalPart }">
    <div class="text-tint-price text-[22px]">{{ salePrice }} €</div>
    <div class="line-through text-subtitle ml-2">{{ price }} €</div>
    <div class="badge"> -{{priceDifference}}% </div>
  </template>
</PriceDisplay>
```

### Drawer filters

This enables the opening of filters or any other component in a drawer.
When opened, the scroll on the document body is disabled.

```vue
<template #filters-drawer>
  <Drawer
    class="z-[1001]"
    outsideClass="z-[1000]"
    @clickOutside="() => (openFiltersDrawer = false)"
    :open="openFiltersDrawer"
  >
    <template #drawer-content>
      <div class="w-full">
        <!-- Your custom filters component -->
        <Filters
          :close-drawer="() => (openFiltersDrawer = false)"
          variant="drawer"
          :filter="filter"
        />
      </div>
    </template>
  </Drawer>
</template>
```

### Accordion

This component is an accessible component to use accordion behavior it's highly inspired by nuxtui accordion component

```vue
<Accordion :columns="columns">
  <template #append="{ open }"">
    Some icons ...
  </template>
</Accordion>
```
