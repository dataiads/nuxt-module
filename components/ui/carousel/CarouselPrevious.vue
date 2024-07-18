<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="cn(
      'touch-manipulation absolute h-[24px] w-[24px] rounded-full p-0 z-[10]',
      orientation === 'horizontal'
        ? 'left-4 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <ChevronLeft class="h-[16px] w-[16px] text-current" />
    </slot>
  </Button>
</template>
