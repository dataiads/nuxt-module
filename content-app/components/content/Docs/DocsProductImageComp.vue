<script setup lang="ts">
const product = useProduct()
</script>

<template>
  <ProductImageWrapper :product="product">
    <div class="flex gap-4">
      <ProductImageThumbnails />
      <ProductImageMain class="max-w-[400px]">
        <ProductImageActions />
      </ProductImageMain>
    </div>
  </productimagewrapper>
</template>