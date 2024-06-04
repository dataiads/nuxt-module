<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()
const { config, arrowPlacement } = useRecoSlider()
</script>

<template>
  <CarouselPrevious v-if="config.previousButton" :class="cn('', arrowPlacement === 'inside' ? 'left-4 z-10' : 'relative left-0 border-none translate-y-0', 'reco-slider-btn', props.class)" :style="config.buttonStyle">
    <img v-if="config.previousButton" :src="config.previousButton">
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    /></svg>
  </CarouselPrevious>
  <CarouselNext v-if="config.nextButton" :class="cn('', arrowPlacement === 'inside' ? 'right-4 z-10' : 'relative left-0 border-none translate-y-0', 'reco-slider-btn', props.class)" :style="config.buttonStyle">
    <img v-if="config.nextButton" :src="config.nextButton">
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="m8.25 4.5l7.5 7.5l-7.5 7.5"
    /></svg>
  </CarouselNext>
</template>