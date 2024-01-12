<template>
  <TransitionRoot
    appear
    :show="overlayState !== 'closed'"
    as="template"
  >
    <Dialog
      id="overlay"
      class="z-20"
      @close="overlayState = 'closed'"
    >
      <TransitionChild
        enter="transition-opacity duration-300 ease-in-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-200 ease-in-out"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0" aria-hidden="true" :style="config.backdropStyle" />
      </TransitionChild>

      <TransitionChild
        enter="transition-transform duration-300 ease-in-out"
        :enter-from="transitionStart"
        :enter-to="transitionEnd"
        leave="transition-transform duration-300 ease-in-out"
        :leave-from="transitionEnd"
        :leave-to="transitionStart"
      >
        <DialogPanel
          id="overlayContent"
          ref="overlayContent"
          class="fixed z-21"
          :class="contentClass"
          :style="config.style"
          @scroll.prevent.stop="onOverlayScroll"
        >
          <DialogTitle v-if="config.title" :style="config.titleStyle">
            {{ config.title }}
          </DialogTitle>
          <Slider v-if="config.sliderMode" v-bind="sliderProps" :items="items" :direction="config.position === 'left' || config.position === 'right' ? 'vertical' : 'horizontal'">
            <template #item="{ item }">
              <RecoSliderItem v-if="(config.itemLayout ?? 'default') === 'default'" :config="{...itemProps, item}" />
              <slot v-else-if="config.itemLayout === 'reco-slider-slot'" name="reco-slider-item" :item="item" />
            </template>
            <template #previous-btn="scope">
              <template v-if="config.previousButton">
                <button @click="scope.click">
                  <img :style="config.buttonStyle" :src="config.previousButton" alt="back button">
                </button>
              </template>
            </template>
            <template #next-btn="scope">
              <template v-if="config.nextButton">
                <button @click="scope.click">
                  <img :style="config.buttonStyle" :src="config.nextButton" alt="next button">
                </button>
              </template>
            </template>
          </Slider>
          <div v-else :style="config.gridStyle">
            <template v-for="item in items">
              <RecoSliderItem v-if="(config.itemLayout ?? 'default') === 'default'" :config="{...itemProps, item}" />
              <slot v-else-if="config.itemLayout === 'reco-slider-slot'" name="reco-slider-item" :item="item" />
            </template>
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue'

import type { LayerParams } from '~/types'
const props = defineProps<{ config: LayerParams }>()
const product = useProduct()

const overlayState = useState<'initial' | 'closed' | 'open'>(
  'recoSlider.overlay.state',
  () => 'closed'
)
const overlayContent = ref(null)
const { y: yScroll } = useWindowScroll()
const isLocked = useScrollLock(document.body)

const sliderProps = {
  autoscroll: props.config.autoscroll,
  scrollSpeed: props.config.scrollSpeed,
  absoluteArrows: props.config.absoluteArrows,
  scrollerStyle: {
    columnGap: props.config.columnGap
  }
}

const itemProps = {
  style: props.config.itemStyle,
  imageStyle: props.config.itemImageStyle,
  titleStyle: props.config.itemTitleStyle,
  priceStyle: props.config.itemPriceStyle
}

let transitionStart = '';
let transitionEnd = '';
let contentClass = '';
if (props.config.position === 'bottom') {
  transitionStart = 'translate-y-full'
  transitionEnd = 'translate-y-0'
  contentClass = 'right-0 left-0 bottom-0 w-full'
}
if (props.config.position === 'top') {
  transitionStart = '-translate-y-full'
  transitionEnd = 'translate-y-0'
  contentClass = 'right-0 left-0 top-0 w-full'
}
if (props.config.position === 'left') {
  transitionStart = '-translate-x-full'
  transitionEnd = 'translate-x-0'
  contentClass = 'left-0 top-0 bottom-0 h-full'
}
if (props.config.position === 'right') {
  transitionStart = 'translate-x-full'
  transitionEnd = 'translate-x-0'
  contentClass = 'right-0 top-0 bottom-0 h-full'
}

onClickOutside(overlayContent, () => (overlayState.value = 'closed'))

setTimeout(() => {
  overlayState.value = 'initial'
}, props.config.delay)

watch(yScroll, () => {
  if (props.config.hideOnScroll && overlayState.value === 'initial') {
    overlayState.value = 'closed'
  }
})

const onOverlayScroll = () => {
  // TODO: Handle overlay state initial
  if (overlayState.value === 'initial') {
    overlayState.value = 'open'
  }
}

watch(overlayState, () => { isLocked.value = (overlayState.value == 'open' || (overlayState.value == 'initial' && !props.config.hideOnScroll))}, { immediate: true })

// get product suggestions
const recommender = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort
})
const items = computed(() =>
  recommender.results.data.value?.map((x: Product[]) => x[0])
)
</script>
