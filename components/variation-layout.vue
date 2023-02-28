<script setup lang="ts">
// @ts-ignore
const lpoConfig = useLPOConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()
</script>

<script lang="ts">
export type Variations = "catalog" | "catalog-no-slider" | "light" | "light-no-slider";
</script>

<template>
    <LayoutsCatalog v-if="lpoConfig.variation === 'catalog'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalog>

    <LayoutsCatalogNoSlider v-else-if="lpoConfig.variation === 'catalog-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogNoSlider>

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

    <span v-else>error: unknown variation</span>
</template>