<script setup lang="ts">
import type { UseStructuredRecommenderOptions } from "~/types";

const props = defineProps<{
  sliderProps: {};
  algo: UseStructuredRecommenderOptions;
}>();

const product = useProduct();

const slider = useStructuredRecommender({
  productId: product.value.id,
  fetchQuery: { type: "slider" },
  limit: 10,
  ...props.algo,
});

// Flatten the array
const items = computed(() => Array.prototype.concat.apply([], slider.results.data.value))

</script>
<template>
  <div
      id="reco-slider"
      v-if="items?.length"
    >
      <div>
        <slot name="reco-slider-header"></slot>
        <Slider
            v-bind="sliderProps"
          :items="items"
        >
          <template #item="{ item }">
            <slot name="reco-slider-item" :key="item.id" :item="item"></slot>
          </template>
          <template #previous-btn="scope">
            <slot name="reco-slider-previous-btn" v-bind="scope"></slot>
          </template>
          <template #next-btn="scope">
            <slot name="reco-slider-next-btn" v-bind="scope"></slot>
          </template>
        </Slider>
      </div>
    </div>
</template>
