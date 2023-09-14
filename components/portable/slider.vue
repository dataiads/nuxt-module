<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app";

const props = defineProps<{
    element: RecoSliderLayoutElement
}>()

const config = useRuntimeConfig();
const s = config.public.layoutStyle?.recoSlider;

const product = useProduct();


const sliderOptions: UseRecommenderOptions = {
  productId: product.value.id,
  endpoint: "randomfill",
  baseRules: props.element.params.filterRules
}

if (!sliderOptions.fetchQuery) {
  sliderOptions.fetchQuery = {};
}

if (props.element.params.limit) {
  sliderOptions.defaultLimit = props.element.params.limit;
}

if (props.element.params.sort) {
  sliderOptions.defaultSort = props.element.params.sort;
}

if (props.element.params.deduplicate) {
  sliderOptions.fetchQuery.deduplicate = props.element.params.deduplicate;
}

if (props.element.params.sortRules) {
  sliderOptions.fetchQuery.sortFilters = JSON.stringify(props.element.params.sortRules);
}

const slider = useRecommender(sliderOptions);

const { data: recoSliderProducts } = slider.results;
</script>

<template>
    <div v-if="recoSliderProducts?.length" id="reco-slider" :class="element.class ?? s.class">
        <div :class="s.containerClass">
          <slot v-if="element.params.showHeader ?? true" name="reco-slider-header"></slot>
          <Slider
            :items="recoSliderProducts"
            :scroller-class="s?.sliderClass"
            :autoscroll="s.autoscroll"
            :scroll-speed="s.scrollSpeed"
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