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

</script>

<template>
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
      loop: false,
      slidesToScroll: 'auto',
    }"
  >
    <div class="absolute z-10"> 
      <slot name="badge" />
    </div>
    <CarouselContent>
      <CarouselItem
        v-for="(src, index) in images"
        :key="'images' + index"
      >
        <slot name="main-image" :src="src">
          <img :src="src" class="w-full h-auto">
        </slot>
      </CarouselItem>
    </CarouselContent>
    <slot />
  </Carousel>
</template>