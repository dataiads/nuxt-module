
<script setup lang="ts">
import type { CrossSellParams } from '~/types'

const props = defineProps<{
  config: CrossSellParams;
}>()

const product = useProduct()

// only one algorithm for now
const keyMatcher = (productKey: string, dataKey: string) => productKey.startsWith(dataKey)


let items: CrossSellItem[] = []
if (props.config.data) {
  let key = getAttr(product.value, props.config.key.key) || ''
  if (props.config.key.caseInsensitive) {
    key = key.toLowerCase()
  }

  for (const [dataKey, value] of Object.entries(props.config.data)) {
    const dataKey_ = (props.config.key.caseInsensitive) ? dataKey.toLowerCase() : dataKey
    if (keyMatcher(key, dataKey_)) {
      items = value
      break
    }
  }
}

</script>

<template>
  <div v-if="items.length" :style="config.style">
    <div v-if="config.title" :style="config.titleStyle">
      {{ config.title }}
    </div>
    <div
      class="flex flex-row"
      :class="{ 'flex-wrap': !config.scroll, 'overflow-x-scroll': config.scroll }"
      :style="{ 'column-gap': config.columnGap }"
    >
      <template v-for="item in items">
        <a v-if="item.link" :key="item.link" :style="config.itemStyle">
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </a>
        <span v-else :key="item.text" :style="config.itemStyle">
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </span>
      </template>
    </div>
  </div>
</template>