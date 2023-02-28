<script setup lang="ts">

// random id to link label to the input
const uid = Math.floor(Math.random() * 10 ** 16).toString();

const props = withDefaults(defineProps<{
  label?: string
  filter: Filter
  criteria: string
  operator?: string
  group: string
  class?: string
  value?: string
}>(), {
  label: "",
  operator: "EQUAL",
  value: "",
  class: "flex items-center gap-1 my-1",
})

let binderGenerator = () => computed({
  get: () =>
    props.filter.hasRule(props.group, props.criteria, props.operator, props.value),
  set: (val) => {
    if (val) {
      props.filter.pushRule(props.group, props.criteria, props.operator, props.value);
    } else {
      props.filter.removeRule(props.group, props.criteria, props.operator, props.value);
    }
  },
});
</script>

<template>
  <div :class="props.class">
    <slot name="customCheckbox" :id="uid" :binder-generator="binderGenerator"></slot>
  </div>
</template>
