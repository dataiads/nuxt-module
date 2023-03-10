<script setup lang="ts">
import { debounce } from "lodash";

interface Props {
    // mirrored site search url
    redirectUrl: string,

    // mirrored site search value query param on search url
    redirectSearchParam?: string,

    // allow search to use ajax lookup of similar products
    lpoSearchReccomendations?: boolean,

    // Display search results in either vertical or horizontal
    direction: "horizontal" | "vertical",

    // Number of products to display
    limit: number
}

const props = withDefaults(defineProps<Props>(), {
    redirectSearchParam: "q",
    lpoSearchReccomendations: true,
    direction: "vertical",
    limit: 4
})

const value = useState('search.value', () => "")

// parse url at load time to make sure its valid
new URL(props.redirectUrl)

// on submit, redirect to mirrored domain search url
const submit = () => {
    if (value.value) {
        let url = new URL(props.redirectUrl)
        url.searchParams.set(props.redirectSearchParam, value.value)
        window.location.href = url.toString()
    }
}

// -- Search suggestions --
const searchValue: Ref<string> = ref("")
const debouncedInput = debounce(() => {
    searchValue.value = value.value
}, 500)
const searchRecoProducts: Ref<Product[]> = ref([])

if (props.lpoSearchReccomendations) {
    const { $fetchProductRecommendations } = useNuxtApp()
    const product = useProduct()

    const searchFilter = computed(() => {
        return JSON.stringify([
            [
                {
                    criteria: "title",
                    operator: "SEARCH",
                    value: searchValue.value,
                }
            ]
        ])
    })

    const { data: searchRecoProductsFetch } = $fetchProductRecommendations("default", "filtered", {
        productId: product.value.id,
        limit: props.limit,
        filters: searchFilter,
    })
    watch(searchRecoProductsFetch, () => {
        if (searchValue.value === "") {
            // Do not show recommendations if search value is empty.
            searchRecoProducts.value = []
            return
        }
        searchRecoProducts.value = searchRecoProductsFetch.value
    })
}


// input event handler for slot input
const input = (event: Event) => {
    value.value = (event.target as HTMLInputElement).value

    // Debouncing here allows us to debounce the reco query being sent, without debouncing user input and creating some lag-like effect.
    if (props.lpoSearchReccomendations) {
        debouncedInput()
    }
}
</script>

<template>
    <form @submit.prevent="submit">
        <slot :value="value" :input="input">
            <input :value="value" @input="input" placeholder="search...">
        </slot>
    </form>
    <div id="search-slider" v-if="lpoSearchReccomendations && searchRecoProducts?.length">
        <div class="absolute">
            <slot name="search-slider-header"></slot>
            <Slider :items="searchRecoProducts" :autoscroll="false" :direction="direction">
                <template #item="{ item }">
                    <slot name="search-slider-item" :key="item.id" :item="item"></slot>
                </template>
                <template #previous-btn="scope">
                    <slot name="search-slider-previous-btn" v-bind="scope"></slot>
                </template>
                <template #next-btn="scope">
                    <slot name="search-slider-next-btn" v-bind="scope"></slot>
                </template>
            </Slider>
        </div>
    </div>
</template>