<script setup lang="ts">
import { NuxtConfigSchema } from "@nuxt/schema";
import { RecoSliderParams } from "~/types";

const props = defineProps<{
  config: RecoSliderParams;
}>();

const product = useProduct();

const slider = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort,
});

const sliderProps = computed(() => ({
  autoscroll: props.config.autoscroll,
  scrollSpeed: props.config.scrollSpeed,
  absoluteArrows: props.config.absoluteArrows,
  scrollerStyle: {
    columnGap: props.config.columnGap,
  },
}));

// Flatten the array
const items = computed(() =>
  Array.prototype.concat.apply([], slider.results.data.value)
);
</script>

<template>
  <div v-if="items?.length">
    <div :style="config.style">
      <slot name="reco-slider-header"></slot>
      <div v-if="config.title" :style="config.titleStyle">{{ config.title }}</div>
      <Slider v-bind="sliderProps" :items="items">
        <template #item="{ item }">
          <slot name="reco-slider-item" :key="item.id" :item="item"></slot>
        </template>
        <template #previous-btn="scope">
          <template v-if="config.previousButton">
            <img :src="config.previousButton" @click="scope.click" class="cursor-pointer"/>
          </template>
          <template v-else>
            <slot name="reco-slider-previous-btn" v-bind="scope"></slot>
          </template>
        </template>
        <template #next-btn="scope">
          <template v-if="config.nextButton">
            <img :src="config.nextButton"  @click="scope.click" class="cursor-pointer"/>
          </template>
          <template v-else>
            <slot name="reco-slider-next-btn" v-bind="scope"></slot>
          </template>
        </template>
      </Slider>
    </div>
  </div>
</template>
