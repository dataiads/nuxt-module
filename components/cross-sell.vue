<script lang="ts">
export type ScrollDirection = "horizontal" | "vertical"

export class ScrollController {
  #el: HTMLElement;
  #direction: ScrollDirection;

  constructor(element: HTMLElement, direction: ScrollDirection) {
    this.#el = element
    this.#direction = direction
  }

  // current scroll position
  get position(): number {
    return this.#direction === "horizontal" ? this.#el.scrollLeft : this.#el.scrollTop
  }

  // scroll area size = front
  get size(): number {
    return this.#direction === "horizontal" ? this.#el.clientWidth : this.#el.clientHeight
  }

  // scroll area real size = back
  get max(): number {
    return this.#direction === "horizontal" ? this.#el.scrollWidth : this.#el.scrollHeight
  }

  reachedStart(): boolean {
    return Math.round(this.position) <= 0
  }

  reachedEnd(): boolean {
    return Math.round(this.position) >= this.max - this.size
  }

  scroll(value: number, behavior: ScrollBehavior) {
    value = Math.round(value)
    if (this.#direction === "horizontal") {
      this.#el.scroll({ left: value, behavior })
    } else {
      this.#el.scroll({ top: value, behavior })
    }
  }

  scrollBy(value: number, behavior: ScrollBehavior) {
    value = Math.round(value)
    if (this.#direction === "horizontal") {
      this.#el.scrollBy({ left: value, behavior })
    } else {
      this.#el.scrollBy({ top: value, behavior })
    }
  }
}
</script>

<script setup lang="ts">
import { WritableComputedRef } from 'vue';

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
  direction?: "horizontal" | "vertical",
  autoscroll?: boolean
  scrollSpeed?: number
  absoluteArrows?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: () => [],

  // default key matcher: match by prefix
  keyMatcher: (productKey: string, dataKey: string) => productKey.indexOf(dataKey) == 0,

  scroller: false,
  scrollerClass: () => [],
  direction: "horizontal",
  autoscroll: false,
  scrollSpeed: 5,
  absoluteArrows: true,
})

const hover = ref(false)
const scrollerEl = props.scroller ? ref<HTMLElement>() : null;

let scrollController: ScrollController

const previous = () => {
  if (scrollController) {
    if (scrollController.reachedStart()) {
      scrollController.scroll(scrollController.max - scrollController.size, "smooth")
    } else {
      scrollController.scrollBy(-0.8 * scrollController.size, "smooth")
    }
  }
}

const next = () => {
  if (scrollController) {
    if (scrollController.reachedEnd()) {
      scrollController.scroll(0, "smooth")
    } else {
      scrollController.scrollBy(0.8 * scrollController.size, "smooth")
    }
  }
}

if (props.autoscroll) {
  window.setInterval(() => {
    if (scrollController && !hover.value) {
      if (scrollController.reachedEnd()) {
        scrollController.scroll(0, "auto")
      } else {
        scrollController.scrollBy(1, "auto")
      }
    }
  }, 50 / props.scrollSpeed)
}

onMounted(() => {
  if (scrollerEl?.value) {
    scrollController = new ScrollController(scrollerEl.value, props.direction)
  }
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

const scrollerClass = [
    "flex",
    "flex-nowrap",
    "scrollbar-hide",
    props.direction === "horizontal" ? "flex-row" : "flex-col",
    props.direction === "horizontal" ? "overflow-x-scroll" : "overflow-y-scroll",
    ...props.scrollerClass,
]

const previousClass = [
    props.absoluteArrows ? "absolute": "relative",
    "hidden",
    "md:block",
    "top-0",
    "left-0",
    "z-10",
    props.direction === "horizontal" ? "bottom-0" : "right-0",
]

const nextClass = [
    props.absoluteArrows ? "absolute": "relative",
    "hidden",
    "md:block",
    "bottom-0",
    "right-0",
    "z-10",
    props.direction === "horizontal" ? "top-0" : "left-0",
]

const previousContentClass = [
    "flex",
    props.direction === "vertical" ? "flex-col" : "flex-row",
    "justify-center",
    props.direction === "horizontal" ? "h-full" : "w-full",
]

const nextContentClass = previousContentClass.concat()

const largeEnoughToScroll = ref(false)
let x: WritableComputedRef<number>
onMounted(() => {
  if (!scrollerEl?.value) {
      return
  }

  largeEnoughToScroll.value = scrollerEl.value.scrollWidth > scrollerEl.value.clientWidth;
  ({ x } = useScroll(scrollerEl.value)) // https://vueuse.org/core/useScroll/#usescroll
})
</script>

<template>
<template v-if="items">
  <slot name="title"></slot>

  <div :class="props.class" @mouseenter="hover = true" @mouseleave="hover = false">

    <div v-if="scroller" :class="previousClass">
      <div :class="previousContentClass">
        <slot name="previous-btn" :click="previous" v-if="x > 0">
          <div @click="previous" class="hover:bg-slate-500/10 cursor-pointer rounded-full px-4 text-3xl">&lt;</div>
        </slot>
      </div>
    </div>

    <div v-if="scroller" :class="scrollerClass" ref="scrollerEl">
      <a v-for="item in items" :href="item.link">
        <slot name="item" :text="item.text" :image="item.image"></slot>
      </a>
    </div>

    <a v-else v-for="item in items" :href="item.link">
      <slot name="item" :text="item.text" :image="item.image"></slot>
    </a>

    <div v-if="scroller" :class="nextClass">
      <div :class="nextContentClass">
        <slot name="next-btn" :click="next" v-if="largeEnoughToScroll">
          <div @click="next" class="hover:bg-slate-500/10 cursor-pointer rounded-full px-4 text-3xl">&gt;</div>
        </slot>
      </div>
    </div>
  </div>
</template>

</template>