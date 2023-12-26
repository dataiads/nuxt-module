<script setup lang="ts">
// random id to link label to the input
const uid = Math.floor(Math.random() * 10 ** 16).toString()

const props = withDefaults(defineProps<{
  label?: string
  filter: Recommender
  criteria: string
  operator?: string
  value?: string
  group: string
  class?: string
  inputClass?: string
  inputStyle?: string|Record<string, any>
  labelClass?: string
}>(), {
  label: '',
  operator: 'EQUAL',
  value: '',
  class: 'flex items-center gap-1 my-1',
  inputClass: 'hover:cursor-pointer',
  labelClass: ''
})

const binder = computed({
  get: () =>
    props.filter.hasRule(props.group, props.criteria, props.operator, props.value),
  set: (val) => {
    if (val) {
      props.filter.removeAllRules(props.group)
      props.filter.pushRule(props.group, props.criteria, props.operator, props.value)
    } else {
      props.filter.removeRule(props.group, props.criteria, props.operator, props.value)
    }
  }
})

</script>

<template>
  <div :class="props.class">
    <input :id="uid" v-model="binder" type="checkbox" :class="props.inputClass" :style="props.inputStyle">
    <label :class="props.labelClass" :for="uid">
      <slot name="label" :label="props.label" :checked="binder">{{ props.label }}</slot>
    </label>
  </div>
</template>
