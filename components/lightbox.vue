<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  close: () => void;
}>();

const open = toRef(props, 'open');

const onEscape = (e: KeyboardEvent) => {
  if (open && e.key === 'Escape') {
    props.close()
  }
};

watch(open, () => {
  if (open.value) {
    document.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', onEscape);
    document.body.style.overflow = 'unset';
  }
}, { immediate: true });
</script>

<template>
  <teleport to="body">

    <transition enter-active-class="transition-all transition-fast ease-out-quad"
      leave-active-class="transition-all transition-medium ease-in-quad" enter-class="opacity-0 scale-70"
      enter-to-class="opacity-100 scale-100" leave-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-70"
      appear>

      <div v-if="open" aria-modal="true" tabindex="0" class="fixed inset-0 w-full h-full z-50 overflow-hidden bg-white">
        <slot></slot>
      </div>

    </transition>

  </teleport>
</template>