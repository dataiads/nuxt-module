<script setup lang="ts">
const props = withDefaults(defineProps<{
  // filter values listing settings
  filter: Recommender
  criteria: string
  group: string

  // wrap list items in a global element 
  wrapperDiv?: boolean

  // customize wrapper element
  wrapperClass?: string

  // optional sorting function for value items
  sort?: (values: string[]) => string[]

  // optionnal filter function for value items
  valuesFilter?: RegExp | ((value: string) => boolean)

  // filter-checkbox properties are passed to child components
  class?: string
  inputClass?: string
  labelClass?: string
  operator?: string
}>(), {
  operator: "EQUAL",
  wrapperDiv: false,
});

const { data: availableValues } = props.filter.fetchCriteriaValues(props.criteria)

const sortedValues = computed(() => {
  if (availableValues.value == null) {
    return null;
  }

  let keys = Object.keys(availableValues.value)

  if (props.valuesFilter) {
    if (props.valuesFilter && props.valuesFilter instanceof RegExp) {
      keys = keys.filter(v => !!(props.valuesFilter as RegExp).exec(v))
    } else if (props.valuesFilter instanceof Function) {
      keys = keys.filter(props.valuesFilter)
    }
  }

  if (props.sort) {
    keys = props.sort(keys)
  }

  return keys.map(k => [k, availableValues.value ? availableValues.value[k] : null])
})

</script>

<template>
  <template v-if="sortedValues?.length">
    <slot name="autolist-label"></slot>

    <!-- wrapper-div enabled: wrap it all inside a div -->
    <div v-if="props.wrapperDiv" :class="props.wrapperClass">
      <template v-for="[value, count] in sortedValues" :key="value">
        <slot name="input" :value="value" :count="count">
          <FiltersCheckbox
            :filter="props.filter" :criteria="props.criteria" :group="props.group" :value="value?.toString()"
            :class="props.class" :input-class="props.inputClass" :label-class="props.labelClass" :operator="props.operator"
          >
            <template #label="scope">
              <slot name="label" :value="value" :count="count">{{ value }} ({{ count }})</slot>
            </template>
          </FiltersCheckbox>
        </slot>
      </template>
    </div>

    <!-- default behavior: raw checkboxes without wrapper -->
    <template v-else>
      <template v-for="[value, count] in sortedValues" :key="value">
        <slot name="input" :value="value" :count="count">
          <FiltersCheckbox
            :filter="props.filter" :criteria="props.criteria" :group="props.group" :value="value?.toString()"
            :class="props.class" :input-class="props.inputClass" :label-class="props.labelClass" :operator="props.operator"
          >
            <template #label="scope">
              <slot name="label" :value="value" :count="count">{{ value }} ({{ count }})
              </slot>
            </template>
            <template #checkbox="scope">
              <slot name="checkbox" :info="{id: scope.info.id, type: scope.info.type }" :get="scope.get" :set="scope.set" />
            </template>
          </FiltersCheckbox>
        </slot>
      </template>
    </template>

  </template>
</template>
