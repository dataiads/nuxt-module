<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  class?: string;
  outsideClass?: string;
  contentClass?: string;
  transition: 'slide-left' | 'slide-right';
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
}, {
  immediate: true,
});
</script>

<template>
  <transition :name="transition">
    <nav v-show="openRef" class="bg-grey1 self-start overflow-x-scroll fixed h-full w-[80%] top-0 right-0" :class="class">
      <slot name="drawer-content"></slot>
      <div
        class="bg-black opacity-50 fixed bottom-0 left-0 right-unset h-full w-[20%] max-w-[48rem] overflow-auto cursor-pointer"
        :class="outsideClass" @click="$emit('clickOutside')">
      </div>
    </nav>
  </transition>
</template>

<style scoped lang="scss">
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}


.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease-out;
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(-100%);
}

</style>