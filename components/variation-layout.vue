<script setup lang="ts">
const lpoConfig = useLpoConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()
</script>

<script lang="ts">
export type Variations = "catalog" | "catalog-reco-overlay" | "catalog-no-slider" | "catalog-vertical-slider" | "light" | "light-no-slider" | "light-vertical-slider";
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