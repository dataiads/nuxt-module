<script setup lang="ts">
import { Monitor, Tablet, Smartphone } from 'lucide-vue-next'

import { ToggleGroup, ToggleGroupItem } from '@/components/custom/toggle-group'
const value = defineModel('modelValue', { type: String, default: '100' })
</script>

<template>
  <div class="hidden h-[28px] items-center gap-1.5 rounded-md border p-[2px] shadow-sm md:flex">
    <ToggleGroup v-model="value" type="single">
      <ToggleGroupItem value="100" aria-label="Toggle mobile" class="h-[22px] w-[22px] rounded-sm p-0">
        <Monitor class="h-3.5 w-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="60" aria-label="Toggle tablet" class="h-[22px] w-[22px] rounded-sm p-0">
        <Tablet class="h-3.5 w-3.5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="30" aria-label="Toggle desktop" class="h-[22px] w-[22px] rounded-sm p-0">
        <Smartphone class="h-3.5 w-3.5" />
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>