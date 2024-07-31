<script setup lang="ts">
import { AccordionItem, AccordionTrigger, AccordionHeader, AccordionContent } from 'radix-vue'
import { useFilters } from '~/composables/useFilters'

const props = defineProps<{ panel: any }>()
const { config } = useFilters()


const hasSearch = computed(() => {
  return props.panel.elements.find(({ props }) => props.searchable)
})
</script>





<template>
  <AccordionItem :value="panel.title">
    <AccordionHeader class="filters-panel-header" :style="config.filterParamsHeaderStyle">
      <AccordionTrigger class="filters-panel-trigger flex flex-1 items-center justify-between group" :style="config.filterParamsHeaderTitleStyle">
        <DynamicLabel :value="panel.title" />
        <img class="filters-panel-icon" :src="config.filterParamsOpenedIcon || config.filterParamsClosedIcon" :style="config.filterParamsHeaderIconStyle">
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>
      <div :style="hasSearch ? '' : panel.style">
        <FiltersComponent v-for="element in panel.elements" :key="panel.title" class="filters-panel-component" :element="element" :style="panel.style" />
      </div>
    </AccordionContent>
  </AccordionItem>
</template>


<style lang="scss">
.filters-panel-trigger {
  @apply whitespace-nowrap text-base;
}
.filters-panel-trigger[data-state="open"] > .filters-panel-icon {
  transform: rotate(180deg);
}
</style>