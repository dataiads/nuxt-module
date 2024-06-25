<script setup lang="ts">
const props = defineProps<{product: Product}>()

const images = computed(() => {
  let allImages: string[] = []
  if (
    props.product?.extraData?.additionalImageLinks?.length ||
    props.product?.extraData?.imageLink
  ) {
    // use collected images in priority
    if (props.product?.extraData?.imageLink) {
      allImages.push(props.product.extraData.imageLink)
    }
    if (props.product?.extraData?.additionalImageLinks) {
      allImages = allImages.concat(props.product.extraData.additionalImageLinks)
    }
  } else {
    // fallback on feed images otherwise
    if (props.product?.data?.imageLink) {
      allImages.push(props.product.data.imageLink)
    }
    if (props.product?.data?.additionalImageLinks) {
      allImages = allImages.concat(props.product.data.additionalImageLinks)
    }
  }
  return allImages
})

createInjectionState()
</script>

<template>
  <div>
    <slot />
  </div>
</template>