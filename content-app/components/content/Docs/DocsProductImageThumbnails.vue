<script setup lang="ts">
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'

const product = useProduct()

const api = ref()

function setApi (val) {
  api.value = val
}

const thumbnailApi = ref()
const selectedIndex = ref()

function onSelect () {
  if (!api.value || !thumbnailApi.value) return
  selectedIndex.value = api.value.selectedScrollSnap()
  thumbnailApi.value.scrollTo(api.value.selectedScrollSnap())
}

function onThumbClick (index: number) {
  if (!api.value || !thumbnailApi.value) return
  api.value.scrollTo(index)
}

watchOnce(api, (api) => {
  if (!api) return

  onSelect()
  api.on('select', onSelect)
  api.on('reInit', onSelect)
})

const images = computed(() => product.value.data.additionalImageLinks )
</script>

<template>
  <div class="flex gap-4">
    <Carousel
      orientation="vertical"
      class="relative max-w-[80px]"
      :opts="{
        align: 'start',
      }"
      @init-api="(val) => (thumbnailApi = val)"
    >
      <CarouselContent class="-mt-1 h-[420px]">
        <CarouselItem v-for="(data, index) in images" :key="index" class="p-1 basis-auto shrink-1" @click="onThumbClick(index)">
          <img class="border" :class="index === selectedIndex ? 'border-primary' : 'border-transparent'" :src="data">
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <Carousel
      class="relative w-[200px]"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="setApi"
    >
      <CarouselPrevious class="absolute left-4 z-10">
        <ChevronLeft :stroke-width="1" />
      </CarouselPrevious>
      <CarouselContent>
        <CarouselItem v-for="(data, index) in images" :key="index">
          <img :src="data">
        </CarouselItem>
      </CarouselContent>
      <CarouselNext class="absolute right-4 z-10">
        <ChevronRight :stroke-width="1" />
      </CarouselNext>
    </Carousel>
  </div>
</template>
