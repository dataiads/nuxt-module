<script setup lang="ts">
const uuid = Math.floor(Math.random() * 10 ** 16);

const props = withDefaults(defineProps<{
  filter: Filter
  criteria: string
  group: string
  class?: string
  inputClass?: string
  labelClass?: string
  operator?: string
  checkedFirst?: boolean
}>(), {
  operator: "EQUAL"
});

const { data: availableValues } = props.filter.fetchCriteriaValues(props.criteria)
</script>

<template>
  <FiltersCheckbox v-for="(count, value) in availableValues" :value="value.toString()" v-bind="props">
    <template #label="scope">
      <slot name="label" :value="value" :count="count">{{ value }} ({{ count }})
      </slot>
    </template>
  </FiltersCheckbox>
</template>
