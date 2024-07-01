<script setup lang="ts">
import type { StructuredRecommender } from '~/types'


// random id to link label to the input
const uid = Math.floor(Math.random() * 10 ** 16).toString()

const props = withDefaults(defineProps<{
  label?: string
  filter: StructuredRecommender
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
  if (props.filter.hasRule(props.group, props.criteria, props.operator, val)) {
    props.filter.removeRule(props.group, props.criteria, props.operator, val)
  } else {
    props.filter.pushRule(props.group, props.criteria, props.operator, val)
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
