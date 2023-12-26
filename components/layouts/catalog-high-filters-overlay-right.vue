<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from '#app'

const props = defineProps(layoutProps)

const { data: filterProducts } = props.filter.results

const config = useRuntimeConfig()
const lpoConfig = useLpoConfig()
const s = config.public.layoutStyle

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>('responsiveAsideItemSingleton', () => null)
const overlayState = useState<'initial' | 'closed' | 'open'>('recoSlider.overlay.state', () => 'closed')

setTimeout(() => {
  overlayState.value = 'initial'
}, 1000)

const { y: yScroll } = useWindowScroll()
watch(yScroll, () => {
  if (overlayState.value === 'initial') {
    overlayState.value = 'closed'
  }
})

const onOverlayScroll = () => {
  if (overlayState.value === 'initial') {
    overlayState.value = 'open'
  }
}
const openIfClosed = () => {
  if (overlayState.value == 'closed') {
    overlayState.value = 'open'
  }
}

const isLocked = useScrollLock(document.body)
watch(
  overlayState,
  () => {
    isLocked.value = overlayState.value == 'open'
  },
  { immediate: true }
)

// scroll top of the filters when returning less results
onMounted(() => {
  watch(filterProducts, (newData, oldData) => {
    if (oldData && newData.length < oldData.length) {
      document.querySelector('#filters')?.scrollIntoView()
    }
  })
})
</script>

<template>
  <div class="lg:mx-auto">
    <header id="header" :class="s.header.class">
      <slot name="header" />
    </header>

    <div id="breadcrumb" :class="s.breadcrumb.class">
      <slot name="breadcrumb" />
    </div>

    <div id="filters-header" :class="s.filters.headerClass">
      <slot name="filters-header" />
    </div>

    <div :class="s.filters.highFilters">
      <div id="filters-aside" :class="[...s.filters.asideClass, mobileFilterOpen != null ? 'overflow-x-hidden' : 'overflow-x-scroll']">
        <slot name="filters-aside" />
      </div>

      <div>
        <main v-if="lpoConfig.useLightMainProduct" id="main-product" :class="s.mainProduct.class">
          <slot name="main-product-light">
            <slot name="main-product-light-header" />

            <slot name="main-product-light-aside" />

            <div :class="s.mainProduct.imageClass">
              <slot name="main-product-light-image" />
            </div>
            <div :class="s.mainProduct.descriptionClass">
              <slot name="main-product-light-description" />
            </div>

            <slot name="main-product-light-footer" />
          </slot>
        </main>
        <main v-else id="main-product" :class="s.mainProduct.class">
          <slot name="main-product">
            <slot name="main-product-header" />

            <slot name="main-product-aside" />

            <div :class="s.mainProduct.imageClass">
              <slot name="main-product-image" />
            </div>
            <div :class="s.mainProduct.descriptionClass">
              <slot name="main-product-description" />
            </div>

            <slot name="main-product-footer" />
          </slot>
        </main>

        <slot name="sticky-reco-overlay" :open="openIfClosed" />

        <div id="filters" :class="s.filters.class">
          <div id="filters-content" :class="s.filters.contentClass">
            <div id="filters-content-header" :class="s.filters.contentHeaderClass">
              <slot name="filters-content-header" />
            </div>
            <div :class="s.filters.contentGridClass">
              <slot
                v-for="(item, index) in filterProducts"
                v-if="filterProducts?.length"
                :key="item.id ? item.id : JSON.stringify(item)"
                name="filters-content-grid-item"
                :item="item"
                :index="index"
              />
              <slot v-else name="filters-no-results" />
            </div>
            <div id="filters-pagination" :class="s.filters.paginationClass">
              <slot name="filters-pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW STYLE OVERLAY -->
    <div
      class="fixed bottom-0 w-full bg-black/50 z-20 bg-overlay"
      :class="[
        ...s.recoSlider.overlayClass,
        {
          '': overlayState === 'closed',
          'h-0': overlayState === 'closed',
          'h-full': overlayState !== 'closed',
        },
      ]"
      @click="overlayState = 'closed'"
    >
      <slot name="reco-slider" :items="props.recoSliderProducts" :on-overlay-scroll="onOverlayScroll">
        <div
          ref="overlayElement"
          class="fixed right-0 top-0 bottom-0 transition duration-500 ease-in-out z-21 bg-white p-2 w-2/5 lg:w-[380px] h-full"
          :class="[
            ...s.recoSlider.containerClass,
            {
              '': overlayState === 'initial',
              'translate-x-0': overlayState === 'open',
              'translate-x-full': overlayState === 'closed',
            },
          ]"
        >
          <slot name="reco-slider-header" />
          <div :class="s.recoSlider.class" class="overflow-scroll w-full h-full scrollbar-hide" @scroll.prevent.stop="onOverlayScroll">
            <div class="grid grid-cols-1 md:grid-cols-2" :class="s.recoSlider.sliderClass">
              <div v-for="item in props.recoSliderProducts" :key="item.id" :class="s.recoSlider.itemClass">
                <slot name="reco-slider-item" :item="item" />
              </div>
            </div>
          </div>
          <slot name="reco-slider-footer" />
        </div>
      </slot>
    </div>

    <div id="cross-sell" :class="s.crossSell.class">
      <slot name="cross-sell" />
    </div>

    <div v-if="lpoConfig.extraReco" id="extra-reco" :class="s.extraReco.class">
      <div id="extra-reco-content" :class="s.extraReco.contentClass">
        <div id="extra-reco-content-header" :class="s.extraReco.contentHeaderClass">
          <slot name="extra-reco-content-header" />
        </div>
        <div :class="s.extraReco.contentGridClass">
          <slot v-for="item in extraProducts" :key="item.id ? item.id : JSON.stringify(item)" name="extra-reco-content-grid-item" :item="item" />
        </div>
      </div>
    </div>
  </div>

  <footer id="footer" :class="s.footer.class">
    <slot name="footer" />
  </footer>

  <StickyFooter>
    <slot name="sticky-add-to-cart" />
  </StickyFooter>

  <slot id="filters-drawer" name="filters-drawer" />

  <slot id="menus-drawer" name="menus-drawer" />

  <RedirectOverlay>
    <template #overlay>
      <slot name="redirect-overlay" />
    </template>
    <template #message>
      <slot name="redirect-message" />
    </template>
    <template #loader>
      <slot name="redirect-loader" />
    </template>
  </RedirectOverlay>
</template>
