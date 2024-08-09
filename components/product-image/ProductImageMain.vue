<script setup lang="ts">
import Fade from 'embla-carousel-fade'
import { cn } from '@/lib/utils'
import type { CarouselApi } from '../ui/carousel'

const props = withDefaults(defineProps<{ loop?: boolean, fade?: boolean, sizes?: string, width?: string, height?: string, classContent?: string, classItem?: string, displayHoverImage?: boolean, zoom?: boolean, getZoomedSrc?: (src: string) => string; }>(), {
  displayHoverImage: false,
  fade: false,
  loop: false,
  classContent: '',
  classItem: '',
  zoom: false,
  width: '400',
  height: '400',
  sizes: '50vw lg:700px',
  getZoomedSrc: (src: string) => src // Default to returning the same src
})

const { images, index, setIndex, openDialog } = useProductImage()
const mainApi = ref()

const setApi = (val: CarouselApi) => {
  mainApi.value = val
}
watch(index, () => {
  if (!mainApi.value) return
  mainApi.value.scrollTo(index.value)
})
onMounted(() => {
  mainApi.value.scrollTo(index.value)
})

const slidesInView = ref<number[]>([])
const updateSlidesInView = () => {
  if (!mainApi.value) return


  const allSlides = mainApi.value.slideNodes()

  if (slidesInView.value.length === allSlides.length) {
    mainApi.value.off('slidesInView', updateSlidesInView)
    return
  }

  const newInView = mainApi.value.slidesInView().filter(index => !slidesInView.value.includes(index))
  slidesInView.value = [...slidesInView.value, ...newInView]
}

const stop = watch(mainApi, (api) => {
  if (!api)
    return

  // Watch only once or use watchOnce() in @vueuse/core
  nextTick(() => stop())

  api.on('select', () => {
    setIndex(api.selectedScrollSnap())
  })
  updateSlidesInView()
  api.on('slidesInView', () => {
    updateSlidesInView()
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

const plugins = computed(() => {
  const res = []
  if (props.fade) {
    res.push(Fade())
  }
  return res
})

const shouldLoadImage = (index: number) => {
  return slidesInView.value.includes(index)
}

</script>

<template>
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
      loop,
      slidesToScroll: 'auto',
    }"
    :plugins="plugins"
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
        <slot name="main-image" :src="shouldLoadImage(i) ? src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'">
          <ProductImageItem
            :key="shouldLoadImage(i) ? src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'"
            :src="shouldLoadImage(i) ? src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'"
            :zoom="zoom"
            :get-zoomed-src="getZoomedSrc"
            :height="height"
            :width="width"
            :sizes="sizes"
          />
        </slot>
      </CarouselItem>
      <ProductImageSeeMore :class="cn('relative', classItem)" />
    </CarouselContent>
    <slot />
  </Carousel>
</template>