<script setup lang="ts">
// random id to link label to the input
const uid = Math.floor(Math.random() * 10 ** 16).toString()

const props = withDefaults(
  defineProps<{
    label?: string;
    filter: Recommender;
    criteria: string;
    operator?: string;
    value?: string;
    valueCriteria?: string;
    baseProductCriteria?: string;
    group: string;
    class?: string;
    inputClass?: string;
    inputStyle?: string | Record<string, any>;
    labelClass?: string;
    allowSingleCheckbox: boolean
  }>(),
  {
    label: '',
    operator: 'EQUAL',
    value: '',
    valueCriteria: '',
    baseProductCriteria: '',
    class: 'flex items-center gap-1 my-1',
    inputClass: 'hover:cursor-pointer',
    labelClass: '',
    allowSingleCheckbox: false
  }
)

const get = () => {
  return props.filter.hasRule(
    props.group,
    props.criteria,
    props.operator,
    props.value,
    props.valueCriteria,
    props.baseProductCriteria
  )
}

const set = (v: any) => {
  if (v) {
    if (props.allowSingleCheckbox) {
      props.filter.setOnlyRule(
        props.group,
        props.criteria,
        props.operator,
        props.value,
        props.valueCriteria,
        props.baseProductCriteria
      )
    } else {
      props.filter.pushRule(
        props.group,
        props.criteria,
        props.operator,
        props.value,
        props.valueCriteria,
        props.baseProductCriteria
      )
    } 
  } else {
    props.filter.removeRule(
      props.group,
      props.criteria,
      props.operator,
      props.value,
      props.valueCriteria,
      props.baseProductCriteria
    )
  }
}

const binder = computed({
  get: () => get(),
  set: (val) => {
    set(val)
  }
})
</script>

<template>
  <div :class="props.class">
    <slot
      name="checkbox"
      :info="{ id: uid, type: 'checkbox' }"
      :get="get"
      :set="set"
    >
      <input
        :id="uid"
        v-model="binder"
        type="checkbox"
        :class="props.inputClass"
        :style="props.inputStyle"
      >
    </slot>
    <label :class="props.labelClass" :for="uid">
      <slot name="label" :value="props.label" :checked="binder">{{
        props.label
      }}</slot>
    </label>
  </div>
</template>
