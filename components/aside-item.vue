
<script setup lang="ts">
interface Props {
  class?: String,
  headerClass?: String,
  contentClass?: String,
  display?: Boolean,
}

const props = defineProps<Props>()

const display = ref(props.display ?? true);
const toggleDisplay = () => display.value = !display.value;

</script>

<template>
  <div class="h-full md:h-auto flex-none" :class="props.class">
    <div @click="toggleDisplay" :class="props.headerClass">
      <slot name="header" :displayed="display"></slot>
    </div>
    <div v-if="display" class="w-full" :class="props.contentClass">
      <slot name="content"></slot>
    </div>
  </div>
</template>