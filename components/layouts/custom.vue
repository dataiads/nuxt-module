<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app";

const props = defineProps(layoutProps);

let { data: filterProducts } = props.filter.results;

const config = useRuntimeConfig();
const lpoConfig = useLpoConfig();
const baseLayout = lpoConfig.customLayout;
if (!baseLayout) {
  console.error("No custom layout defined");
}

const s = config.public.layoutStyle;

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>(
  "responsiveAsideItemSingleton",
  () => null
);
</script>

<template>
  <div v-if="baseLayout" :class="baseLayout.class"> <!-- TODO: Max width with breakpoints and class ? -->

    <template v-for="element in baseLayout.children">

      <PortableSlot v-if="element.element === 'slot'" :element="element">
        <template #[element.params.name]>
          <slot :name="element.params.name"></slot>
        </template>
      </PortableSlot>

      <!-- Banner -->
      <AutoscrollBanner 
        v-else-if="element.element === 'banner'"
        :class="element.class ?? ''"
        :banners="(element as BannerLayoutElement).params?.banners"
        :background-color="(element as BannerLayoutElement).params?.background"
        :color="(element as BannerLayoutElement).params?.color" 
        v-slot="banner"
      >
        <div :class="banner.class">{{ banner.text }}</div>
      </AutoscrollBanner>
      
      <!-- Slider -->
      <PortableSlider v-else-if="element.element === 'recoSlider'" :element="element">
        <template #reco-slider-header="scope">
          <slot name="reco-slider-header" v-bind="scope"></slot>
        </template>
        <template #reco-slider-item="{ item }">
          <slot name="reco-slider-item" :key="item.id" :item="item"></slot>
        </template>
        <template #reco-slider-previous-btn="scope">
          <slot name="reco-slider-previous-btn" v-bind="scope"></slot>
        </template>
        <template #reco-slider-next-btn="scope">
          <slot name="reco-slider-next-btn" v-bind="scope"></slot>
        </template>
      </PortableSlider>

      <!-- cross-sell -->
      <!-- TODO: Portable cross-sell component -->
      <div v-else-if="element.element === 'cross-sell'" id="cross-sell" :class="s.crossSell.class">
        <slot name="cross-sell"></slot>
      </div>

    </template>

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

  <StickyFooter>
    <slot name="sticky-add-to-cart"></slot>
  </StickyFooter>

  <slot id="filters-drawer" name="filters-drawer"></slot>

  <slot id="menus-drawer" name="menus-drawer"></slot>
</template>
