<script setup lang="ts">
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { useCarousel } from '~/components/ui/carousel'
const product = useProduct()
const api = ref()
const current = ref(0)

function setApi (val) {
  api.value = val
}

watchOnce(api, (api) => {
  if (!api)
    return

  current.value = api.selectedScrollSnap()

  api.on('select', () => {
    current.value = api.selectedScrollSnap()
  })
})

</script>

<template>
  <div>
    <Carousel
      class="relative w-full max-w-xs"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="setApi"
    >
      <CarouselPrevious class="absolute left-4 z-10 h-6 w-6 md:h-8 md:w-8">
        <ChevronLeft :stroke-width="1" />
      </CarouselPrevious>
      <CarouselContent>
        <CarouselItem
          v-for="(data, index) in product.data.additionalImageLinks"
          :key="index"
          class="flex"
        >
          <img :src="data">
        </CarouselItem>
      </CarouselContent>
      <CarouselNext class="absolute right-4 z-10 h-6 w-6 md:h-8 md:w-8">
        <ChevronRight :stroke-width="1" />
      </CarouselNext>
    </Carousel>
    <div class="flex gap-2 justify-center mt-4">
      <div v-for="(_, index) in product.data.additionalImageLinks">
        <Button
          class="w-2 h-2 md:w-4 md:h-4 p-0 rounded-full" 
          :class="{ 'bg-muted hover:bg-muted': current !== index, 'bg-primary hover:bg-primary': current === index }" 
          @click="api.scrollTo(index)"
        />
      </div>
    </div>
  </div>
</template>
