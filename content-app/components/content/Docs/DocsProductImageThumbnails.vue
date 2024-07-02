<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";
const { isDesktop, thumbnailApi, images, selectedIndex, onThumbClick, api } =
  useProductImage();
</script>

<template>
  <div class="flex max-w-[200px] flex-col lg:max-w-[400px] lg:flex-row">
    <Carousel
      :orientation="isDesktop ? 'vertical' : 'horizontal'"
      class="relative order-2 mt-4 flex-[1_0_auto] lg:order-1 lg:mr-4 lg:mt-0 lg:max-w-[80px]"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="(val) => (thumbnailApi = val)"
    >
      <CarouselContent class="justify-center">
        <CarouselItem
          v-for="(data, index) in images"
          :key="index"
          class="max-w-[80px] flex-auto"
          @click="onThumbClick(index)"
        >
          <img
            class="aspect-square w-full border"
            :class="
              index === selectedIndex ? 'border-primary' : 'border-transparent'
            "
            :src="data"
          >
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <Carousel
      class="relative self-start lg:order-2"
      :opts="{
        align: 'start',
        loop: true,
      }"
      @init-api="(val) => (api = val)"
    >
      <CarouselPrevious class="absolute left-4 z-10">
        <ChevronLeft :stroke-width="1" />
      </CarouselPrevious>
      <CarouselContent>
        <CarouselItem v-for="(data, index) in images" :key="index">
          <img :src="data" class="h-full w-full object-cover">
        </CarouselItem>
      </CarouselContent>
      <CarouselNext class="absolute right-4 z-10">
        <ChevronRight :stroke-width="1" />
      </CarouselNext>
    </Carousel>
  </div>
</template>
