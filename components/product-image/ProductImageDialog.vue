<script setup lang="ts">
import SheetContent from '../ui/sheet/SheetContent.vue'
const { dialog, index } = useProductImage()
</script>

<template>
  <Sheet v-model:open="dialog">
    <SheetContent side="full">
      <ProductImageMain>
        <template #main-image="{ src }">
          <img :src="src" class="w-full max-h-screen object-contain">
        </template>
        <slot />
        <ProductImageActions />
      </ProductImageMain>
    </SheetContent>
  </Sheet>
</template>