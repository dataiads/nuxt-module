<script setup lang="ts">
import type { CrossSellParams } from '~/types'

const props = defineProps<{
  config: CrossSellParams;
}>()

const config = toRef(props, 'config')
const centerItems = computed(() => config.value?.center === undefined ? true : config.value.center)

const product = useProduct()

// only one algorithm for now
const keyMatcher = (productKey: string, dataKey: string, regex?: string) => {
  if (regex) {
    const regexProductKey = productKey.match(regex)?.[0]
    if (regexProductKey) {
      return regexProductKey.startsWith(dataKey)
    }
  }
  return productKey.startsWith(dataKey)
}


const sliderProps = computed(() => ({
  autoscroll: config.value.autoscroll,
  scrollSpeed: config.value.scrollSpeed,
  absoluteArrows: config.value.absoluteArrows,
  scrollerStyle: {
    columnGap: config.value.columnGap
  }
}))

let items: CrossSellItem[] = []
let crossSellKey: CrossSellKey = { key: config.value.key.key ?? '', caseInsensitive: false, regex: config.value.key.regex }

watch(config, () => {
  if (config.value.key.key === '') {
    // Empty key option, in case the xSell is the same for all products.
    crossSellKey.key = ''
  } else {
    crossSellKey = { key: getAttr(product.value, config.value.key.key) ?? '', caseInsensitive: config.value.key.caseInsensitive, regex: config.value.key.regex }
  }

  if (config.value.data) {
    for (const [dataKey, value] of Object.entries(config.value.data)) {
      if (crossSellKey.caseInsensitive && keyMatcher(crossSellKey.key.toLowerCase(), dataKey.toLowerCase(), crossSellKey.regex)) {
        items = value
        break
      }
      if (keyMatcher(crossSellKey.key, dataKey, crossSellKey.regex)) {
        items = value
        break
      }
    }
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div v-if="items.length" :style="config.style">
    <div v-if="config.title" class="flex-shrink-0" :style="config.titleStyle">
      {{ config.title }}
    </div>
    <Slider v-if="config.sliderMode" v-bind="sliderProps" :items="items">
      <template #item="{ item }">
        <a v-if="item.link" :key="item.link" :href="item.link" :style="config.itemStyle">
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </a>
        <span v-else :key="item.text" :style="config.itemStyle">
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </span>
      </template>
      <template #previous-btn="scope">
        <template v-if="config.previousButton">
          <button @click="scope.click">
            <img :style="config.buttonStyle" :src="config.previousButton">
          </button>
        </template>
        <template v-else>
          <slot name="cross-sell-previous-btn" v-bind="scope" />
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
    <div
      v-else
      class="flex flex-row xl:container"
      :class="{ 'flex-wrap': !config.scroll, 'overflow-x-auto': config.scroll, 'items-center mx-auto justify-center': centerItems }"
      :style="{ 'column-gap': config.columnGap }"
    >
      <template v-for="item in items">
        <a v-if="item.link" :key="item.link" :href="item.link" :style="config.itemStyle">
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
