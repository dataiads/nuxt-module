<script setup lang="ts">
import { useFilters } from '~/composables/useFilters'
const { config } = useFilters()
</script>

<template>
  <div v-if="config.filtersTitle" :style="config.filtersTitleStyle">
    {{ config.filtersTitle }}
  </div>
</template>
