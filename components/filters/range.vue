<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: number;
    name?: string;
    min?: number;
    max?: number;
    step?: number;
  }>(),
  { max: Math.max(), name: '', min: 0, step: 1 }
)

const progressClass: string[] = []
const progressStyle: string[] = []

const emit = defineEmits(['change', 'update:modelValue'])

const onChange = (event: Event) => {
  emit('change', event)
}

const minAngle = ref(10)
const maxAngle = ref(30)

const sliderMin = computed(() => ({
  get: () => {
    return minAngle.value
  },
  set: (val: number) => {
    if (val > maxAngle.value) {
      maxAngle.value = val
    }
    minAngle.value = val
  }
}))

const sliderMax = computed(() => ({
  get: function () {
    return maxAngle
  },
  set: function (val: number) {
    if (val < minAngle.value) {
      minAngle.value = val
    }
    maxAngle.value = val
  }
}))
</script>

<template>
  <div class="range-slider">
    {{ sliderMin }} - {{ sliderMax }}
    <input
      v-model.number="sliderMin"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      type="range"
      class="absolute left-0 bottom-0"
      @change="onChange"
    >
    <input
      v-model.number="sliderMax"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      type="range"
      class="absolute left-0 bottom-0"
      @change="onChange"
    >

    <span :class="progressClass" :style="progressStyle" />
  </div>
</template>

<style>
.range-slider {
  width: 300px;
  margin: auto;
  text-align: center;
  position: relative;
  height: 6em;
}
</style>
