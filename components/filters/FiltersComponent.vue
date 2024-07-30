<script setup lang="ts">
const props = defineProps<{
  element: any
}>()

const filter = useCustomLayout().filter
</script>

<template>
  <div>
    <FiltersAutolistCheckbox
      v-if="element.component === 'autolist-checkbox'"
      :key="`checkbox-${props}`"
      :filter="filter"
      v-bind="element.props"
      class="filters-checkbox"
    />
  </div>
</template>


<style lang="scss">
.filters-checkbox {
  @apply flex items-center gap-3
}

</style>