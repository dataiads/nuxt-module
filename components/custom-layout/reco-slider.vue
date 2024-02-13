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

const items = computed(() => slider.results.data.value as Product[][]);
</script>

<template>
  <div v-if="items?.length">
    <div :style="config.style">
      <slot name="reco-slider-header" />
      <div v-if="config.title" :style="config.titleStyle">
        <DynamicLabel :value="config.title" />
      </div>
      <Slider v-bind="sliderProps" :items="items">
        <template #item="{ item }">
          <template v-if="(config.itemLayout ?? 'reco-slider-slot') === 'reco-slider-slot'">
            <slot v-if="item.id" :key="item.id" name="reco-slider-item" :item="item" />
            <slot v-else name="reco-slider-item" :item="item" />
          </template>
          <CustomLayoutRecoItem v-else-if="config.itemLayout === 'default'" :config="{style: config.itemStyle, item}" />
          <template v-else-if="config.itemLayout === 'filters-content-grid-item'">
            <slot v-if="item.id" :key="item.id" name="filters-content-grid-item" :item="item" />
            <slot v-else name="filters-content-grid-item" :item="item" />
          </template>
        </template>
        <template #previous-btn="scope">
          <template v-if="config.previousButton">
            <button class="z-[10]" @click="scope.click">
              <img :style="config.buttonStyle" :src="config.previousButton">
            </button>
          </template>
        </template>
        <template #next-btn="scope">
          <template v-if="config.nextButton">
            <button @click="scope.click">
              <img :style="config.buttonStyle" :src="config.nextButton">
            </button>
          </template>
        </template>
      </Slider>
    </div>
  </div>
</template>
