<script setup lang="ts">

const { arrowPlacement } = useRecoSlider()
</script>

<template>
  <CarouselContent class="-ml-2">
    <slot />
    <template v-if="arrowPlacement === 'inside'">
      <RecoSliderBtn />
    </template>
  </CarouselContent>
</template>