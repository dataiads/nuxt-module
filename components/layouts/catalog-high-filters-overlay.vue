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

        <div v-if="recoSliderProducts?.length" id="reco-slider" :class="s.recoSlider.class">
          <div :class="s.recoSlider.containerClass">
            <slot name="reco-slider-header" />
            <Slider :items="props.recoSliderProducts" :scroller-class="s.recoSlider.sliderClass" :arrow-class="s.recoSlider.arrowClass" :autoscroll="s.recoSlider.autoscroll" :scroll-speed="s.recoSlider.scrollSpeed">
              <template #item="{ item }">
                <slot :key="item.id" name="reco-slider-item" :item="item" />
              </template>
              <template #previous-btn="scope">
                <slot name="reco-slider-previous-btn" v-bind="scope" />
              </template>
              <template #next-btn="scope">
                <slot name="reco-slider-next-btn" v-bind="scope" />
              </template>
            </Slider>
          </div>
        </div>

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
      class="fixed bottom-0 w-full bg-black/50 z-20"
      :class="[
        ...s.recoSlider.overlayClass,
        {
          'pointer-events-none': overlayState === 'closed',
          'h-0': overlayState === 'closed',
          'h-full': overlayState !== 'closed',
        },
      ]"
      @click="overlayState = 'closed'"
    >
      <slot name="reco-slider" :items="props.recoSliderProducts" :on-overlay-scroll="onOverlayScroll">
        <div
          ref="overlayElement"
          class="fixed w-full bottom-0 h-full md:h-auto transition duration-500 ease-in-out z-21 bg-white p-2"
          :class="[
            ...s.recoSlider.containerClass,
            {
              'translate-y-[50vh]': overlayState === 'initial',
              'md:translate-y-0': overlayState === 'initial',
              'translate-y-0': overlayState === 'open',
              'translate-y-full': overlayState === 'closed',
            },
          ]"
        >
          <slot name="reco-slider-header" />
          <div class="overflow-scroll w-full h-full scrollbar-hide" :class="s.recoSlider.class" @scroll.prevent.stop="onOverlayScroll">
            <div class="flex flex-wrap md:flex-nowrap flex-row mb-6 md:mb-0" :class="s.recoSlider.sliderClass">
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

  <!-- STICKY BUTTON OPEN OVERLAY (catalog-reco-overlay-right) -->
  <div v-if="s.recoSlider.openOverlayButton" class="sticky bottom-0 transition duration-70 z-[11] hover:cursor-pointer" @click="openIfClosed">
    <div
      class="flex sticky px-[20px] lg:pl-0 pt-[10px] lg:pt-[15px] h-[40px] lg:h-[50px] md:self-start"
      :class="{
        '': overlayState === 'closed',
        'bg-white': overlayState === 'closed',
        hidden: overlayState !== 'closed',
      }"
    >
      <div class="hidden md:flex lg:w-[280px] xl:w-[320px] 2xl:w-[360px]" />
      <div class="flex grow justify-between">
        <slot name="sticky-reco-overlay" />
      </div>
    </div>
  </div>

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
