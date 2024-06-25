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
    class="relative w-fit mr-4"
    orientation="vertical"
    :opts="{
      align: 'start',
      slidesToScroll: 'auto',
      loop: false,
    }"
  >
    <CarouselContent class="max-h-[350px]">
      <CarouselItem
        v-for="(src, index) in images"
        :key="index"
        class="basis-auto cursor-pointer"
      >
        <img
          :src="src"
          width="40"
          height="40"
          format="webp"
        >
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="top-0 border-none" />
    <CarouselNext class="bottom-0 border-none" />
  </Carousel>
</template>