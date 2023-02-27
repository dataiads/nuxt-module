<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"


const config = useRuntimeConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()
</script>

<template>
    <LayoutsCatalog
        v-if="config.public.variation === 'catalog'"
        v-bind="props"
    >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalog>

    <LayoutsCatalogNoFilter
        v-else-if="config.public.variation === 'catalog-no-filter'"
        v-bind="props"
    >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalogNoFilter>

    <span v-else>error: unknown variation</span>
</template>