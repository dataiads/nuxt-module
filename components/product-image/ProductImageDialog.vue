<script setup lang="ts">
import { cn } from '~/lib/utils'
const props = defineProps<{
  class?: string
}>()
const { dialog, index } = useProductImage()
</script>

<template>
  <Dialog v-model:open="dialog">
    <DialogContent :class="cn('lg:py-12 px-0 h-screen w-full max-w-screen', props.class)">
      <div class="flex justify-center mx-auto">
        <ProductImageMain>
          <template #main-image="{ src }">
            <img :src="src" class="w-full max-h-screen object-contain">
          </template>
          <ProductImageActions />
        </ProductImageMain>
      </div>
    </DialogContent>
  </Dialog>
</template>