<script setup lang="ts">
import type { StructuredRecommender } from '~/types'

const props = withDefaults(
  defineProps<{
    parameters: { title: string, style: Object };
    filter: StructuredRecommender,
    elements: { component: 'autolist-checkbox' | 'colors' | 'checkbox' | 'range' | 'double-range' | 'input'; props: any }[];
    inputClass?: string;
    checkboxClass?: string;
    labelClass?: string;
    autoListClass?: string;
    rangeClass?: string;
    checkboxContainerClass?: string;
    colors?: {
      name: string;
      value: string;
    }[];
    subTitleStyle?: Record<string, string>;
  }>(),
  {
    inputClass: 'border-[#9E9E9E]',
    checkboxClass:
      'text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer',
    labelClass: 'leading-[15px] text-sm',
    autoListClass: 'flex items-center gap-3',
    rangeClass: 'grid grid-cols-2 gap-2',
    checkboxContainerClass: 'flex items-center gap-3',
    colors: () => ([]),
    subTitleStyle: () => ({})
  }
)

const { criteriaValuesMinMax } = props.filter

const hasCheckboxSlot = computed(() => {
  const instance = getCurrentInstance()
  return !!instance!.slots.checkbox
})

const hasLabelSlot = computed(() => {
  const instance = getCurrentInstance()
  return !!instance!.slots.checkbox_label
})

const hasSearch = computed(() => {
  props.elements.forEach(({ props }) => {
    if (props.searchable) {
      return true
    }
  })
  return false
})

</script>

<template>
  <div :style="!hasSearch ? '' : parameters.style">
    <template v-for="{ component, props } in elements" :key="props">
      <div v-if="props.subTitle" :key="'subtitle' + props.subTitle" class="text-sm" :style="props.subTitleStyle">
        {{ props.subTitle }}
      </div>
      <template v-if="component === 'autolist-checkbox'">
        <FiltersAutolistCheckbox
          :key="`autolist-checkbox-${props}`"
          v-bind="props"
          :filter="filter"
          :group="props.group || `${props.criteria}-${component}-filter`"
          :class="autoListClass"
          :input-class="!hasCheckboxSlot ? checkboxClass : ''"
          :label-class="!hasLabelSlot ? labelClass : ''"
          :wrapper-div="hasSearch"
          :wrapper-style="hasSearch ? parameters.style : ''"
        >
          <template #checkbox="scope">
            <slot name="checkbox" :info="{ id: scope.info.id, type: scope.info.type }" :get="scope.get" :set="scope.set">
              <slot
                name="auto_checkbox"
                :info="{ id: scope.info.id, type: scope.info.type }"
                :get="scope.get"
                :set="scope.set"
              />
            </slot>
          </template>
          <template #label="{ value, count, checked }">
            <slot name="checkbox_label" :value="value" :count="count" :checked="checked">
              <slot name="auto_list_label" :value="value" :count="count" :checked="checked">
                <slot :name="`auto_list_label_${parameters.title}`" :value="value" :count="count" :checked="checked">
                  <template v-if="value">
                    {{ value }} <template v-if="count">
                      ({{ count }})
                    </template>
                  </template>
                </slot>
              </slot>
            </slot>
          </template>
        </FiltersAutolistCheckbox>
        <button v-if="props.seeMore" :key="props" class="sticky bottom-0" @click="displayMore = !displayMore">
          {{ displayMore ? props.seeLessText : props.seeMoreText }}
        </button>
      </template>
      <FiltersRangeInputs
        v-else-if="component === 'range'"
        :key="`range-${props}`"
        :filter="filter"
        :group="props.group || `${props.criteria}-${component}-filter`"
        v-bind="Object.fromEntries(Object.entries(props).filter(([key, value]) => value !== 'text'))"
        :class="rangeClass"
        :input-class="inputClass"
        :label-class="labelClass"
      />
      <FiltersCheckbox
        v-else-if="component === 'checkbox'"
        :key="`checkbox-${props}`"
        :filter="filter"
        :group="`${props.criteria}-${component}-filter`"
        :input-class="!hasCheckboxSlot ? checkboxClass : ''"
        :label-class="!hasLabelSlot ? labelClass : ''"
        :class="checkboxContainerClass"
        v-bind="props"
      >
        <template #checkbox="scope">
          <slot name="checkbox" :info="{ id: scope.info.id, type: scope.info.type }" :get="scope.get" :set="scope.set" />
        </template>
        <template #label="{ value, checked }">
          <slot name="checkbox_label" :value="value" :checked="checked">
            <template v-if="value">
              {{ value }}
            </template>
          </slot>
        </template>
      </FiltersCheckbox>
      <FiltersDoubleRange
        v-else-if="component === 'double-range'"
        v-bind="props"
        :key="JSON.stringify(criteriaValuesMinMax?.[props.criteria])"
        :filter="filter"
        :group="props.group || `${props.criteria}-${component}-filter`"
        :min="(props.autoMinMax && criteriaValuesMinMax?.[props.criteria]?.min !== undefined) ? criteriaValuesMinMax[props.criteria].min : props.min"
        :max="(props.autoMinMax && criteriaValuesMinMax?.[props.criteria]?.max !== undefined) ? criteriaValuesMinMax[props.criteria].max : props.max"
      >
        <template #text-min />
      </FiltersDoubleRange>
      <FiltersInput
        v-else-if="component === 'input'"
        :key="`input-${props}`"
        :filter="filter"
        :group="props.group || `${props.criteria}-${component}-filter`"
        v-bind="props"
      />

      <div v-else-if="component === 'colors'" :key="`colors-${props}`" class="flex flex-wrap gap-4">
        <FiltersCustomCheckbox
          v-for="({ name: key, value }) of colors"
          :key="'color_' + key"
          :filter="filter"
          v-bind="Object.fromEntries(Object.entries(props).filter(([key, value]) => value !== 'text'))"
          :value="key"
        >
          <template #customCheckbox="{ set }">
            <button class="flex flex-col items-center" @click="set(key)">
              <div
                class="h-[20px] w-[20px] rounded-full"
                :class="{ 'border border-black': value === 'white' }"
                :style="{ backgroundColor: value }"
              />
              <span class="mt-1 text-sm" :class="labelClass">
                {{ key }}
              </span>
            </button>
          </template>
        </FiltersCustomCheckbox>
      </div>
      <slot v-else :name="`filter_${parameters.title}`" />
    </template>
  </div>
</template>
