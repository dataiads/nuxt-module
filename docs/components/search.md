---
parent: Components
---

## Search

The Search component allows you to implement a search bar with search suggestions that will redirect the user to the mirrored site's search page with the searched value in the URL.

## Example
``` vue
<template>
  <Search redirect-url="https://shop.dataiads.io/search?lang=fr_FR" redirect-search-param="q">
    
    <!-- The search bar -->
    <template v-slot="{ value, input }">
        <input :value="value" @input="input" placeholder="rechercher...">
    </template>

    <!-- the products reccomended when typing -->
    <template #search-slider-item="{ item }">
        <div class="bg-white flex content-center max-w-[540px] p-2.5">
            <figure class="relative max-w-sm cursor-pointer pr-1 h-[120px]">
                <a aria-label="view search result" :href="$oriUrl(item.data.link)">
                    <img :src="item.data.imageLink" width="120" height="120" class="mx-auto h-[120px] w-auto" loading="lazy"
                    alt="recommended product image">
                </a>
            </figure>
            <div class="flex flex-col flex-1 py-3 pl-2">
                <a :href="$oriUrl(item.data.link)" class="uppercase font-bold font-custom line-clamp-2 leading-[19px]">{{
                item?.extraData?.title ||
                item.data.title }}</a>

                <div class="flex items-center">
                    <PriceDisplay :product="item">
                        <template #price="{ price }">
                            <span class="text-[15px] font-medium">{{ price }}&euro;</span>
                        </template>
                        <template #sale-price="{ price, salePrice }">
                            <span class="text-[15px] font-medium">{{ salePrice }}&euro;</span>
                            <div class="line-through text-gray-400 text-right ml-1.5 text-[13px] leading-[14px]">{{ price }}&euro;</div>
                        </template>
                    </PriceDisplay>
                </div>
            </div>
        </div>
    </template>
  </Search>
</template>
```


## Properties

| Param | Required? | Default value | Usage |
| --- | --- | --- | --- |
| `redirectUrl` | ✅ | | The mirrored site's search URL to redirect to when submitting search. For example `https://www.randomshop.com/search`. |
| `redirectSearchParam` | ❌ | | The URL param to use when submitting your search. For example if you set `q` submitting search will go to `https://www.randomshop.com/search?q=yoursearchgoeshere`. If left empty, the search will be appended to the URL, for example if the mirrored site's search route looks like `https://www.randomshop.com/search/yoursearchgoeshere` |
| `lpoSearchReccomendations` | ❌ | `true` | Set this to false if you want to disable search suggestions. |
| `direction` | ❌ | `vertical` | Set this to `horizontal` if you want to display search suggestions as a left to right slider. |
| `limit` | ❌ | `4` | The number of search suggestions to get. |

## Slots

### Search input `#default`

The default slot is the search bar, this is where you can style and shape the `<input>` and corresponding button if you wish.

> NOTE: The search bar slot is wrapped in a `<form>` tag. Meaning you can add a button with a `type="submit"` to this slot in order to have a search button.

#### Default value
``` vue
<input :value="value" @input="input" placeholder="search..."/>
```

#### Properties

| Prop | type | Usage |
| `value` | `string` | The search value being entered by the user, used for setting the `:value` in the `<input>` element of the search bar. |
| `input` | `function` | The input event handler for the `<input>` element of the search bar |

### Search slider header `#search-slider-header`

This is a small slot for inserting a header to the search suggestions.
For example a bit of text saying `Products matching your search:`

This slot has no props or default value.

### Search slider item `#search-slider-item`

This is where you can style and shape the product suggestions that pop up as the user is typing.
You may use other components in conjunction with this, for exmaple `<PriceDisplay>` to display the products price.

#### Default value
```vue
<template>

<div class="bg-white flex content-center max-w-[540px] p-2.5">
    <div class="flex">
        <div class="pr-1 h-[120px]">
            <figure class="relative max-w-sm cursor-pointer">
                <a aria-label="view search result" :href="$oriUrl(item.data.link)">
                    <img :src="item.data.imageLink" width="120" height="120" class="mx-auto h-[120px] w-auto" loading="lazy"
                    alt="recommended product image">
                </a>
            </figure>
        </div>
        <div class="flex flex-col flex-1 py-3 pl-2">
            <a :href="$oriUrl(item.data.link)" class="uppercase font-bold font-custom line-clamp-2 leading-[19px]">
                {{ item?.extraData?.title || item.data.title }}
            </a>

            <div class="flex items-center">
                <PriceDisplay :product="item">
                    <template #price="{ price }">
                        <span class="text-[15px] font-medium">{{ price }}&euro;</span>
                    </template>
                    <template #sale-price="{ price, salePrice }">
                        <span class="text-[15px] font-medium">{{ salePrice }}&euro;</span>
                        <div class="line-through text-gray-400 text-right ml-1.5 text-[13px] leading-[14px]">{{ price }}&euro;</div>
                    </template>
                </PriceDisplay>
            </div>
        </div>
    </div>
</div>

</template>
```

#### Properties

| Prop | type | Usage |
| --- | --- | --- |
| `item` | `Product` | The product being returned as a suggestion. You can use it just like you would use any other product, accessing it's price, images, collected data, etc. |

### Previous button `#search-slider-previous-btn`

This optionnal button can be used to scroll the search reccomendations.
This works best when the `Search` component is set to `horizontal` mode.

This slot has no props or default value.

### Next button `#search-slider-next-btn`

This optionnal button can be used to scroll the search reccomendations.
This works best when the `Search` component is set to `horizontal` mode.

This slot has no props or default value.
