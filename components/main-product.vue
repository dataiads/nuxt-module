<script setup lang="ts">
withDefaults(defineProps<{ light: boolean }>(), { light: false });
</script>
<template>
  <main v-if="light" id="main-product">
    <slot name="main-product">
      <slot name="main-product-header"></slot>

      <slot name="main-product-aside"></slot>

      <div>
        <slot name="main-product-image"></slot>
      </div>
      <div>
        <slot name="main-product-description"></slot>
      </div>

      <slot name="main-product-footer"></slot>
    </slot>
  </main>
  <main v-else>
    <slot name="main-product-light">
      <slot name="main-product-light-header"></slot>

      <slot name="main-product-light-aside"></slot>

      <div>
        <slot name="main-product-light-image"></slot>
      </div>
      <div>
        <slot name="main-product-light-description"></slot>
      </div>

      <slot name="main-product-light-footer"></slot>
    </slot>
  </main>
</template>
