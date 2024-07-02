<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{class?: string, contentClass?: string}>()
const { images, setIndex, index } = useProductImage()

</script>

<template>
  <Carousel
    :class="cn('relative w-fit', props.class)"
    orientation="vertical"
    :opts="{
      align: 'start',
      slidesToScroll: 'auto',
      loop: false,
    }"
  >
    <CarouselContent :class="cn('max-h-[350px]', contentClass)">
      <CarouselItem
        v-for="(src, i) in images"
        :key="i"
        class="basis-auto cursor-pointer"
        @click="setIndex(i)"
      >
        <slot name="image">
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
      <CarouselPrevious class="top-0 border-none" />
      <CarouselNext class="bottom-0 border-none" />
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