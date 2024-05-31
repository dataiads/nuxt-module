<script setup lang="ts">
const uuid = Math.floor(Math.random() * 10 ** 16).toString()

interface Props {
  label?: string
  filter: Recommender
  criteria: string
  operator: string
  group: string
  placeholder?: string
  type?: string
  min?: string
  max?: string
  ariaLabel?: string
  class?: string
  inputClass?: string
  labelClass?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  min: '0',
  max: '',
  class: 'flex items-center relative',
  inputClass: 'w-full focus:border-secondary text-primary focus:ring-black focus:ring-1 border-primary font-normal',
  labelClass: 'font-normal text-black'
})

const debounce = (callback: (_: Event) => void, wait: number) => {
  let timeoutId: number
  return (evt: Event) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, [evt])
    }, wait)
  }
}

const value = computed(() => props.filter.getFirstRuleValue(props.group) || '')
const change = debounce((evt: Event) => {
  const val = (evt.target as HTMLInputElement).value
  if (val != '') {
    props.filter.setOnlyRule(props.group, props.criteria, props.operator, val)
  } else {
    props.filter.removeAllRules(props.group)
  }
}, 200)

</script>

<template>
  <div :class="props.class">
    <label :class="labelClass" :for="uuid">
      <span v-if="props.label">{{ props.label }}</span>
      <slot v-else />
    </label>
    <input
      :id="uuid"
      :class="props.inputClass"
      :value="value"
      :placeholder="props.placeholder"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      :aria-label="ariaLabel"
      @change="change"
      @keyup="change"
    >
    <div v-if="props.icon" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <img :src="props.icon" class="h-5 w-5" :alt="props.label ?? props.placeholder">
    </div>
  </div>
</template>
