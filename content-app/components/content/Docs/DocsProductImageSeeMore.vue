<script setup lang="ts">
const product = useProduct()
const config = useLpoConfig().customLayout.mainProduct
config.seeMoreEnable = true
config.seeMoreTitle = 'Plus de produits similaires'
config.seeMoreBtnVariant = 'outline'
config.seeMoreBtnTitle = 'Voir la sélection'
</script>

<template>
  <ProductImageWrapper :product="product">
    <div class="flex gap-4">
      <ProductImageThumbnails />
      <ProductImageMain
        class="max-w-[400px]"
      >
        <ProductImageActions />
      </ProductImageMain>
    </div>
    <ProductImageDialog />
  </ProductImageWrapper>
</template>