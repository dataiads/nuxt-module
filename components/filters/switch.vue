<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
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
  }>(),
  {
    label: '',
    operator: 'EQUAL',
    value: '',
    valueCriteria: '',
    baseProductCriteria: ''
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
    props.filter.pushRule(
      props.group,
      props.criteria,
      props.operator,
      props.value,
      props.valueCriteria,
      props.baseProductCriteria
    )
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
  <SwitchGroup>
    <div class="flex items-center gap-3">
      <Switch
        :value="get()"
        :class="get() ? 'filters-switch__on' : 'filters-switch__off'"
        class="filters-switch"
        @update:model-value="set($event)"
      >
        <span />
      </Switch>
      <SwitchLabel class="cursor-pointer leading-[15px] text-sm">
        {{ label }}
      </SwitchLabel>
    </div>
  </SwitchGroup>
</template>
