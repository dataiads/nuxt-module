<script setup lang="ts">

</script>

<template>
  <div>
    <ProductImage :product="product">
      <template #aside-image="{ src, alt }">
        <img :src="src" :alt="alt">
      </template>
    </ProductImage>
  </div>
</template>

<style scoped>

</style>
