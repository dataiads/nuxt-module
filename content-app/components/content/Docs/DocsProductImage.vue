<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";
const { selectedIndex, api, images } = useProductImage();
</script>

<template>
  <div>
    <Carousel
      class="relative w-full max-w-xs"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="(val) => (api = val)"
    >
      <CarouselPrevious class="absolute left-4 z-10 h-6 w-6 md:h-8 md:w-8">
        <ChevronLeft :stroke-width="1" />
      </CarouselPrevious>
      <CarouselContent>
        <CarouselItem v-for="(data, index) in images" :key="index" class="flex">
          <img :src="data" />
        </CarouselItem>
      </CarouselContent>
      <CarouselNext class="absolute right-4 z-10 h-6 w-6 md:h-8 md:w-8">
        <ChevronRight :stroke-width="1" />
      </CarouselNext>
    </Carousel>
    <div class="mt-4 flex justify-center gap-2">
      <div v-for="(_, index) in images" :key="'dot_' + index">
        <Button
          class="h-2 w-2 rounded-full p-0 md:h-4 md:w-4"
          :class="{
            'bg-muted hover:bg-muted': selectedIndex !== index,
            'bg-primary hover:bg-primary': selectedIndex === index,
          }"
          @click="api.scrollTo(index)"
        />
      </div>
    </div>
  </div>
</template>
