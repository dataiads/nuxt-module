<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"

const config = useRuntimeConfig()

const slotNames = ["header", "main-product", "reco-slider", "filters", "reco-main", "footer"]

</script>

<template>
    <LayoutsCatalog v-if="config.public.variation === 'catalog'">
        <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name"></slot>
        </template>

        <!--
        <template v-slot:[] v-for=""></template>
        <template #header><slot name="header"></slot></template>
        <template #main-product><slot name="main-product"></slot></template>
        <template #reco-slider><slot name="reco-slider"></slot></template>
        <template #filters><slot name="filters"></slot></template>
        <template #reco-main><slot name="reco-main"></slot></template>
        <template #footer><slot name="footer"></slot></template>
        -->
    </LayoutsCatalog>

    <LayoutsExample v-else-if="config.public.variation === 'example'">
        <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name"></slot>
        </template>
        <!--
        <template #header><slot name="header"></slot></template>
        <template #main-product><slot name="main-product"></slot></template>
        <template #reco-slider><slot name="reco-slider"></slot></template>
        <template #filters><slot name="filters"></slot></template>
        <template #reco-main><slot name="reco-main"></slot></template>
        <template #footer><slot name="footer"></slot></template>
        -->
    </LayoutsExample>

    <span v-else>error: unknown variation</span>
</template>