<script setup lang="ts">
import type { CrossSellParams, CrossSellResponse } from '~/types'

const props = defineProps<{
  config: CrossSellParams;
}>()
const customLayout = useCustomLayout()

const centerItems = computed(() => props.config?.center === undefined ? true : props.config.center)

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
  autoscroll: props.config.autoscroll,
  scrollSpeed: props.config.scrollSpeed,
  absoluteArrows: props.config.absoluteArrows,
  scrollerStyle: {
    columnGap: props.config.columnGap
  }
}))

let items: CrossSellItem[] = []

const route = useRoute()

const toggleItem = (item: CrossSellItem) => {
  if (item.recommenderConfig) {
    // TODO :fix ts errors
    // Filter against recommenderConfig base rules
    // @ts-ignore
    customLayout!.filter.state.value = item.recommenderConfig.baseRules
    navigateTo({
      query: {
        ...route.query,
        state: 'hideMainProduct'
      }
    })
  }
}

/**
 * Watch the route and reset filter when going back
 */
watch(
  () => route.path,
  () => {
    if (route.query.state !== 'hideMainProduct') {
      customLayout!.filter.reset()
    }
  }
)

if (props.config.mode === 'auto') {
  const resp = await $fetch<CrossSellResponse>(`/api/cross-sell/${encodeURIComponent(product.value.id)}/by-criteria`, {
    params: {
      criteria: props.config.crossSellCriteria,
      targeting: JSON.stringify(props.config.targeting),
      limit: props.config.limit
    }
  })
  items = resp.items.map(item => ({
    text: item.value,
    image: item.image,
    recommenderConfig: {
      productId: product.value.id,
      baseRules: item.filters
    }
  }))

} else {
  // mode = manual (legacy)

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

  let crossSellKey: CrossSellKey = { key: props.config.key.key ?? '', caseInsensitive: false, regex: props.config.key.regex }
  if (props.config.key.key === '') {
    // Empty key option, in case the xSell is the same for all products.
    crossSellKey.key = ''
  } else {
    crossSellKey = { key: getAttr(product.value, props.config.key.key) ?? '', caseInsensitive: props.config.key.caseInsensitive, regex: props.config.key.regex }
  }

  if (props.config.data) {
    for (const [dataKey, value] of Object.entries(props.config.data)) {
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
}

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

        <span
          v-else-if="item.recommenderConfig"
          :key="item.recommenderConfig"
          :style="config.itemStyle"
          @click="() => toggleItem(item)"
        >
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </span>

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

        <span
          v-else-if="item.recommenderConfig"
          :key="JSON.stringify(item.recommenderConfig)"
          :style="config.itemStyle"
          @click="() => toggleItem(item)"
        >
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </span>

        <span v-else :key="item.text" :style="config.itemStyle">
          <img v-if="item.image" :style="config.imageStyle" :src="item.image">
          <div>{{ item.text }}</div>
        </span>
      </template>
    </div>
  </div>
</template>
