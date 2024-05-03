<script setup lang="ts">

// random id to link label to the input
const uid = Math.floor(Math.random() * 10 ** 16).toString()

const props = withDefaults(defineProps<{
  label?: string
  filter: Recommender
  criteria: string
  operator?: string
  group: string
  class?: string
  value?: string
}>(), {
  label: '',
  operator: 'EQUAL',
  value: '',
  class: 'flex items-center gap-1 my-1'
})

const binderGenerator = () => computed({
  get: () =>
    props.filter.hasRule(props.group, props.criteria, props.operator, props.value),
  set: (val) => {
    if (val) {
      props.filter.pushRule(props.group, props.criteria, props.operator, props.value)
    } else {
      props.filter.removeRule(props.group, props.criteria, props.operator, props.value)
    }
  }
})

const set = (val: any) => {
  if (val) {
    props.filter.pushRule(props.group, props.criteria, props.operator, props.value)
  } else {
    props.filter.removeRule(props.group, props.criteria, props.operator, props.value)
  }
}

const get = () => {
  return props.filter.hasRule(props.group, props.criteria, props.operator, props.value)
}
</script>

<template>
  <div :class="props.class">
    <slot :id="uid" name="customCheckbox" :binder-generator="binderGenerator" :set="set" :get="get" />
  </div>
</template>
