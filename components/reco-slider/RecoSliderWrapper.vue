<script setup lang="ts">
import type { RecoSliderParams } from '~/types'
const props = defineProps<{
  config: RecoSliderParams,
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

const config = computed(() => props.config)
const arrowPlacement = computed(() => props.config?.arrowPlacement || 'inside')

const recoSliderArgs = useProvideRecoSlider({ config, arrowPlacement, items: slider.results.data as Product[][] })
</script>

<template>
  <div v-if="recoSliderArgs.items.value && recoSliderArgs.items.value.length" class="reco-slider-wrapper">
    <slot v-bind="recoSliderArgs" />
  </div>
</template>