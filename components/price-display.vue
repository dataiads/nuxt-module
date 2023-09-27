<script setup lang="ts">
type ProductDataPriceProperty = "price" | "salePrice" | "costOfGoodsSold";

interface Props {
  product: Product;
  priceProperty?: ProductDataPriceProperty;
  salePriceProperty?: ProductDataPriceProperty;
}
const props = withDefaults(defineProps<Props>(), {
  priceProperty: "price",
  salePriceProperty: "salePrice",
});

const lpoConfig = useLpoConfig();

const price = ref<number | null>();
const currency = ref("");
if (props.product?.extraData?.[props.priceProperty]?.value) {
  try {
    price.value = parseFloat(props.product.extraData[props.priceProperty].value);
    currency.value = props.product.extraData[props.priceProperty].currency;
  } catch {}
} else if (props.product.data?.[props.priceProperty]) {
  try {
    price.value = parseFloat(props.product.data[props.priceProperty].value);
    currency.value = props.product.data[props.priceProperty].currency;
  } catch {}
}

const salePrice = ref<number | null>();
const saleCurrency = ref("");
if (props.product?.extraData?.[props.salePriceProperty]) {
  try {
    salePrice.value = parseFloat(props.product.extraData[props.salePriceProperty].value);
    saleCurrency.value = props.product.extraData[props.salePriceProperty].currency;
  } catch {}
} else if (props.product?.data?.[props.salePriceProperty]) {
  try {
    salePrice.value = parseFloat(props.product.data[props.salePriceProperty].value);
    saleCurrency.value = props.product.data[props.salePriceProperty].currency;
  } catch {}
}

const displaySalePrice = ref(false);
const priceDifference = ref<number | null>(null);

if (price.value != null && salePrice.value != null && price.value > salePrice.value && price.value > 0) {
  displaySalePrice.value = true;
  priceDifference.value = Math.round((100 * (price.value - salePrice.value)) / price.value);
}

const priceIntegerPart = computed(() => itemPart(props.product.data.price?.value, ".", 0));
const priceDecimalPart = computed(() => itemPart(props.product.data.price?.value, ".", 1));

const salePriceIntegerPart = computed(() => itemPart(props.product.data.salePrice?.value, ".", 0));
const salePriceDecimalPart = computed(() => itemPart(props.product.data.salePrice?.value, ".", 1));

const localPrice = computed(() => {
  const priceProp = props.product.data[props.priceProperty];
  if (!priceProp || !lpoConfig?.locale) {
    return priceProp?.value;
  }
  try {
    return new Intl.NumberFormat(lpoConfig.locale, { style: "currency", currency: priceProp.currency }).format(parseFloat(priceProp.value));
  } catch (error) {
    return priceProp?.value;
  }
});

const localSalePrice = computed(() => {
  const priceProp = props.product.data[props.salePriceProperty];
  if (!priceProp || !lpoConfig?.locale) {
    return priceProp?.value;
  }
  try {
    return new Intl.NumberFormat(lpoConfig.locale, { style: "currency", currency: priceProp.currency }).format(parseFloat(priceProp.value));
  } catch (error) {
    return priceProp?.value;
  }
});
</script>

<template>
  <slot
    name="sale-price"
    v-if="displaySalePrice"
    :price="price"
    :currency="currency"
    :sale-price="salePrice"
    :sale-currency="saleCurrency"
    :price-difference="priceDifference"
    :sale-price-integer-part="salePriceIntegerPart"
    :sale-price-decimal-part="salePriceDecimalPart"
    :price-integer-part="priceIntegerPart"
    :price-decimal-part="priceDecimalPart"
    :local-price="localPrice"
    :local-sale-price="localSalePrice"
  >
    {{ salePrice }} {{ saleCurrency }} <span class="line-through"> {{ price }} {{ currency }}</span
    >-{{ priceDifference }}%
  </slot>

  <slot
    name="price"
    v-else
    :price="price"
    :currency="currency"
    :price-integer-part="priceIntegerPart"
    :price-decimal-part="priceDecimalPart"
    :local-price="localPrice"
    :local-sale-price="localSalePrice"
  >
    {{ price }} {{ currency }}
  </slot>
</template>
