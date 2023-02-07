<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"


const config = useRuntimeConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null;
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

    <LayoutsExample
        v-else-if="config.public.variation === 'example'"
        v-bind="props"
    >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsExample>

    <span v-else>error: unknown variation</span>
</template>