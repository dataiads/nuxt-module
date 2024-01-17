<script setup lang="ts">
import type { StructuredRecommender } from '~/types'

const props = withDefaults(
  defineProps<{
    parameters: { title: string };
    filter: StructuredRecommender,
    elements: { component: 'autolist-checkbox' | 'checkbox' | 'range' | 'double-range' | 'input'; props: any }[];
    inputClass?: string;
    checkboxClass?: string;
    labelClass?: string;
    autoListClass?: string;
    rangeClass?: string;
    checkboxContainerClass?: string;
  }>(),
  {
    inputClass: 'border-[#9E9E9E]',
    checkboxClass:
      'text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer',
    labelClass: 'leading-[15px] text-sm',
    autoListClass: 'flex items-center gap-3',
    rangeClass: 'grid grid-cols-2 gap-2',
    checkboxContainerClass: 'flex items-center gap-3'
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
</script>

<template>
  <div>
    <template v-for="{ component, props } in elements">
      <FiltersAutolistCheckbox
        v-if="component === 'autolist-checkbox'"
        :key="`autolist-checkbox-${props}`"
        v-bind="props"
        :filter="filter"
        :group="props.group || `${props.criteria}-${component}-filter`"
        :class="autoListClass"
        :input-class="!hasCheckboxSlot ? checkboxClass : ''"
        :label-class="!hasLabelSlot ? labelClass : ''"
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
      <FiltersRangeInputs
        v-else-if="component === 'range'"
        :key="`range-${props}`"
        :filter="filter"
        :group="props.group || `${props.criteria}-${component}-filter`"
        v-bind="props"
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
      <slot v-else :name="`filter_${parameters.title}`" />
    </template>
  </div>
</template>
