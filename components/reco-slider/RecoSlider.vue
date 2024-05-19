<script setup lang="ts">
import { useProvideRecoSlider } from '@/composables/useRecoSlider'
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
  <Carousel
    class="relative w-full"
    :opts="{
      align: 'start',
      loop: true,
      slidesToScroll: 'auto',
    }"
  >
    <slot v-bind="recoSliderArgs" />
  </Carousel>
</template>