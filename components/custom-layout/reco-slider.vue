<script setup lang="ts">
import type { RecoSliderParams } from '~/types'

const props = defineProps<{
  config: RecoSliderParams;
}>()

const product = useProduct()

const slider = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort
})

const sliderProps = computed(() => ({
  autoscroll: props.config.autoscroll,
  scrollSpeed: props.config.scrollSpeed,
  absoluteArrows: props.config.absoluteArrows,
  scrollerStyle: {
    columnGap: props.config.columnGap
  }
}))

// Flatten the array
const items = computed(() =>
  Array.prototype.concat.apply([], slider.results.data.value)
)
</script>

<template>
  <div v-if="items?.length">
    <div :style="config.style">
      <slot name="reco-slider-header" />
      <div v-if="config.title" :style="config.titleStyle">
        {{ config.title }}
      </div>
      <Slider v-bind="sliderProps" :items="items">
        <template #item="{ item }">
          <slot :key="item.id" name="reco-slider-item" :item="item" />
        </template>
        <template #previous-btn="scope">
          <template v-if="config.previousButton">
            <img
              :src="config.previousButton"
              class="cursor-pointer"
              :style="config.buttonStyle"
              @click="scope.click"
            >
          </template>
          <template v-else>
            <slot name="reco-slider-previous-btn" v-bind="scope" />
          </template>
        </template>
        <template #next-btn="scope">
          <template v-if="config.nextButton">
            <img
              :src="config.nextButton"
              class="cursor-pointer"
              :style="config.buttonStyle"
              @click="scope.click"
            >
          </template>
          <template v-else>
            <slot name="reco-slider-next-btn" v-bind="scope" />
          </template>
        </template>
      </Slider>
    </div>
  </div>
</template>
