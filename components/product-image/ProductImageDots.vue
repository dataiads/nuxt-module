<script setup lang="ts">
import { cn } from '@/lib/utils'
const { images, setIndex, index } = useProductImage()
const props = defineProps<{class?: string}>()
</script>

<template>
  <div :class="cn('absolute bottom-4 left-4 flex gap-2 dots-container', props.class)">
    <button
      v-for="(_, i) in images"
      :key="'dot_' + index"
      class="w-2 h-2 rounded-full cursor-pointer shrink-0 grow-0"
      :class="{
        'dots-btn': index !== i,
        'dots-btn-current': index === i,
      }"
      @click.prevent="setIndex(i)"
    />
  </div>
</template>

<style lang="scss">
.dots-btn {
    @apply bg-white border border-black;
}

.dots-btn-current {
    @apply bg-primary;
}

</style>