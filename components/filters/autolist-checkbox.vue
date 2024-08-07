<script setup lang="ts">
import type { StructuredRecommender } from '~/types'
import localeIncludes from '~/utils/local-includes'

const props = withDefaults(defineProps<{
  // filter values listing settings
  filter: StructuredRecommender
  criteria: string
  group: string

  // wrap list items in a global element
  wrapperDiv?: boolean

  // customize wrapper element
  wrapperClass?: string

  wrapperStyle?: Array<string>

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
  displayMore?: boolean
  singleChoice: boolean
}>(), {
  operator: 'EQUAL',
  wrapperDiv: false,
  useTranslation: false,
  displayCount: true,
  searchable: false,
  searchPlaceholder: 'Search...',
  displayMore: false,
  singleChoice: false
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
    } else if (typeof props.valuesFilter === 'string') {
      try {
        const reg = new RegExp(props.valuesFilter)
        keys = keys.filter(v => !!reg.exec(v))
      } catch { /* empty */ }
    }
  }

  if (props.limit && !props.displayMore) {
    keys = keys.slice(0, props.limit)
  }

  if (props.sort) {
    keys = props.sort(keys)
  }

  // Remove duplicate
  keys = [...new Set(keys)].filter((value, index, self) => 
    index === self.findIndex((v) => v.toLowerCase() === value.toLowerCase())
  )

  return keys.map(k => [k, availableValues.value ? availableValues.value[k] : null])
})
</script>

<template>
  <slot v-if="sortedValues && sortedValues.length" name="autolist-label" />
  <slot v-if="searchable" name="autolist-search-input">
    <input
      v-model="search"
      type="search"
      :placeholder="searchPlaceholder"
      class="sticky top-0 w-full mb-2"
      :class="searchInputClass"
    >
  </slot>

  <!-- wrapper-div enabled: wrap it all inside a div -->
  <div v-if="props.wrapperDiv && sortedValues && sortedValues.length" :class="props.wrapperClass" :style="props.wrapperStyle">
    <template v-for="[value, count] in sortedValues" :key="value">
      <slot
        v-if="value"
        name="input"
        :value="useTranslation ? $t(value?.toString() || '') : value"
        :count="displayCount ? count : null"
      >
        <FiltersCheckbox
          :filter="props.filter"
          :criteria="props.criteria"
          :group="props.group"
          :value="useTranslation ? $t(value?.toString() || '') : value?.toString()"
          :class="props.class"
          :input-class="props.inputClass"
          :label-class="props.labelClass"
          :operator="props.operator"
          :single-choice="props.singleChoice"
        >
          <template #label="scope">
            <slot
              name="label"
              :value="useTranslation ? $t(value?.toString() || '') : value"
              :count="displayCount ? count : null"
              :checked="scope.checked"
            >
              {{ useTranslation ? $t(value?.toString() || '') : value }}
              <template v-if="displayCount">
                ({{ count }})
              </template>
            </slot>
          </template>
          <template #checkbox="scope">
            <slot
              name="checkbox"
              :info="{ id: scope.info.id, type: scope.info.type }"
              :get="scope.get"
              :set="scope.set"
            />
          </template>
        </FiltersCheckbox>
      </slot>
    </template>
  </div>

  <!-- default behavior: raw checkboxes without wrapper -->
  <template v-else-if="sortedValues && sortedValues.length">
    <template v-for="[value, count] in sortedValues" :key="value">
      <slot
        v-if="value"
        name="input"
        :value="useTranslation ? $t(value?.toString() || '') : value"
        :count="displayCount ? count : null"
      >
        <FiltersCheckbox
          :filter="props.filter"
          :criteria="props.criteria"
          :group="props.group"
          :value="useTranslation ? $t(value?.toString() || '') : value?.toString()"
          :class="props.class"
          :input-class="props.inputClass"
          :label-class="props.labelClass"
          :operator="props.operator"
          :single-choice="props.singleChoice"
        >
          <template #label="scope">
            <slot
              name="label"
              :value="useTranslation ? $t(value?.toString() || '') : value"
              :count="displayCount ? count : null"
              :checked="scope.checked"
            >
              {{ useTranslation ? $t(value?.toString() || '') : value }}
              <template v-if="displayCount">
                ({{ count }})
              </template>
            </slot>
          </template>
          <template #checkbox="scope">
            <slot
              name="checkbox"
              :info="{ id: scope.info.id, type: scope.info.type }"
              :get="scope.get"
              :set="scope.set"
            />
          </template>
        </FiltersCheckbox>
      </slot>
    </template>
  </template>
</template>
