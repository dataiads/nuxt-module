
<script setup lang="ts">

const VARIABLE = /{([^}]+)}/g

const props = defineProps<{ value: string }>()
const value = toRef(props, 'value')

const resolvedValue = ref('')

watch(value, async () => {
  const variables = [...props.value.matchAll(VARIABLE)]
  if (variables.length) {
    const values = await $fetch<Record<string, string>>(`/api/products/${encodeURIComponent(useProduct().value.id)}/criteria-values`, {
      params: {
        criteria: JSON.stringify(variables.map(item => item[1]))
      }
    })
    resolvedValue.value = props.value.replaceAll(VARIABLE, (_, group) => values[group] ?? '')
  } else {
    resolvedValue.value = props.value
  }
}, { immediate: true })


</script>

<template>
  {{ resolvedValue }}
</template>
