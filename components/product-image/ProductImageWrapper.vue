<script setup lang="ts">
const props = defineProps<{product: Product, optimize: boolean, provider: string}>()
const productImageArgs = useProvideProductImage({ p: props.product, optimize: props.optimize, provider: props.provider })
</script>

<template>
  <div>
    <slot v-bind="productImageArgs" />
  </div>
</template>