<script setup lang="ts">

const { arrowPlacement } = useRecoSlider()
</script>

<template>
  <CarouselContent>
    <slot />
    <template v-if="arrowPlacement === 'inside'">
      <RecoSliderBtn />
    </template>
  </CarouselContent>
</template>