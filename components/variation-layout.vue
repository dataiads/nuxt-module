<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"

const config = useRuntimeConfig()

//TODO dynamic import
</script>

<template>
    <LayoutsCatalog v-if="config.public.variation === 'catalog'">
        <template #header><slot name="header"></slot></template>
        <template #main-product><slot name="main-product"></slot></template>
        <template #reco-slider><slot name="reco-slider"></slot></template>
        <template #filters><slot name="filters"></slot></template>
        <template #reco-main><slot name="reco-main"></slot></template>
        <template #footer><slot name="footer"></slot></template>
    </LayoutsCatalog>

    <LayoutsExample v-else-if="config.public.variation === 'example'">
        <template #header><slot name="header"></slot></template>
        <template #main-product><slot name="main-product"></slot></template>
        <template #reco-slider><slot name="reco-slider"></slot></template>
        <template #filters><slot name="filters"></slot></template>
        <template #reco-main><slot name="reco-main"></slot></template>
        <template #footer><slot name="footer"></slot></template>
    </LayoutsExample>

    <slot v-else></slot>
</template>