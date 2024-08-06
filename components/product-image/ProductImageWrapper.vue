<script setup lang="ts">
const props = defineProps<{ product: Product, optimize: boolean, provider: string, maxAdditionalImages: number }>()
const productImageArgs = useProvideProductImage({ p: props.product, optimize: props.optimize, provider: props.provider, maxAdditionalImages: props.maxAdditionalImages })
</script>

<template>
  <div>
    <slot v-bind="productImageArgs" />
  </div>
</template>
