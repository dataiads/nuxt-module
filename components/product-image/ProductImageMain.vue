<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{classContent?: string, classItem?: string, displayHoverImage?: boolean, zoom?: boolean }>(), {
  displayHoverImage: false,
  classContent: '',
  classItem: '',
  zoom: false
})

const { images, index, setIndex, openDialog } = useProductImage()
const mainApi = ref()

const setApi = (val) => {
  mainApi.value = val
}
watch(index, () => {
  if (!mainApi.value) return
  mainApi.value.scrollTo(index.value)
})
onMounted(() => {
  mainApi.value.scrollTo(index.value)
})

const stop = watch(mainApi, (api) => {
  if (!api)
    return

  // Watch only once or use watchOnce() in @vueuse/core
  nextTick(() => stop())

  api.on('select', () => {
    setIndex(api.selectedScrollSnap())
  })
})

const onClickMainImage = (i: number) => {
  setIndex(i)
  openDialog()
}

const onMouseover = () => {
  if (!props.displayHoverImage) return

  if (index.value === 0 && index.value + 1 !== images.value.length) setIndex(1)
}

const onMouseleave = () => {
  if (!props.displayHoverImage) return
  if (index.value === 1) setIndex(0)
}
</script>

<template>
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
      loop: false,
      slidesToScroll: 'auto',
    }"
    @init-api="setApi"
  >
    <div class="absolute z-10"> 
      <slot name="badge" />
    </div>
    <CarouselContent :class="cn('', classContent)">
      <CarouselItem
        v-for="(src, i) in images"
        :key="'images' + i"
        :class="cn('', classItem)"
        @click="onClickMainImage(i)"
        @mouseover="onMouseover"
        @mouseleave="onMouseleave"
      >
        <slot name="main-image" :src="src">
          <ProductImageItem :src="src" :zoom="zoom" />
        </slot>
      </CarouselItem>
    </CarouselContent>
    <slot />
  </Carousel>
</template>