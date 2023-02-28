<script setup lang="ts">
// @ts-ignore
const { $lpoConfig } = useNuxtApp()

// Variation is changed in the backoffice.
// OR by editing dev.config.ts in dev env.
const variation = $lpoConfig.get('variation', 'catalog')

const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()
</script>

<template>
    <LayoutsCatalog v-if="variation === 'catalog'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalog>

    <LayoutsCatalogNoSlider v-else-if="variation === 'catalog-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogNoSlider>

    <LayoutsLight v-else-if="variation === 'light'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLight>

    <LayoutsLightNoSlider v-else-if="variation === 'light-no-slider'" v-bind="props" >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsLightNoSlider>

    <span v-else>error: unknown variation</span>
</template>