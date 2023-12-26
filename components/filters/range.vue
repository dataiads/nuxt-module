<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number;
    name?: string;
    min?: number;
    max?: number;
    step?: number;
  }>(),
  { max: 1000 }
)


const emit = defineEmits(['change', 'update:modelValue'])

const onChange = (event: Event) => {
  emit('change', event)
}

const minAngle = ref(10)
const maxAngle = ref(30)

const sliderMin = computed(() => ({
  get: () => {
    const val = parseInt(minAngle.value)
    return val
  },
  set: (val) => {
    val = parseInt(val)
    if (val > maxAngle.value) {
      maxAngle.value = val
    }
    minAngle.value = val
  }
}))

const sliderMax = computed(() => ({
  get: function () {
    const val = parseInt(maxAngle.value)
    return val
  },
  set: function (val) {
    val = parseInt(val)
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
      v-model="sliderMin"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      type="range"
      class="absolute left-0 bottom-0"
      @change="onChange"
    >
    <input
      v-model="sliderMax"
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
