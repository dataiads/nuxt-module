<script setup lang="ts">
import { useFilters } from '@/composables/useFilters'
const props = defineProps<{
  element: any
}>()

const filter = useCustomLayout().filter
const { config } = useFilters()

const COMPONENT_MAPPER = {
  'autolist-checkbox': {
    component: resolveComponent('FiltersAutolistCheckboxWrapper'),
    class: 'filters-checkbox'
  },
  'colors': {
    component: resolveComponent('FiltersColor'),
    class: 'filters-color-container'
  },
  'range': {
    component: resolveComponent('FiltersRangeInputs'),
    class: 'filters-range-inputs'
  },
  'checkbox': {
    component: resolveComponent('FiltersCheckboxWrapper'),
    class: 'filters-checkbox'
  }
}

const mappedComponent = computed(() => COMPONENT_MAPPER[props.element.component])

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div v-if="element.props.subTitle" class="filters-subtitle">
    {{ element.props.subTitle }}
  </div>
  <component :is="mappedComponent.component" v-bind="element.props" :class="mappedComponent.class" :filter="filter" :style="$attrs.style" />
</template>

<style lang="scss">
.filters-subtitle {
  @apply text-sm;
}
</style>

