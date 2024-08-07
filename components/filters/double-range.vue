<script setup lang="ts">
import type { StructuredRecommender } from '~/types'

const props = withDefaults(
  defineProps<{
    filter: StructuredRecommender;
    group: string;
    criteria: string;
    step: number;
    trailling?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    reverse?: boolean;
  }>(),
  { min: 0, max: 1000, step: 5, trailling: '€', placeholder: '', reverse: false }
)


const minAngle = ref(props.min)
const maxAngle = ref(props.max)

const sliderMin = computed({
  get: () => {
    return minAngle.value
  },
  set: (val: number) => {
    if (val > maxAngle.value) {
      maxAngle.value = val
    }
    minAngle.value = val
  }
})

const sliderMax = computed({
  get: () => {
    return maxAngle.value
  },
  set: (val: number) => {
    if (val < minAngle.value) {
      minAngle.value = val
    }
    maxAngle.value = val
  }
})

const progressStyle = computed(() => {
  return {
    left: ((sliderMin.value - props.min) / (props.max - props.min)) * 100 + '%',
    width: `${(((sliderMax.value - props.min) - (sliderMin.value - props.min)) / (props.max - props.min)) * 100}%`
  }
})

watchDebounced(
  [sliderMin, sliderMax],
  () => {
    props.filter.setOnlyRule(
      props.group,
      props.criteria,
      'RANGE',
      `[${sliderMin.value}:${sliderMax.value}]`
    )
  },
  { debounce: 500, maxWait: 3000 }
)
</script>

<template>
  <div class="w-full py-2 flex flex-col">
    <div class="flex gap-2" :class="{ 'order-1': !reverse, 'order-2': reverse }">
      <div class="relative flex-1">
        <input
          v-model="sliderMin"
          :placeholder="props.placeholder"
          type="number"
          :min="props.min"
          :max="props.max"
          class="focus:border-secondary focus:ring-black focus:ring-1 w-full text-black border-black font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        >
        <slot name="trailing">
          <span class="absolute inset-y-0 end-0 flex items-center pointer-events-none px-2">
            €
          </span>
        </slot>
      </div>
      <div class="relative flex-1">
        <input
          v-model="sliderMax"
          :placeholder="props.placeholder"
          type="number"
          :min="props.min"
          :max="props.max"
          class="focus:border-secondary focus:ring-black focus:ring-1 w-full text-black border-black font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        >
        <slot name="trailing">
          <span class="absolute inset-y-0 end-0 flex items-center pointer-events-none px-2">
            €
          </span>
        </slot>
      </div>
    </div>
    <div class="range-slider h-[12px] mt-4 w-full relative" :class="{ 'order-2': !reverse, 'order-1': reverse }">
      <input v-model.number="sliderMin" type="range" :min="props.min" :max="props.max" :step="props.step">
      <input v-model.number="sliderMax" type="range" :min="props.min" :max="props.max" :step="props.step">
      <span class="absolute bg-primary h-[var(--double-range-height)] bottom-0 top-0" :style="{ ...progressStyle }">
        <!--

                <div class="absolute left-[-8px] top-[-25px]">
                  <slot name="text-min" :value="sliderMin">
                    {{ sliderMin }} {{ props.criteria === 'price' || 'salePrice' ? ' €' : '' }}
                  </slot>
                </div>
                <div class="absolute right-[-16px] top-[-25px]">
                  <slot name="text-max" :value="sliderMax">
                    {{ sliderMax }} {{ props.criteria === 'price' || 'salePrice' ? ' €': '' }}
                  </slot>
                </div>
             -->
      </span>
    </div>
  </div>
</template>

<style>
:root {
  --double-range-height: 5px;
  --double-range-slider-diameter: 12px;
  --double-range-slider-margin-top: -4px;
}

.range-slider {
  text-align: center;
  position: relative;
}

.range-slider input[type="range"] {
  position: absolute;
  left: 0;
}

.range-slider>input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}

.range-slider>input[type="range"]:focus {
  outline: none;
}

.range-slider>input[type="range"]::-webkit-slider-runnable-track {
  @apply bg-gray-200;
  width: 100%;
  height: var(--double-range-height);
  cursor: pointer;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

.range-slider>input[type="range"] {
  width: 100%;
  height: var(--double-range-height);
  cursor: pointer;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

.range-slider>input[type="range"]::-webkit-slider-thumb {
  @apply border-gray-900 bg-black text-black;
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid;
  height: var(--double-range-slider-diameter);
  width: var(--double-range-slider-diameter);
  border-radius: 25px;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: var(--double-range-slider-margin-top);
}
</style>
