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
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  type: 'text',
  min: '0',
  max: ''
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
  <div class="flex items-center">
    <input
      :id="uuid"
      class="focus:border-secondary text-black focus:ring-black focus:ring-1 w-full text-black border-black font-normal"
      :value="value"
      :placeholder="props.placeholder"
      :type="props.type"
      :min="props.min"
      :max="props.max"
      :aria-label="ariaLabel"
      @change="change"
      @keyup="change"
    >
    <label class="font-normal text-black leading-[15px]" :for="uuid">
      <span v-if="props.label">{{ props.label }}</span>
      <slot v-else />
    </label>
  </div>
</template>
