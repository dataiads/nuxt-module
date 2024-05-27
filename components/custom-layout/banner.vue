<script setup lang="ts">
import type { BannerParams } from '~/types'

const props = defineProps<{
  config: BannerParams;
}>()

const config = toRef(props, 'config')

const activeIndex = ref(0)
const element = computed(() => config.value.elements[activeIndex.value] || config.value.elements[0])

let intervalId: NodeJS.Timeout | null = null
watch(config, () => {
  if (intervalId) {
    clearInterval(intervalId)
  }

  if (config.value.interval > 0) {
    intervalId = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % config.value.elements.length
    }, config.value.interval)
  }
}, { immediate: true })
</script>

<template>
  <div v-if="element" :style="config.style">
    <div v-if="element.type === 'html'" v-html="element.html" />

    <div
      v-else-if="element.type === 'message'"
      class="flex flex-row justify-center items-center"
      :style="element.style"
    >
      <a v-if="element.link" :href="element.link">
        <span>{{ element.text }}</span>
      </a>
      <span v-else>{{ element.text }}</span>
    </div>
  </div>
</template>
