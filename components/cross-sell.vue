<script setup lang="ts">
interface Props {
  // tags data key
  dataKey?: string

  // override tags data from lpo config
  data?: CrossSellData

  // override key matching algorithm
  keyMatcher?: (productKey: string, dataKey: string) => boolean

  // Maps this function to the items array to modify it if necessary (for example if you need to have dynamic data related to the main product)
  dataTransformer?: (data: CrossSellItem) => CrossSellItem;

  class?: string|string[]

  // Slider scroll options
  scroller?: boolean
  scrollerClass?: string[]
  direction?: 'horizontal' | 'vertical',
  autoscroll?: boolean
  scrollSpeed?: number
  absoluteArrows?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: () => [],

  // default key matcher: match by prefix
  keyMatcher: (productKey: string, dataKey: string) => dataKey === '' ? productKey === dataKey : productKey.startsWith(dataKey),

  scroller: false,
  scrollerClass: () => [],
  direction: 'horizontal',
  autoscroll: false,
  scrollSpeed: 5,
  absoluteArrows: true
})

const lpoConfig = useLpoConfig()
const product = useProduct()

let data: CrossSellData = {}
let items: CrossSellItem[] = []

if (props.data) {
  data = props.data
} else if (lpoConfig.crossSellData) {
  data = lpoConfig.crossSellData
}

let crossSellKey: CrossSellKey = { key: props.dataKey ?? '', caseInsensitive: false }
if (lpoConfig.crossSellKey) {
  if (lpoConfig.crossSellKey.key === '') {
    // Empty key option, in case the xSell is the same for all products.
    crossSellKey.key = ''        
  } else {
    crossSellKey = { key: getAttr(product.value, lpoConfig.crossSellKey.key) ?? '', caseInsensitive: lpoConfig.crossSellKey.caseInsensitive }
  }
}

if (data) {
  for (const [dataKey, value] of Object.entries(data)) {
    if (crossSellKey.caseInsensitive && props.keyMatcher(crossSellKey.key.toLowerCase(), dataKey.toLowerCase())) {
      items = value
      break
    }
    if (props.keyMatcher(crossSellKey.key, dataKey)) {
      items = value
      break
    }
  }
}

if (props.dataTransformer) {
  items = items.map(props.dataTransformer)
}
</script>

<template>
  <template v-if="items">
    <slot name="title" />

    <div :class="props.class">
      <Slider
        v-if="scroller"
        :items="items"
        :direction="direction"
        :scroller-class="scrollerClass"
        :autoscroll="autoscroll"
        :scroll-speed="scrollSpeed"
        :absolute-arrows="absoluteArrows"
      >
        <template #previous-btn="{ click }">
          <slot name="previous-btn" :click="click" />
        </template>
        <template #item="{ item }">
          <a :href="item.link">
            <slot name="item" :text="item.text" :image="item.image" />
          </a>
        </template>
        <template #next-btn="{ click }">
          <slot name="next-btn" :click="click" />
        </template>
      </Slider>

      <a v-for="(item, index) in items" v-else :key="index" :href="item.link">
        <slot name="item" :text="item.text" :image="item.image" />
      </a>
    </div>
  </template>
</template>