<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  class?: string;
}>()

const { items, config, itemWidth } = useRecoSlider()
const carouselRef = ref([])

onMounted(() => {
  itemWidth.value = carouselRef.value[0].getBoundingClientRect().width
})

useEventListener('resize', () => {
  itemWidth.value = carouselRef.value[0].getBoundingClientRect().width
}, { passive: true })
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
