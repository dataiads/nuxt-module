<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { useCarousel } from '../ui/carousel/useCarousel'
import { cn } from '@/lib/utils'

type RecoSliderBtnProps = {
  displayDisable: boolean
}
const props = withDefaults(defineProps<WithClassAsProps & RecoSliderBtnProps>(), { displayDisable: false })
const { config, arrowPlacement } = useRecoSlider()
const { canScrollPrev } = useCarousel()
const displayPrev = computed(() => canScrollPrev.value || props.displayDisable)
</script>

<template>
  <CarouselPrevious
    v-if="config.previousButton && displayPrev"
    :class="cn('', arrowPlacement === 'inside' ? 'left-4 z-10' : 'relative left-0 border-none translate-y-0', 'reco-slider-btn reco-slider-btn-prev', props.class)"
    :style="config.buttonStyle"
  >
    <img v-if="config.previousButton" :src="config.previousButton">
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </CarouselPrevious>
</template>
