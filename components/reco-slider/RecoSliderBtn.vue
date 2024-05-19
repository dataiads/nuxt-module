<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()
const { arrowPlacement } = useRecoSlider()
</script>

<template>
  <CarouselPrevious :class="cn('', arrowPlacement === 'inside' ? 'left-4 z-[20]' : 'relative left-0 border-none translate-y-0', props.class)" />
  <CarouselNext :class="cn('', arrowPlacement === 'inside' ? 'right-4 z-[20]' : 'relative left-0 border-none translate-y-0', props.class)" />
</template>