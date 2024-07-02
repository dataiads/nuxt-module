<script setup lang="ts">
const props = defineProps<{
  class?: string,
}>()

</script>

<template>
  <CarouselPrevious :class="props.class">
    <slot name="previous" />
  </CarouselPrevious>
    
  <CarouselNext :class="props.class">
    <slot name="next" />
  </CarouselNext>
</template>