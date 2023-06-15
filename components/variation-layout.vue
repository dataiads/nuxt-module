<script setup lang="ts">
const lpoConfig = useLpoConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()
</script>

<script lang="ts">
export type Variations = "catalog" | "catalog-high-filters" | "catalog-high-filters-no-slider" | "catalog-high-filters-top-slider" | "catalog-reco-overlay" | "catalog-custom-overlay-right" | "catalog-reco-overlay-right" | "catalog-no-slider" | "catalog-no-slider-xsell-top" | "catalog-top-slider" | "catalog-vertical-slider" | "light" | "light-no-slider" | "light-no-slider-xsell-top" | "light-top-slider" | "light-vertical-slider";
</script>

<template>
    <LayoutsCatalogHighFilters v-if="lpoConfig.variation === 'catalog-high-filters'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogHighFilters>

    <LayoutsCatalogHighFiltersNoSlider v-else-if="lpoConfig.variation === 'catalog-high-filters-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogHighFiltersNoSlider>

    <LayoutsCatalogHighFiltersTopSlider v-else-if="lpoConfig.variation === 'catalog-high-filters-top-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogHighFiltersTopSlider>

    <LayoutsCatalogRecoOverlay v-else-if="lpoConfig.variation === 'catalog-reco-overlay'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogRecoOverlay>

    <LayoutsCatalogRecoOverlayRight v-else-if="lpoConfig.variation === 'catalog-reco-overlay-right'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogRecoOverlayRight>

    <LayoutsCatalogCustomOverlayRight v-else-if="lpoConfig.variation === 'catalog-custom-overlay-right'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogCustomOverlayRight>

    <LayoutsCatalogNoSlider v-else-if="lpoConfig.variation === 'catalog-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogNoSlider>

    <LayoutsCatalogNoSliderXsellTop v-else-if="lpoConfig.variation === 'catalog-no-slider-xsell-top'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogNoSliderXsellTop>

    <LayoutsCatalogTopSlider v-else-if="lpoConfig.variation === 'catalog-top-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogTopSlider>

    <LayoutsCatalogVerticalSlider v-else-if="lpoConfig.variation === 'catalog-vertical-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogVerticalSlider>

    <LayoutsLight v-else-if="lpoConfig.variation === 'light'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLight>

    <LayoutsLightNoSlider v-else-if="lpoConfig.variation === 'light-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLightNoSlider>

    <LayoutsLightNoSliderXsellTop v-else-if="lpoConfig.variation === 'light-no-slider-xsell-top'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLightNoSliderXsellTop>

    <LayoutsLightTopSlider v-else-if="lpoConfig.variation === 'light-top-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLightTopSlider>

    <LayoutsLightVerticalSlider v-else-if="lpoConfig.variation === 'light-vertical-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLightVerticalSlider>

    <!-- "catalog" is the default layout. -->
    <LayoutsCatalog v-else v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalog>
</template>