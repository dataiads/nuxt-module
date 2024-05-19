<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  class?: string;
}>()
const { config, arrowPlacement } = useRecoSlider()
</script>

<template>
  <div
    v-if="config.title"
    :style="config.titleStyle"
    :class="cn({
      'flex justify-between items-center': arrowPlacement === 'outside',
    }, props.class)"
  >
    <h2>
      <DynamicLabel :value="config.title" />
    </h2>
    <slot>
      <div v-if="arrowPlacement === 'outside'">
        <RecoSliderBtn />
      </div>
    </slot>
  </div>
</template>
