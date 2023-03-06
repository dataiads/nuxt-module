<script setup lang="ts">
const { openByDefault } = withDefaults(defineProps<{
  openByDefault?: boolean
}>(), {
  openByDefault: false
});

const open = ref(openByDefault);
const toggleDisplay = () => open.value = !open.value;
</script>

<template>
  <slot name="header" :open="open" :toggleDisplay="toggleDisplay">
    <div class="flex flex-row justify-around cursor-pointer" @click="open = !open">
      <span>DRAWER_DEFAULT</span>
      <span :class="{ 'rotate-90': open }">></span>
    </div>
  </slot>
  <transition name="slide">
    <slot v-if="open" name="content">

    </slot>
  </transition>
</template>

<style scoped lang="scss">
.slide-enter-active {
  transition: max-height 0.5s ease-in-out;
}
.slide-leave-active {
  transition: max-height 0.2s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
  overflow: hidden;
  max-height: 1000px;
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>