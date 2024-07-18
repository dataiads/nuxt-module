<script setup lang="ts">
const { config, displayLayer, items, onScroll, customLayout } = useLayer();
</script>

<template>
  <Sheet v-if="displayLayer" v-model:open="customLayout.showOverlay.value">
    <SheetTrigger as-child>
      <div class="fixed bottom-0 left-0 z-[10] w-full bg-white">
        <Button variant="ghost" class="hover:bg-transparent">
          <DynamicLabel :value="config.title" />
        </Button>
      </div>
    </SheetTrigger>
    <SheetContent
      :side="config.position"
      :backdrop-style="config.backdropStyle"
      @wheeloutside="onScroll"
    >
      <SheetHeader v-if="config.title">
        <SheetTitle>
          <DynamicLabel :value="config.title" />
        </SheetTitle>
      </SheetHeader>
      <Carousel
        class="relative w-full"
        :opts="{
          align: 'start',
          loop: true,
          slidesToScroll: 'auto',
        }"
      >
        <CarouselPrevious class="left-4 z-[20]" />
        <CarouselNext class="right-4 z-[20]" />
        <CarouselContent class="-ml-6">
          <CarouselItem
            v-for="(item, index) in items"
            :key="'layeritem_' + index"
            class="shrink-1 basis-auto pl-6"
          >
            <a
              :href="$oriUrl(item[0].data.link)"
              class="block h-[200px] w-[200px] p-1"
            >
              <img :src="item[0].data.imageLink">
            </a>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </SheetContent>
  </Sheet>
</template>
