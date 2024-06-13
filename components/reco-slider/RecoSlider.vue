<script setup lang="ts">
</script>

<template>
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
      loop: true,
      slidesToScroll: 'auto',
    }"
  >
    <slot />
  </Carousel>
</template>