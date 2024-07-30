<script setup lang="ts">
import { useFilters } from '~/composables/useFilters'

defineProps<{ panel: any }>()
const { config } = useFilters()
</script>





<template>
  <AccordionItem :value="panel.title">
    <AccordionTrigger class="filters-panel-title" :style="config.filterParamsHeaderTitleStyle">
      <DynamicLabel :value="panel.title" />
    </AccordionTrigger>
    <FiltersComponent v-for="element in panel.elements" :key="panel.title" class="filters-panel-component" :element="element" :style="panel.style" />
  </AccordionItem>
</template>


<style lang="scss">
.filters-panel-title {
  @apply whitespace-nowrap text-base;
}
</style>