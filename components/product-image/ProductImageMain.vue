<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{classContent?: string, classItem?: string }>()

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
        v-for="(src, index) in images"
        :key="'images' + index"
        :class="cn('', classItem)"
        @click="onClickMainImage(index)"
      >
        <slot name="main-image" :src="src">
          <img :src="src" class="w-full h-auto">
        </slot>
      </CarouselItem>
    </CarouselContent>
    <slot />
  </Carousel>
</template>