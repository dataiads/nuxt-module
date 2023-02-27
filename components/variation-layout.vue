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
    <LayoutsCatalog
        v-if="variation === 'catalog'"
        v-bind="props"
    >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsCatalog>

    <LayoutsExample
        v-else-if="variation === 'example'"
        v-bind="props"
    >
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
    </LayoutsExample>

    <span v-else>error: unknown variation</span>
</template>