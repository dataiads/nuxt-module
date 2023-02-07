<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"

const config = useRuntimeConfig()

const props = defineProps<{
    recoSliderProducts: Product[],
}>()
</script>

<template>
    <LayoutsCatalog v-if="config.public.variation === 'catalog'" v-bind="props">
        <template v-for="(_, name) in $slots" v-slot:[name]><slot :name="name"></slot></template>
    </LayoutsCatalog>

    <LayoutsExample v-else-if="config.public.variation === 'example'" v-bind="props">
        <template v-for="(_, name) in $slots" v-slot:[name]><slot :name="name"></slot></template>
    </LayoutsExample>

    <span v-else>error: unknown variation</span>
</template>