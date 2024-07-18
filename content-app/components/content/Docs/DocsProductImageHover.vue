<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";
const { images, isHovered, api, carouselRef } = useProductImage({
  hover: true,
});
</script>

<template>
  <div class="flex max-w-[200px] flex-col lg:max-w-[400px] lg:flex-row">
    <Carousel
      ref="carouselRef"
      class="relative self-start lg:order-2"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="(val) => (api = val)"
    >
      <CarouselPrevious v-if="isHovered" class="absolute left-4 z-10">
        <ChevronLeft :stroke-width="1" />
      </CarouselPrevious>
      <CarouselContent>
        <CarouselItem v-for="(data, index) in images" :key="index">
          <img :src="data" class="h-full w-full object-cover">
        </CarouselItem>
      </CarouselContent>
      <CarouselNext v-if="isHovered" class="absolute right-4 z-10">
        <ChevronRight :stroke-width="1" />
      </CarouselNext>
    </Carousel>
  </div>
</template>
