<script setup lang="ts">
import type { MainRecoParams } from '~/types'

import { useProvideFilters } from '@/composables/useFilters'

const props = defineProps<{
  config: MainRecoParams;
}>()

const config = computed(() => props.config)
const filterArgs = useProvideFilters({ config })
</script>

<template>
  <div>
    <slot v-bind="filterArgs" />
  </div>
</template>
