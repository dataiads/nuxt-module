<script setup lang="ts">
import { Copy, Check } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    code?: string;
  }>(),
  {
    code: ''
  }
)
const { code } = toRefs(props)

const { copy, copied } = useClipboard({ source: code })
</script>

<template>
  <Button variant="outline" size="xs" class="w-7" @click="copy()">
    <Check v-if="copied" :size="12" />
    <Copy v-else :size="12" />
  </Button>
</template>
