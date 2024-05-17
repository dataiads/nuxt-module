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
  return props.elements.find(({ props }) => props.searchable)
})

const displayMore = ref(false)

const moreElementsThanLimit = (criteria: string, limit: number) => {
  const { data: availableValues } = props.filter.fetchCriteriaValues(criteria)
  
  if (availableValues.value == null) {
    return false
  }

  const keys = Object.keys(availableValues.value)

  if (keys.length > limit) {
    return true
  }
}
</script>

<template>
  <div :style="hasSearch ? '' : parameters.style">
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
          :display-more="displayMore"
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
        <button v-if="props.seeMore && moreElementsThanLimit(props.criteria, props.limit)" :key="props" class="filters-btn-see-more" @click="displayMore = !displayMore">
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
        v-bind="Object.fromEntries(Object.entries(props).filter(([key, value]) => value !== 'text'))"
        :key="JSON.stringify(criteriaValuesMinMax?.[props.criteria])"
        :filter="filter"
        :group="props.group || `${props.criteria}-${component}-filter`"
        :min="(props.autoMinMax && criteriaValuesMinMax?.[props.criteria]?.min !== undefined) ? criteriaValuesMinMax[props.criteria].min : props.min"
        :max="(props.autoMinMax && criteriaValuesMinMax?.[props.criteria]?.max !== undefined) ? criteriaValuesMinMax[props.criteria].max : props.max"
        :reverse="props.reverse"
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
          criteria="color"
          operator="CONTAINS_CI"
          :value="key"
        >
          <template #customCheckbox="{ set, get }">
            <button class="flex flex-col items-center" @click="set(key)">
              <div
                class="filters-color h-[20px] w-[20px] rounded-full"
                :class="{ 'border border-black': value === 'white', 'filters-color-selected': get() }"
                :style="{ backgroundColor: value }"
              />
              <span class="mt-1 text-sm" :class="labelClass">
                {{ key }}
              </span>
            </button>
          </template>
        </FiltersCustomCheckbox>
      </div>
      <FiltersCheckbox
        v-for="n in 5"
        v-else-if="component === 'rating'"
        :key="`rating-${props}`"
        :filter="filter"
        :group="`${props.criteria}-${component}-filter`"
        :input-class="!hasCheckboxSlot ? checkboxClass : ''"
        :label-class="!hasLabelSlot ? labelClass : ''"
        :class="autoListClass"
        v-bind="props"
        class="filters-rating"
        :value="`[${6 - n}:${5}]`"
      >
        <template #checkbox="scope">
          <slot name="checkbox" :info="{ id: scope.info.id, type: scope.info.type }" :get="scope.get" :set="scope.set" />
        </template>
        <template #label>
          <template v-if="!props.starFullImg">
            <svg 
              v-for="j in (6 - n)"
              :key="`star-full${j}`"
              class="filters-rating-star__full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :style="props.starSize ? { height: props.starSize, width: props.starSize } : ''"
            ><path fill="currentColor" fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007l5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527l1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354L7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273l-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433l2.082-5.006Z" clip-rule="evenodd" /></svg>
          </template>
          <img
            v-for="j in (6 - n)"
            v-else
            :key="`star-full${j}`"
            class="filters-rating-star__full"
            :src="props.starFullImg"
            alt="star-full"
            :style="props.starSize ? { height: props.starSize, width: props.starSize } : ''"
          >
          <template v-if="!props.starEmptyImg">
            <svg
              v-for="j in (n - 1)"
              :key="`star-empty${j}`"
              class="filters-rating-star__empty"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :style="props.starSize ? { height: props.starSize, width: props.starSize } : ''"
            ><path fill="currentColor" fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007l5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527l1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354L7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273l-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433l2.082-5.006Z" clip-rule="evenodd" /></svg>
          </template>
          <img
            v-for="j in (n - 1)"
            v-else
            :key="`star-empty${j}`"
            class="filters-rating-star__empty"
            :src="props.starEmptyImg"
            :alt="`star-${n}`"
            :style="props.starSize ? { height: props.starSize, width: props.starSize } : ''"
          >
          <span v-if="props.starsLabelTitle && props.moreLabelTitle">
            {{ 6 - n }} {{ 6 - n === 5 ? props.starsLabelTitle : props.moreLabelTitle }}
          </span>
        </template>
      </FiltersCheckbox>
      <FiltersSwitch v-else-if="component === 'switch'" :key="`switch-${props}`" v-bind="props" :filter="filter" />
      <slot v-else :name="`filter_${parameters.title}`" />
    </template>
  </div>
</template>