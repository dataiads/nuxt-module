<template>
  <div
    id="overlay"
    class="fixed bottom-0 w-full bg-black/50 z-20"
    :class="overlayClass"
  >
    <div
      id="overlayContent"
      ref="overlayContent"
      class="fixed right-0 top-0 bottom-0 transition duration-500 ease-in-out z-21 bg-white p-2 w-2/5 lg:w-[380px] h-full"
      :class="contentClass"
    >
      <div v-if="config.title" :style="config.titleStyle">
        {{ config.title }}
      </div>
      <div :style="config.gridStyle">
        <slot name="reco-slider-item" item="item" v-for="item in items"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayerParams } from "~/types";
/**
 * TODO : HAve multiple position of overlay
 */
const props = defineProps<{ config: LayerParams }>();

const product = useProduct();

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
  if (props.config.position === "right") {
    return {
      ...props.config.style,
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
}, props.config.delay);

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

// get product suggestions
const recommender = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort,
});
const items = computed(() =>
  recommender.results.data.value?.map((x: Product[]) => x[0])
);
</script>
