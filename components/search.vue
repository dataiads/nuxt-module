<script setup lang="ts">
interface Props {
    // mirrored site search url
    redirectUrl: string,

    // mirrored site search value query param on search url
    redirectSearchParam?: string,

    // allow search to use ajax lookup of similar products
    lpoSearchReccomendations?: boolean,

    // Display search results in either vertical or horizontal
    direction?: "horizontal" | "vertical",

    // Number of products to display
    limit?: number

    // Fields to search in
    searchFields?: string[]

    // Search sort order
    sort?: string

    // deduplicate search results
    deduplicate?: string
}

const props = withDefaults(defineProps<Props>(), {
    redirectSearchParam: "",
    lpoSearchReccomendations: true,
    direction: "vertical",
    limit: 4,
    searchFields: () => ["title"],
    sort: "random",
    deduplicate: "itemGroupId"
})

const value = useState('search.value', () => "")

const searchFilters = computed(() => {
    return JSON.stringify([
        props.searchFields.map(field => (
            {
                criteria: field,
                operator: "CONTAINS_ALL_CI",
                value: value.value.split(" ").join(",")
            }
        ))
    ])
})


// on submit, redirect to mirrored domain search url
const submit = () => {
    if (value.value && props.redirectUrl) {
        let url = new URL(props.redirectUrl)

        // If no search param is specified, search by appending to the URL path.
        if (props.redirectSearchParam === "") {
            url.pathname = url.pathname + encodeURIComponent(value.value)
        } else {
            url.searchParams.set(props.redirectSearchParam, value.value)
        }
        window.location.href = url.toString()
    }
}

// -- Search suggestions --
const fetchSearchProducts = async () => {
    const { data: searchRecoProductsFetch } = await useFetch("/api/recommendations/default/filtered", {
        params: {
            productId: product.value.id,
            limit: props.limit,
            sort: props.sort?.startsWith("-") ? props.sort.substring(1) : props.sort,
            sortDesc: props.sort?.startsWith("-") ?? false,
            filters: searchFilters.value,
            deduplicate: props.deduplicate
        }
    })
    return searchRecoProductsFetch.value
}

const searchRecoProducts: Ref<Product[]> = ref([])


const product = useProduct()
const searchValue: Ref<string> = refDebounced(value, 500) // https://vueuse.org/shared/refDebounced/#refdebounced
watch(searchValue, async () => {
    if (searchValue.value) {
        searchRecoProducts.value = await fetchSearchProducts()
    } else {
        searchRecoProducts.value = []
    }
})

// input event handler for slot input
const input = (event: Event) => {
    value.value = (event.target as HTMLInputElement).value
}
</script>

<template>
    <form @submit.prevent="submit">
        <slot :value="value" :input="input">
            <input :value="value" @input="input" placeholder="search...">
        </slot>
    </form>
    <div id="search-slider" v-if="lpoSearchReccomendations && searchRecoProducts?.length">
        <div class="absolute z-10">
            <slot name="search-slider-header"></slot>
            <Slider :items="searchRecoProducts" :autoscroll="false" :direction="direction">
                <template #item="{ item }">
                    <slot name="search-slider-item" :key="item.id" :item="item">
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
                        </div>
                    </slot>
                </template>
                <template #previous-btn="scope">
                    <slot name="search-slider-previous-btn" v-bind="scope">
                        <div></div>
                    </slot>
                </template>
                <template #next-btn="scope">
                    <slot name="search-slider-next-btn" v-bind="scope">
                        <div></div>
                    </slot>
                </template>
            </Slider>
        </div>
    </div>
</template>