<script setup lang="ts">
import { Dialog } from "@headlessui/vue";

const props = withDefaults(
  defineProps<{
    open: boolean;
    class?: string;
    outsideClass?: string;
    contentClass?: string;
    withInset?: boolean;
  }>(),
  {
    withInset: true,
  }
);

const open = toRef(props, "open");
</script>

<template>
  <Dialog :open="open" @close="$emit('close')">
    <div v-if="withInset" :class="outsideClass" class="fixed inset-0 z-50 bg-black/30 cursor-pointer" aria-hidden="true" @click="$emit('close')" />
    <nav v-show="open" class="bg-grey1 self-start overflow-x-scroll fixed h-full w-[80%] top-0 right-0" :class="class">
      <slot name="drawer-content"></slot>
    </nav>
  </Dialog>
</template>
