<script setup lang="ts">
import type { CarouselApi } from '~/carousel'

const { currentIndex, slideInView } = useRecoSlider()
const api = ref<CarouselApi>()
function setApi (val: CarouselApi) {
  api.value = val
}

watchOnce(api, (api) => {
  if (!api)
    return

  api.on('init', () => {
    slideInView.value = api.slidesInView().length - 1
    currentIndex.value = api.selectedScrollSnap() + 1
  })
  
  api.on('slidesInView', () => {
    slideInView.value = api.slidesInView().length - 1
    currentIndex.value = api.selectedScrollSnap() + 1
  })

  api.on('resize', () => {
    slideInView.value = api.slidesInView().length - 1
    currentIndex.value = api.selectedScrollSnap() + 1 
  })

})
</script>

<template>
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
      loop: true,
      slidesToScroll: 'auto',
    }"
    @init-api="setApi"
  >
    <slot />
  </Carousel>
</template>