<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue'

import type { LayerParams } from '~/types'
import type { ScrollDirection } from '../slider.vue';
const props = defineProps<{ config: LayerParams }>()
const product = useProduct()

const customLayout = useCustomLayout()
if (!customLayout) throw new Error("no custom layout initialized")

const overlayContent = ref(null)

const sliderProps = {
  autoscroll: props.config.autoscroll,
  scrollSpeed: props.config.scrollSpeed,
  absoluteArrows: props.config.absoluteArrows,
  direction: (props.config.position === 'left' || props.config.position === 'right' ? 'vertical' : 'horizontal') as ScrollDirection,
  scrollerClass: (props.config.position === 'left' || props.config.position === 'right' ? ['h-screen'] : ['w-screen']),
  scrollerStyle: {
    columnGap: props.config.columnGap
  }
}

const transitionClass = computed(() => {
  let transitionStart = '';
  let transitionEnd = '';
  if (props.config.position === 'bottom') {
    transitionStart = 'translate-y-full'
    transitionEnd = 'translate-y-0'
  } else if (props.config.position === 'top') {
    transitionStart = '-translate-y-full'
    transitionEnd = 'translate-y-0'
  } else if (props.config.position === 'left') {
    transitionStart = '-translate-x-full'
    transitionEnd = 'translate-x-0'
  } else if (props.config.position === 'right') {
    transitionStart = 'translate-x-full'
    transitionEnd = 'translate-x-0'
  }

  return {
    enter: "transition-transform duration-300 ease-in-out",
    enterFrom: transitionStart,
    enterTo: transitionEnd,
    leave: "transition-transform duration-300 ease-in-out",
    leaveFrom: transitionEnd,
    leaveTo: transitionStart
  }
})

onClickOutside(overlayContent, () => customLayout.showOverlay.value = false)
const onScroll = () => {
  if (props.config.hideOnScroll) {
    customLayout.showOverlay.value = false
  }
}

setTimeout(() => customLayout.showOverlay.value = true, props.config.delay)

// get product suggestions
const recommender = useStructuredRecommender({
  productId: product.value.id,
  baseRules: props.config.algo.filterRules,
  sortRules: props.config.algo.sortRules,
  deduplicate: props.config.algo.deduplicate,
  defaultLimit: props.config.algo.limit,
  defaultSort: props.config.algo.sort
})
const items = computed(() => recommender.results.data.value as Product[][])
</script>

<template>
  <TransitionRoot
    appear
    :show="customLayout.showOverlay.value"
    as="template"
  >
    <Dialog
      id="overlay"
      class="z-20 fixed flex inset-0"
      :class="{'justify-end': config.position === 'right', 'flex-col justify-end': config.position === 'bottom'}"
      @close="customLayout.showOverlay.value = false"
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
        <div class="fixed inset-0" aria-hidden="true" :style="config.backdropStyle" @wheel="onScroll()" />
      </TransitionChild>

      <TransitionChild v-bind="transitionClass" as="template">
        <DialogPanel
          id="overlayContent"
          ref="overlayContent"
          class="relative z-21"
          :style="config.style"
        >
          <DialogTitle v-if="config.title" :style="config.titleStyle">
            <DynamicLabel :value="config.title" />
          </DialogTitle>
          <div v-if="config.sliderMode">
            <Slider v-bind="sliderProps" :items="items">
              <template #item="{ item }">
                <CustomLayoutRecoItem v-if="(config.itemLayout ?? 'default') === 'default'" :config="{style: props.config.itemStyle, item}" />
                <slot v-else-if="config.itemLayout === 'reco-slider-slot'" name="reco-slider-item" :item="item" />
                <slot v-else-if="config.itemLayout === 'filters-content-grid-item'" name="filters-content-grid-item" :item="item" />
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
          </div>
          <div v-else :style="config.gridStyle">
            <template v-for="item in items">
              <CustomLayoutRecoItem v-if="(config.itemLayout ?? 'default') === 'default'" :config="{style: config.itemStyle, item}" />
              <slot v-else-if="config.itemLayout === 'reco-slider-slot'" name="reco-slider-item" :item="item" />
              <slot v-else-if="config.itemLayout === 'filters-content-grid-item'" name="filters-content-grid-item" :item="item" />
            </template>
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
