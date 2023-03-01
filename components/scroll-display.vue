<script setup lang="ts">
withDefaults(defineProps<{
  threshHold: number;
}>(), {
  threshHold: 200,
});

let scTimer: NodeJS.Timeout | null
let scY = ref(0)

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  if (scTimer) return;
  scTimer = setTimeout(() => {
    scY.value = window.scrollY;
    if (scTimer) {
      clearTimeout(scTimer);
      scTimer = null;
    }
  }, 100);
}
</script>

<template>
  <slot v-if="scY > threshHold"></slot>
</template>