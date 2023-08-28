<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app";
import { useScrollLock } from "@vueuse/core";

const props = defineProps<{
  recoSliderProducts: Product[] | null;
  filter: Filter;
  extraProducts?: Product[];
}>();

let { data: filterProducts } = props.filter.results;

const config = useRuntimeConfig();
const lpoConfig = useLpoConfig();
const s = config.public.layoutStyle;

const overlayState = useState<"initial" | "closed" | "open">(
  "recoSlider.overlay.state",
  () => "closed"
);

setTimeout(() => {
  overlayState.value = "initial";
}, 1000);

const { y: yScroll } = useWindowScroll();
watch(yScroll, () => {
  if (overlayState.value === "initial") {
    overlayState.value = "closed";
  }
});

const onOverlayScroll = () => {
  if (overlayState.value === "initial") {
    overlayState.value = "open";
  }
};
const openIfClosed = () => {
  if (overlayState.value == "closed") {
    overlayState.value = "open";
  }
};
const isLocked = useScrollLock(document.body);
watch(
  overlayState,
  () => {
    isLocked.value = overlayState.value == "open";
  },
  { immediate: true }
);

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>(
  "responsiveAsideItemSingleton",
  () => null
);
</script>

<template>
  <div class="lg:mx-auto">
    <header id="header" :class="s.header.class">
      <slot name="header"></slot>
    </header>

    <div id="breadcrumb" :class="s.breadcrumb.class">
      <slot name="breadcrumb"></slot>
    </div>

    <main
      id="main-product"
      v-if="lpoConfig.useLightMainProduct"
      :class="s.mainProduct.class"
    >
      <slot name="main-product-light">
        <slot name="main-product-light-header"></slot>

        <slot name="main-product-light-aside"></slot>

        <div :class="s.mainProduct.imageClass">
          <slot name="main-product-light-image"></slot>
        </div>
        <div :class="s.mainProduct.descriptionClass">
          <slot name="main-product-light-description"></slot>
        </div>

        <slot name="main-product-light-footer"></slot>
      </slot>
    </main>
    <main id="main-product" v-else :class="s.mainProduct.class">
      <slot name="main-product">
        <slot name="main-product-header"></slot>

        <slot name="main-product-aside"></slot>

        <div :class="s.mainProduct.imageClass">
          <slot name="main-product-image"></slot>
        </div>
        <div :class="s.mainProduct.descriptionClass">
          <slot name="main-product-description"></slot>
        </div>

        <slot name="main-product-footer"></slot>
      </slot>
    </main>

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
      <slot
        name="reco-slider"
        :items="props.recoSliderProducts"
        :onOverlayScroll="onOverlayScroll"
      >
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
          <slot name="reco-slider-header"></slot>
          <div
            @scroll.prevent.stop="onOverlayScroll"
            class="overflow-scroll w-full h-full scrollbar-hide"
            :class="s.recoSlider.class"
          >
            <div
              class="flex flex-wrap md:flex-nowrap flex-row mb-6 md:mb-0"
              :class="s.recoSlider.sliderClass"
            >
              <div
                v-for="item in props.recoSliderProducts"
                :key="item.id"
                :class="s.recoSlider.itemClass"
              >
                <slot name="reco-slider-item" :item="item"></slot>
              </div>
            </div>
          </div>
          <slot name="reco-slider-footer"></slot>
        </div>
      </slot>
    </div>

    <div id="filters-header" :class="s.filters.headerClass">
      <slot name="filters-header"></slot>
    </div>

    <div id="filters" :class="s.filters.class">
      <div
        id="filters-aside"
        :class="[
          ...s.filters.asideClass,
          mobileFilterOpen != null ? 'overflow-x-hidden' : 'overflow-x-scroll',
        ]"
      >
        <slot name="filters-aside"></slot>
      </div>
      <div id="filters-content" :class="s.filters.contentClass">
        <div id="filters-content-header" :class="s.filters.contentHeaderClass">
          <slot name="filters-content-header"></slot>
        </div>
        <div :class="s.filters.contentGridClass">
          <slot
            v-if="filterProducts?.length"
            name="filters-content-grid-item"
            v-for="(item, index) in filterProducts"
            :key="item.id ? item.id : JSON.stringify(item)"
            :item="item"
            :index="index"
          ></slot>
          <slot v-else name="filters-no-results"></slot>
        </div>
        <div id="filters-pagination" :class="s.filters.paginationClass">
          <slot name="filters-pagination"></slot>
        </div>
      </div>
    </div>
  </div>
  <div id="cross-sell" :class="s.crossSell.class">
    <slot name="cross-sell"></slot>
  </div>

  <div id="extra-reco" v-if="lpoConfig.extraReco" :class="s.extraReco.class">
    <div id="extra-reco-content" :class="s.extraReco.contentClass">
      <div
        id="extra-reco-content-header"
        :class="s.extraReco.contentHeaderClass"
      >
        <slot name="extra-reco-content-header"></slot>
      </div>
      <div :class="s.extraReco.contentGridClass">
        <slot
          name="extra-reco-content-grid-item"
          v-for="item in extraProducts"
          :key="item.id ? item.id : JSON.stringify(item)"
          :item="item"
        ></slot>
      </div>
    </div>
  </div>

  <footer id="footer" :class="s.footer.class">
    <slot name="footer"></slot>
  </footer>

  <StickyFooter>
    <slot name="sticky-add-to-cart"></slot>
  </StickyFooter>

  <!-- STICKY BUTTON OPEN OVERLAY (catalog-reco-overlay-right) -->
  <div
    v-if="s.recoSlider.openOverlayButton"
    class="sticky bottom-0 transition duration-70 z-[11] hover:cursor-pointer"
    @click="openIfClosed"
  >
    <div
      class="flex sticky px-[20px] lg:pl-0 pt-[10px] lg:pt-[15px] h-[40px] lg:h-[50px] md:self-start"
      :class="{
        '': overlayState === 'closed',
        'bg-white': overlayState === 'closed',
        hidden: overlayState !== 'closed',
      }"
    >
      <div class="hidden md:flex lg:w-[280px] xl:w-[320px] 2xl:w-[360px]"></div>
      <div class="flex grow justify-between">
        <slot name="sticky-reco-overlay"></slot>
      </div>
    </div>
  </div>

  <slot id="filters-drawer" name="filters-drawer"></slot>

  <slot id="menus-drawer" name="menus-drawer"></slot>
</template>
