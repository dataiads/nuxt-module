<script setup lang="ts">
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
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
    slideInView.value = Math.floor(window.innerWidth / api.slideNodes()[0].getBoundingClientRect().width)
  })

  api.on('select', () => {
    currentIndex.value = api.selectedScrollSnap() + 1
  })

  api.on('resize', () => {
    slideInView.value = Math.floor(window.innerWidth / api.slideNodes()[0].getBoundingClientRect().width)
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
    :plugins="[WheelGesturesPlugin()]"
    @init-api="setApi"
  >
    <slot />
  </Carousel>
</template>