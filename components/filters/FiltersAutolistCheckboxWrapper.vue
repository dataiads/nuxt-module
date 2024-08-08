<script setup lang="ts">
import { useFilters } from '@/composables/useFilters'
defineProps<{class: string}>()
const filter = useCustomLayout().filter
const layoutConfig = useLpoConfig().customLayout
const { config } = useFilters()

const moreElementsThanLimit = (criteria: string, limit: number) => {
  const { data: availableValues } = filter.fetchCriteriaValues(criteria)
      
  if (availableValues.value == null) {
    return false
  }
    
  const keys = Object.keys(availableValues.value)
    
  if (keys.length > limit) {
    return true
  }
}

const displayMore = ref(false)
</script>

<template>
  <FiltersAutolistCheckbox
    :key="`checkbox-${$attrs}`"
    :filter="filter"
    v-bind="$attrs"
    :class="$props.class"
    :display-more="displayMore"
    :wrapper-div="$attrs.searchable"
    :wrapper-style="$attrs.style"
  >
    <template #checkbox="{ get, set, info }">
      <input
        v-bind="info"
        type="checkbox"
        :checked="get()"
        :style="get() ? [config.filterParamsCheckboxStyle, config.filterParamsActiveCheckboxStyle] : [config.filterParamsCheckboxStyle]"
        class="appearance-none focus:ring-0"
        @change="set(($event.target as HTMLInputElement)?.checked)"
      >
    </template>
  </FiltersAutolistCheckbox>
  <button v-if="$attrs.seeMore && moreElementsThanLimit($attrs.criteria, $attrs.limit)" class="filters-btn-see-more" @click="displayMore = !displayMore">
    {{ displayMore ? $attrs.seeLessText : $attrs.seeMoreText }}
  </button>
</template>


<style lang="scss">
.filters-checkbox {
  @apply flex items-center gap-3;
  & label {
    @apply text-sm;
  }
}
.filters-btn-see-more {
  @apply flex p-0 justify-start;
}

</style>