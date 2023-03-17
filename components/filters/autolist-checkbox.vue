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
  sort?: (values: string[]) => string[]
}>(), {
  operator: "EQUAL"
});

const { data: availableValues } = props.filter.fetchCriteriaValues(props.criteria)

const sortedValues = computed(() => {
  if (availableValues.value == null) {
    return null
  }
  let keys = Object.keys(availableValues.value)
  if (props.sort) {
    keys = props.sort(keys)
  }
  return keys.map(k => [k, availableValues.value[k]])
})

</script>

<template>
  <FiltersCheckbox v-for="[value, count] in sortedValues" :value="value.toString()" v-bind="props">
    <template #label="scope">
      <slot name="label" :value="value" :count="count">{{ value }} ({{ count }})
      </slot>
    </template>
  </FiltersCheckbox>
</template>
