<script setup lang="ts">
const lpoConfig = useLpoConfig()
const product = useProduct()

const props = defineProps(layoutProps)

let sliderProducts = computed(() => props.recoSliderProducts)
if (props.slider) {
  const { data: sliderProductsData } = props.slider.results
  sliderProducts = sliderProductsData
}
</script>

<script lang="ts">
export type Variations =
  | 'catalog'
  | 'catalog-high-filters'
  | 'catalog-high-filters-no-slider'
  | 'catalog-high-filters-top-slider'
  | 'catalog-high-filters-overlay'
  | 'catalog-high-filters-overlay-right'
  | 'catalog-reco-overlay'
  | 'catalog-custom-overlay-right'
  | 'catalog-reco-overlay-right'
  | 'catalog-no-slider'
  | 'catalog-no-slider-xsell-top'
  | 'catalog-top-slider'
  | 'catalog-vertical-slider'
  | 'custom-layout'
  | 'light'
  | 'light-no-slider'
  | 'light-no-slider-xsell-top'
  | 'light-top-slider'
  | 'light-vertical-slider'
  | 'catalog-xsell-top'
  | 'light-xsell-top'
  | 'catalog-xsell-top-no-slider'
  | 'light-xsell-top-no-slider'
  | 'catalog-high-filters-no-slider-xsell-top';
</script>

<template>
  <a v-if="lpoConfig.accessibilityVariant?.text" :href="$oriUrl(product.data.link)" class="sr-only focus:not-sr-only">
    {{ lpoConfig.accessibilityVariant?.text }}
  </a>

  <component :is="resolveComponent(lpoConfig.variation)" v-if="lpoConfig.variation" :filter="filter" :reco-slider-products="sliderProducts" :slider="slider">
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </component>
</template>
