<script setup lang="ts">
const uuid = Math.floor(Math.random() * 10 ** 16);

const props = defineProps<{
  filter: Filter
  criteria: string
  group: string
  class?: string
  inputClass?: string
  labelClass?: string
}>();

const { data: availableValues } = props.filter.fetchCriteriaValues(props.criteria)
</script>

<template>
  <FiltersCheckbox v-for="(count, value) in availableValues" operator="EQUAL" :value="value" v-bind="props"
    :label="`${value} (${count})`">
    <template #label="{ uid, label }">
      <slot name="label" :value="value" :count="count" :uid="uid" :labelClass="labelClass">
        <label :class="props.labelClass" :for="uid">{{ label }}</label>
      </slot>
    </template>
  </FiltersCheckbox>
</template>
