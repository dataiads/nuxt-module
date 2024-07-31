<script setup lang="ts">
import { useFilters } from '@/composables/useFilters'

const { config } = useFilters()
</script>

<template>
  <FiltersCheckbox :input-style="config.filterParamsCheckboxStyle" />
</template>