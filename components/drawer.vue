<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  class?: string;
  outsideClass?: string;
  contentClass?: string;
  onClickOutside: () => void;
}>();

const openRef = toRef(props, "open");

const updateBodyScroll = () => {
  if (openRef.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
}

watch(openRef, () => {
  updateBodyScroll();
});

updateBodyScroll();
</script>

<template>
  <transition name="slide">
    <nav v-if="openRef" :class="class"
      class="bg-grey1 self-start overflow-x-scroll fixed h-full w-[80%] top-0 right-0">
      <slot name="drawer-content"></slot>
      <div :class="outsideClass"
        class="bg-black opacity-50 fixed bottom-0 left-0 right-unset h-full w-[20%] max-w-[48rem] overflow-auto cursor-pointer"
        @click="() => onClickOutside()">
      </div>
    </nav>
  </transition>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>