<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  class?: string;
}>()

const { items, config } = useLayer()

</script>

<template>
  <CarouselItem v-for="(item, index) in items" :key="'layeritem_' + index" :class="cn('', props.class)" class="layer-item"
    :style="{ paddingLeft: config.columnGap }">
    <slot :item="item" />
  </CarouselItem>
</template>
