<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  class?: string;
}>()

const { items, config } = useRecoSlider()
</script>

<template>
  <CarouselItem
    v-for="(item, index) in items"
    :key="'layeritem_' + index"
    :class="cn('', props.class)"
    :style="{ paddingLeft: config.columnGap }"
  >
    <slot :item="item" />
  </CarouselItem>
</template>
