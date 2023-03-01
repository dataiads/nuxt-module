<script setup lang="ts">

// random id to link label to the input
const uid = Math.floor(Math.random() * 10 ** 16).toString();

const props = withDefaults(defineProps<{
  label?: string
  filter: Filter
  criteria: string
  operator?: string
  value?: string
  group: string
  class?: string
  inputClass?: string
  labelClass?: string
}>(), {
  label: "",
  operator: "EQUAL",
  value: "",
  class: "flex items-center gap-1 my-1",
  inputClass: "hover:cursor-pointer",
  labelClass: "",
})

let binder = computed({
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
	<input type="checkbox" :id="uid" :class="props.inputClass" v-model="binder" >
	<label :class="props.labelClass" :for="uid" >
    <slot name="label" :label="props.label">{{ props.label }}</slot>
  </label>
</div>
</template>
