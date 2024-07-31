<script setup lang="ts">
import type { StructuredRecommender } from '~/types'

interface Props {
  filter: StructuredRecommender;
  criteria: string;
  group: string;
  min?: string;
  max?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  minOperator?: string;
  maxOperator?: string;
  inputClass?: string;
  class?: string;
  labelMin?: string;
  labelMax?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: '0',
  minPlaceholder: 'Min',
  maxPlaceholder: 'Max',
  minOperator: 'GREATER_OR_EQUAL',
  maxOperator: 'LOWER_OR_EQUAL',
  class: 'grid grid-cols-2'
})

// both inputs must use a different group to combine with AND
// so group is actually more of a prefix, but still called group for clarity
const minGroup = props.group + '-min'
const maxGroup = props.group + '-max'

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div :class="props.class">
    <FiltersInput
      type="number"
      :filter="filter"
      :group="minGroup"
      criteria="test"
      :operator="props.minOperator"
      :class="props.inputClass"
      :min="props.min"
      :max="props.max"
      :aria-label="labelMin"
      :placeholder="props.minPlaceholder"
    />
    <FiltersInput
      type="number"
      :filter="filter"
      :group="maxGroup"
      :criteria="props.criteria"
      :operator="props.maxOperator"
      :class="props.inputClass"
      :min="props.min"
      :max="props.max"
      :aria-label="labelMax"
      :placeholder="props.maxPlaceholder"
    />
  </div>
</template>


<style lang="scss">
.filters-range-inputs {
  @apply grid grid-cols-2 gap-2;
}
</style>