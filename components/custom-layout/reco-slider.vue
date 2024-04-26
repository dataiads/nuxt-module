<script setup lang="ts">
import type { RecoSliderParams } from '~/types'

const props = defineProps<{
  config: RecoSliderParams;
}>()

const product = useProduct()
const config = toRef(props, 'config')

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

const items = computed(() => slider.results.data.value as Product[][])
</script>

<template>
  <div v-if="items?.length">
    <div :style="config.style">
      <slot name="reco-slider-header" />
      <Slider v-bind="sliderProps" ref="sliderRef" :items="items">
        <template #default="{ next, previous }">  
          <div
            v-if="config.title"
            :style="config.titleStyle" 
            :class="{ 'flex justify-between': config.arrowPlacement === 'outside' }"
          >
            <DynamicLabel :value="config.title" />
            <div v-if="config.arrowPlacement === 'outside'">
              <button @click="previous()">
                <img v-if="config.previousButton" :style="config.buttonStyle" :src="config.previousButton">
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                /></svg>
              </button> 
              <button @click="next">
                <img v-if="config.nextButton" :style="config.buttonStyle" :src="config.nextButton">
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m8.25 4.5l7.5 7.5l-7.5 7.5"
                /></svg>
              </button>
            </div>
          </div>
        </template>
        <template #item="{ item }">
          <template v-if="(config.itemLayout ?? 'reco-slider-slot') === 'reco-slider-slot'">
            <slot v-if="item.id" :key="item.id" name="reco-slider-item" :item="item" />
            <slot v-else name="reco-slider-item" :item="item" />
          </template>
          <CustomLayoutRecoItem v-else-if="config.itemLayout === 'default'" :config="{ style: config.itemStyle, item }" />
          <template v-else-if="config.itemLayout === 'filters-content-grid-item'">
            <slot v-if="item.id" :key="item.id" name="filters-content-grid-item" :item="item" />
            <slot v-else name="filters-content-grid-item" :item="item" />
          </template>
        </template>
        <template #previous-btn="scope">
          <template v-if="config.previousButton && config.arrowPlacement === 'inside'">
            <button class="z-[10]" @click="scope.click">
              <img v-if="config.previousButton" :style="config.buttonStyle" :src="config.previousButton">
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              /></svg>
            </button>
          </template>
          <div v-else />
        </template>
        <template #next-btn="scope">
          <template v-if="config.nextButton && config.arrowPlacement === 'inside'">
            <button @click="scope.click">
              <img v-if="config.nextButton" :style="config.buttonStyle" :src="config.nextButton">
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m8.25 4.5l7.5 7.5l-7.5 7.5"
              /></svg>
            </button>
          </template>
          <div v-else />
        </template>
      </Slider>
    </div>
  </div>
</template>
