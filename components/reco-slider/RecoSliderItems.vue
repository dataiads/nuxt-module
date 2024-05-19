<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  class?: string;
}>()

const { items } = useRecoSlider()
</script>

<template>
  <CarouselItem
    v-for="(item, index) in items"
    :key="'layeritem_' + index"
    :class="cn('shrink-1 basis-auto pl-2', props.class)"
  >
    <a :href="$oriUrl(item[0].data.link)" class="flex">
      <slot :item="item" />
    </a>
  </CarouselItem>
</template>
