<script setup lang="ts">

interface Props {
  value: number
  count?: string
  maxValue?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  count: '',
  maxValue: 5,
  class: 'flex space-x-1 items-center'
})

const fullStarsCount = ref(Math.floor(props.value))
const emptyStarsCount = ref(Math.max(props.maxValue - fullStarsCount.value, 0))

</script>

<template>
  <div :class="props.class">
    <slot v-for="index in fullStarsCount" :key="index" name="star-full">
      &#9733;
    </slot>

    <slot v-for="index in emptyStarsCount" :key="index" name="star-empty">
      &#9734;
    </slot>

    <slot name="count" :count="props.count" :value="props.value">
      <div>({{ props.value }})</div>
      <div>{{ props.count }} reviews</div>
    </slot>
  </div>
</template>