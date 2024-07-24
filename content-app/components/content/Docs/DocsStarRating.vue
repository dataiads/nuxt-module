<script setup lang="ts">

const product = useProduct()

const reviewValue = getCustomAttr(product.value, 'rating-value')
const reviewCount = getCustomAttr(product.value, 'rating-count')

</script>

<template>
  <StarsRating :value="reviewValue" :count="reviewCount" :max-value="5" />
</template>
