<template>
  <div id="overlay" class="fixed bottom-0 w-full bg-black/50 z-20" :class="overlayClass">
    <div
      id="overlayContent"
      ref="overlayContent"
      class="fixed right-0 top-0 bottom-0 transition duration-500 ease-in-out z-21 bg-white p-2 w-2/5 lg:w-[380px] h-full"
      :class="contentClass"
    >
      <slot name="overlay-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TODO : HAve multiple position of overlay
 */
const props = withDefaults(
  defineProps<{ position: "left" | "right" | "top" | "bottom" }>(),
  { position: "right" }
);

const overlayState = useState<"initial" | "closed" | "open">(
  "recoSlider.overlay.state",
  () => "closed"
);
const overlayContent = ref(null);
const { y: yScroll } = useWindowScroll();
const isLocked = useScrollLock(document.body);

const overlayClass = computed(() => ({
  "pointer-events-none": overlayState.value === "closed",
  "h-0": overlayState.value === "closed",
  "h-full": overlayState.value !== "closed",
}));
const contentClass = computed(() => {
  if (props.position === "right") {
    return {
      "translate-y-[50vh]": overlayState.value === "initial",
      "md:translate-y-0": overlayState.value === "initial",
      "translate-y-0": overlayState.value === "open",
      "translate-y-full": overlayState.value === "closed",
    };
  }
});

onClickOutside(overlayContent, () => (overlayState.value = "closed"));

setTimeout(() => {
  overlayState.value = "initial";
}, 1000);

watch(yScroll, () => {
  if (overlayState.value === "initial") {
    overlayState.value = "closed";
  }
});

const onOverlayScroll = () => {
  if (overlayState.value === "initial") {
    overlayState.value = "open";
  }
};

watch(
  overlayState,
  () => {
    isLocked.value = overlayState.value == "open";
  },
  { immediate: true }
);
</script>
