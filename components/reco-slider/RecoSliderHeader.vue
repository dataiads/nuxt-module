<script setup lang="ts">
import { cn } from '@/lib/utils'
const props = defineProps<{
  class?: string;
}>()
const { config, arrowPlacement, items } = useRecoSlider()
</script>

<template>
  <div
    class="reco-slider-title"
    :class="cn('flex justify-between items-center', props.class)"
  >
    <slot>
      <h2 :style="config.titleStyle">
        <DynamicLabel :value="config.title" />
      </h2>
      <div v-if="arrowPlacement === 'outside'">
        <slot name="arrow" :items="items">
          <RecoSliderBtn />
        </slot>
      </div>
    </slot>
  </div>
</template>
