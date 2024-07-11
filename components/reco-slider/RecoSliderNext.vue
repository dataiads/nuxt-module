<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { useCarousel } from '../ui/carousel/useCarousel'
import { cn } from '@/lib/utils'

type RecoSliderBtnProps = {
  displayDisable: boolean
}
const props = withDefaults(defineProps<WithClassAsProps & RecoSliderBtnProps>(), { displayDisable: false })
const { config, arrowPlacement, nextSlide } = useRecoSlider()
const { canScrollNext } = useCarousel()

const displayNext = computed(() => canScrollNext.value || props.displayDisable)
</script>

<template>
  <CarouselNext v-if="config.nextButton && displayNext" :class="cn('', arrowPlacement === 'inside' ? 'right-4 z-10' : 'relative left-0 border-none translate-y-0', 'reco-slider-btn','reco-btn-next', props.class)" :style="config.buttonStyle" @click="nextSlide">
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