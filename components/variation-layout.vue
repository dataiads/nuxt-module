<script setup lang="ts">
const lpoConfig = useLpoConfig();
const product = useProduct();

const props = defineProps<{
  recoSliderProducts: Product[] | null;
  filter: Filter;
  slider: Slider;
}>();

let sliderProducts = computed(() => props.recoSliderProducts);
if (props.slider) {
  const { data: sliderProductsData } = props.slider.results;
  sliderProducts = sliderProductsData;
}
</script>

<script lang="ts">
export type Variations =
  | "catalog"
  | "catalog-high-filters"
  | "catalog-high-filters-no-slider"
  | "catalog-high-filters-top-slider"
  | "catalog-reco-overlay"
  | "catalog-custom-overlay-right"
  | "catalog-reco-overlay-right"
  | "catalog-no-slider"
  | "catalog-no-slider-xsell-top"
  | "catalog-top-slider"
  | "catalog-vertical-slider"
  | "light"
  | "light-no-slider"
  | "light-no-slider-xsell-top"
  | "light-top-slider"
  | "light-vertical-slider"
  | "catalog-xsell-top"
  | "light-xsell-top"
  | "catalog-xsell-top-no-slider"
  | "light-xsell-top-no-slider"
  | "catalog-high-filters-no-slider-xsell-top";
</script>

<template>
  <a
    v-if="lpoConfig.accessibilityVariant?.text"
    :href="$oriUrl(product.data.link)"
    class="sr-only focus:not-sr-only"
  >
    {{ lpoConfig.accessibilityVariant?.text }}
  </a>

  <LayoutsCatalogHighFilters
    v-if="lpoConfig.variation === 'catalog-high-filters'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogHighFilters>

  <LayoutsCatalogHighFiltersNoSlider
    v-else-if="lpoConfig.variation === 'catalog-high-filters-no-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogHighFiltersNoSlider>

  <LayoutsCatalogHighFiltersTopSlider
    v-else-if="lpoConfig.variation === 'catalog-high-filters-top-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogHighFiltersTopSlider>

  <LayoutsCatalogRecoOverlay
    v-else-if="lpoConfig.variation === 'catalog-reco-overlay'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogRecoOverlay>

  <LayoutsCatalogRecoOverlayRight
    v-else-if="lpoConfig.variation === 'catalog-reco-overlay-right'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogRecoOverlayRight>

  <LayoutsCatalogCustomOverlayRight
    v-else-if="lpoConfig.variation === 'catalog-custom-overlay-right'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogCustomOverlayRight>

  <LayoutsCatalogNoSlider
    v-else-if="lpoConfig.variation === 'catalog-no-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogNoSlider>

  <LayoutsCatalogNoSliderXsellTop
    v-else-if="lpoConfig.variation === 'catalog-no-slider-xsell-top'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogNoSliderXsellTop>

  <LayoutsCatalogTopSlider
    v-else-if="lpoConfig.variation === 'catalog-top-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogTopSlider>

  <LayoutsCatalogVerticalSlider
    v-else-if="lpoConfig.variation === 'catalog-vertical-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogVerticalSlider>

  <LayoutsLight v-else-if="lpoConfig.variation === 'light'" :reco-slider-products="sliderProducts"
    :filter="filter">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLight>

  <LayoutsLightNoSlider
    v-else-if="lpoConfig.variation === 'light-no-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLightNoSlider>

  <LayoutsLightNoSliderXsellTop
    v-else-if="lpoConfig.variation === 'light-no-slider-xsell-top'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLightNoSliderXsellTop>

  <LayoutsLightTopSlider
    v-else-if="lpoConfig.variation === 'light-top-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLightTopSlider>

  <LayoutsLightVerticalSlider
    v-else-if="lpoConfig.variation === 'light-vertical-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLightVerticalSlider>

  <LayoutsLightXsellTop
    v-else-if="lpoConfig.variation === 'light-xsell-top'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLightXsellTop>

  <LayoutsCatalogXsellTop
    v-else-if="lpoConfig.variation === 'catalog-xsell-top'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogXsellTop>

  <LayoutsCatalogXsellTopNoSlider
    v-else-if="lpoConfig.variation === 'catalog-xsell-top-no-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogXsellTopNoSlider>

  <LayoutsLightXsellTopNoSlider
    v-else-if="lpoConfig.variation === 'light-xsell-top-no-slider'"
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsLightXsellTopNoSlider>

  <LayoutsCatalogHighFiltersNoSliderXsellTop
    v-else-if="
      lpoConfig.variation === 'catalog-high-filters-no-slider-xsell-top'
    "
    :reco-slider-products="sliderProducts"
    :filter="filter"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalogHighFiltersNoSliderXsellTop>

  <!-- "catalog" is the default layout. -->
  <LayoutsCatalog v-else :reco-slider-products="sliderProducts"
    :filter="filter">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
  </LayoutsCatalog>
</template>
