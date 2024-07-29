<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { CarouselApi } from '../ui/carousel'

const props = withDefaults(defineProps<{orientation?: 'horizontal' | 'vertical', class?: string, contentClass?: string}>(), { orientation: 'vertical', class: '', contentClass: '' })
const { images, setIndex, index } = useProductImage()

const api = ref<CarouselApi>()
const canScrollNext = ref(false)
const canScrollPrev = ref(false)

const onSelect = () => {
  canScrollNext.value = api.value!.canScrollNext()
  canScrollPrev.value = api.value!.canScrollPrev()
}
watchOnce(api, (api) => {
  if (!api)
    return

  onSelect()
  api.on('select', onSelect)
})

const setApi = (val: CarouselApi) => {
  api.value = val
}
</script>

<template>
  <Carousel
    :class="cn('relative w-fit', props.class)"
    :orientation="orientation"
    :opts="{
      align: 'start',
      slidesToScroll: 'auto',
      loop: false,
    }"
    @init-api="setApi"
  >
    <CarouselContent :class="cn('max-h-[350px]', orientation === 'horizontal' ? 'max-w-[calc(100vw-32px)]' : '', contentClass)">
      <CarouselItem
        v-for="(src, i) in images"
        :key="i"
        class="basis-auto cursor-pointer"
        @click="setIndex(i)"
      >
        <slot name="image" :src="src">
          <img
            :src="src"
            class="product-image-thumbnails"
            :class="{ 'product-image-thumbnails--selected': i === index }"
            format="webp"
          >
        </slot>
      </CarouselItem>
    </CarouselContent>
    <slot name="actions">
      <CarouselPrevious v-if="canScrollPrev" :class="cn('border-none', orientation === 'vertical' ? 'top-0 border-none' : '')" />
      <CarouselNext v-if="canScrollNext" :class="cn('border-none', orientation === 'vertical' ? 'bottom-0 border-none' : '')" />
    </slot>
  </Carousel>
</template>

<style lang="scss">
.product-image-thumbnails {
  @apply w-[64px] h-[64px] border border-transparent;
  &--selected {
    @apply border-primary;
  }
}
</style>