<script setup lang="ts">
const lpoConfig = useLpoConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()
</script>

<script lang="ts">
export type Variations = "catalog" | "catalog-reco-overlay" | "catalog-no-slider" | "catalog-no-slider-xsell-top" | "catalog-top-slider" | "catalog-vertical-slider" | "light" | "light-no-slider" | "light-no-slider-xsell-top" | "light-vertical-slider";
</script>

<template>
    <LayoutsCatalogRecoOverlay v-if="lpoConfig.variation === 'catalog-reco-overlay'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogRecoOverlay>    

    <LayoutsCatalogNoSlider v-else-if="lpoConfig.variation === 'catalog-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogNoSlider>

    <LayoutsCatalogNoSliderXsellTop v-if="lpoConfig.variation === 'catalog-no-slider-xsell-top'" v-bind="props" >
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