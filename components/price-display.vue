<script setup lang="ts">
interface Props {
    product: Product
}
const props = withDefaults(defineProps<Props>(), {})


const price = ref<number | null>()
const currency = ref("")
if (props.product?.extraData?.price?.value) {
    try {
        price.value = parseFloat(props.product.extraData.price.value)
        currency.value = props.product.extraData.price.currency
    } catch { }
} else if (props.product.data?.price) {
    try {
        price.value = parseFloat(props.product.data.price.value)
        currency.value = props.product.data.price.currency
    } catch { }
}

const salePrice = ref<number | null>()
const saleCurrency = ref("")
if (props.product?.extraData?.salePrice) {
    try {
        salePrice.value = parseFloat(props.product.extraData.salePrice.value)
        saleCurrency.value = props.product.extraData.salePrice.currency
    } catch { }
} else if (props.product?.data?.salePrice) {
    try {
        salePrice.value = parseFloat(props.product.data.salePrice.value)
        saleCurrency.value = props.product.data.salePrice.currency
    } catch { }
}

const displaySalePrice = ref(false)
const priceDifference = ref<number | null>(null)

if (price.value != null && salePrice.value != null && price.value > salePrice.value && price.value > 0) {
    displaySalePrice.value = true
    priceDifference.value = Math.round(100 * (price.value - salePrice.value) / price.value)
}

const priceIntegerPart = computed(() => itemPart(props.product.data.price?.value, '.', 0));
const priceDecimalPart = computed(() => itemPart(props.product.data.price?.value, '.', 1));

const salePriceIntegerPart = computed(() => itemPart(props.product.data.salePrice?.value, '.', 0));
const salePriceDecimalPart = computed(() => itemPart(props.product.data.salePrice?.value, '.', 1));

</script>

<template>
    <slot name="sale-price" v-if="displaySalePrice" :price="price" :currency="currency" :sale-price="salePrice"
        :sale-currency="saleCurrency" :price-difference="priceDifference" :sale-price-integer-part="salePriceIntegerPart"
        :sale-price-decimal-part="salePriceDecimalPart" :price-integer-part="priceIntegerPart"
        :price-decimal-part="priceDecimalPart">
        {{ salePrice }} {{ saleCurrency }} <span class="line-through"> {{ price }} {{ currency }}</span>-{{ priceDifference
        }}%
    </slot>

    <slot name="price" v-else :price="price" :currency="currency" :price-integer-part="priceIntegerPart"
        :price-decimal-part="priceDecimalPart">
        {{ price }} {{ currency }}
    </slot>
</template>