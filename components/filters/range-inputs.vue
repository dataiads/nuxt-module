<script setup lang="ts">
const uuid = Math.floor(Math.random() * 10 ** 16);

interface Props {
  filter: Filter;
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
}

const props = withDefaults(defineProps<Props>(), {
  min: "0",
  minPlaceholder: "Min",
  maxPlaceholder: "Max",
  minOperator: "GREATER_OR_EQUAL",
  maxOperator: "LOWER_OR_EQUAL",
  class: "grid grid-cols-2",
});

// both inputs must use a different group to combine with AND
// so group is actually more of a prefix, but still called group for clarity
const minGroup = props.group + "-min";
const maxGroup = props.group + "-max";
</script>

<template lang="pug">
div(:class="props.class")
    FiltersInput(
        type="number"
        :filter="filter"
        :group="minGroup"
        :criteria="props.criteria"
        :operator="props.minOperator"
        :class="props.inputClass"
        :min="props.min"
        :max="props.max"
        :placeholder="props.minPlaceholder"
    )
    FiltersInput(
        type="number"
        :filter="filter"
        :group="maxGroup"
        :criteria="props.criteria"
        :operator="props.maxOperator"
        :class="props.inputClass"
        :min="props.min"
        :max="props.max"
        :placeholder="props.maxPlaceholder"
    )
</template>
