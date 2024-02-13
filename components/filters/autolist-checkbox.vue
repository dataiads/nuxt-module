<script setup lang="ts">
import localeIncludes from '~/utils/local-includes'

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

  // optionnal input to filter values
  searchable?: boolean
  searchPlaceholder?: string

  // optionnal filter function for value items
  valuesFilter?: RegExp | ((value: string) => boolean) | string

  // filter-checkbox properties are passed to child components
  class?: string
  inputClass?: string
  labelClass?: string
  searchInputClass?: string
  operator?: string
  limit?: number
  useTranslation?: boolean
  displayCount?: boolean
}>(), {
  operator: 'EQUAL',
  wrapperDiv: false,
  useTranslation: false,
  displayCount: true,
  searchable: false,
  searchPlaceholder: 'Search...'
})

const search = ref('')
const { data: availableValues } = props.filter.fetchCriteriaValues(props.criteria)

const sortedValues = computed(() => {
  if (availableValues.value == null) {
    return null
  }

  let keys = Object.keys(availableValues.value)

  if (props.searchable) {
    try {
      keys = keys.filter(v => localeIncludes(v.toLowerCase(), search.value.toLowerCase()))
    } catch { /* empty */ }
  } else if (props.valuesFilter) {
    if (props.valuesFilter && props.valuesFilter instanceof RegExp) {
      keys = keys.filter(v => !!(props.valuesFilter as RegExp).exec(v))
    } else if (props.valuesFilter instanceof Function) {
      keys = keys.filter(props.valuesFilter)
    } else if (typeof props.valuesFilter === "string") {
      try {
        const reg = new RegExp(props.valuesFilter)
        keys = keys.filter(v => !!reg.exec(v))
      } catch { /* empty */ }
    }
  }

  if (props.limit) {
    keys = keys.slice(0, props.limit)
  }

  if (props.sort) {
    keys = props.sort(keys)
  }

  return keys.map(k => [k, availableValues.value ? availableValues.value[k] : null])
})

</script>

<template>
  <template v-if="sortedValues">
    <slot name="autolist-label" />

    <slot v-if="searchable" name="autolist-search-input">
      <input v-model="search" type="search" :placeholder="searchPlaceholder" class="sticky top-0 mr-1"
        :class="searchInputClass">
    </slot>

    <!-- wrapper-div enabled: wrap it all inside a div -->
    <div v-if="props.wrapperDiv" :class="props.wrapperClass">
      <template v-for="[value, count] in sortedValues" :key="value">
        <slot name="input" :value="useTranslation ? $t(value?.toString() || '') : value"
          :count="displayCount ? count : null">
          <FiltersCheckbox :filter="props.filter" :criteria="props.criteria" :group="props.group"
            :value="value?.toString()" :class="props.class" :input-class="props.inputClass"
            :label-class="props.labelClass" :operator="props.operator">
            <template #label="scope">
              <slot name="label" :value="useTranslation ? $t(value?.toString() || '') : value"
                :count="displayCount ? count : null">
                {{ useTranslation ? $t(value?.toString() || '') : value }}
                <template v-if="displayCount">
                  ({{ count }})
                </template>
              </slot>
            </template>
          </FiltersCheckbox>
        </slot>
      </template>
    </div>

    <!-- default behavior: raw checkboxes without wrapper -->
    <template v-else>
      <template v-for="[value, count] in sortedValues" :key="value">
        <slot name="input" :value="useTranslation ? $t(value?.toString() || '') : value"
          :count="displayCount ? count : null">
          <FiltersCheckbox :filter="props.filter" :criteria="props.criteria" :group="props.group"
            :value="useTranslation ? $t(value?.toString() || '') : value?.toString()" :class="props.class"
            :input-class="props.inputClass" :label-class="props.labelClass" :operator="props.operator">
            <template #label="scope">
              <slot name="label" :value="useTranslation ? $t(value?.toString() || '') : value"
                :count="displayCount ? count : null" :checked="scope.checked">
                {{ useTranslation ? $t(value?.toString() || '') : value }}
                <template v-if="displayCount">
                  ({{ count }})
                </template>
              </slot>
            </template>
            <template #checkbox="scope">
              <slot name="checkbox" :info="{ id: scope.info.id, type: scope.info.type }" :get="scope.get"
                :set="scope.set" />
            </template>
          </FiltersCheckbox>
        </slot>
      </template>
    </template>
  </template>
</template>
