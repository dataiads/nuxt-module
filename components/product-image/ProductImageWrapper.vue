<script setup lang="ts">
const props = defineProps<{product: Product}>()
const productImageArgs = useProvideProductImage(props.product)
</script>

<template>
  <div>
    <slot v-bind="productImageArgs" />
  </div>
</template>