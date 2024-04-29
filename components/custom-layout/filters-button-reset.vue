<script setup lang="ts">
import type { MainRecoParams } from '~/types'
defineProps<{config: MainRecoParams}>()

const customLayout = useCustomLayout()

</script>

<template>
  <button
    v-if="config.filterParamsButtonEraseEnable && (customLayout?.filter?.activeFiltersCount?.value ?? 0) > 0 "
    :style="config.filterParamsButtonEraseStyle"
    @click="customLayout?.filter.reset()"
  >
    {{ config.filterParamsButtonEraseText }}
  </button>
</template>