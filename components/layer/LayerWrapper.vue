<script setup lang="ts">
import type { LayerParams } from '~/types'
import { computed } from 'vue'

const props = defineProps<{
  config: LayerParams,
}>()

const product = useProduct()

const layer = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort
})
console.log('layerlayer', props.config)



const layerArgs = useProvideLayer({
  config: props.config,
  items: layer.results.data as Product[][]
})
</script>

<template>
  <div v-if="layerArgs.items.value && layerArgs.items.value?.length" class="layer-wrapper">
    <slot v-bind="layerArgs" />
  </div>
</template>

