## Components

### Image
Display images from remote sources using Dataïads caching proxy servers and CDN.
``` html
<Image src="https://shop.dataiads.io/assets/product.png" height="300" width="400"/>
```
Can be disabled using `runtimeConfig.public.optimizeImageLoad` flag in nuxt options.


### Product Image
Main product image display. Shows the product primary image and any other additional images on the side.
Style can be customized using the two image slots or using class props
``` Vue
<template>
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
</template>
```

### Slider
Horizontal or vertical slider with next / previous buttons on large screens. Can be toggled to autoscroll.
Buttons and items can be configured using slots and class props
``` Vue
<template>
  <Slider :items="items" autoscroll>
      <template #item="{item}">{{ item.name }}</template>
      <template #previous-btn="scope"> prev </template>
      <template #next-btn="scope"> next </template>
  </Slider>
</template>
```

### Pagination
Display pagination for `Filter` system. Style can be customized using class props on top level element or props for buttons.
``` Vue
<template>
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
</template>
```

### Search
A search input that redirects to the mirrored website search page with the value as a parameter. A custom input can be provided as a slot
``` html
<Search redirect-url="https://shop.dataiads.io/search?lang=fr_FR" redirect-search-param="q" v-slot="{ value, input }">
  <input :value="value" @input="input" placeholder="rechercher...">
</Search>
```

### Reviews star
Display a a product review as starts. Use slots to customize displayed stars
``` Vue
<template>
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
</template>
```

### Price display
Display product price. Handles sale prices and collected data.
``` Vue
<template>
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
</template>
```