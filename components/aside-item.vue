
<script setup lang="ts">
import type { StyleValue } from 'vue'

interface Props {
  class?: String,
  headerClass?: String,
  contentClass?: String,
  display?: Boolean,
  style?: StyleValue,
}

const props = defineProps<Props>()

const display = ref(props.display ?? true)
const toggleDisplay = () => display.value = !display.value

</script>

<template>
  <div class="h-full md:h-auto flex-none" :class="props.class" :style="style">
    <div :class="props.headerClass" @click="toggleDisplay">
      <slot name="header" :displayed="display" />
    </div>
    <div v-if="display" class="w-full" :class="props.contentClass">
      <slot name="content" />
    </div>
  </div>
</template>