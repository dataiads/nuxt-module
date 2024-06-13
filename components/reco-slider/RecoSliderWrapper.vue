<script setup lang="ts">
import type { RecoSliderParams } from '~/types'
const props = defineProps<{
  config: RecoSliderParams,
}>()

const arrowPlacement = props.config?.arrowPlacement || 'inside'
const product = useProduct()

const slider = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort
})

const recoSliderArgs = useProvideRecoSlider({ config: props.config, arrowPlacement, items: slider.results.data as Product[][] })
</script>

<template>
  <div v-if="recoSliderArgs.items" class="reco-slider-wrapper">
    <h2 v-if="arrowPlacement === 'inside'" class="reco-slider-title" :style="config.titleStyle">
      <DynamicLabel :value="config.title" />
    </h2>
    <slot v-bind="recoSliderArgs" />
  </div>
</template>