<script setup lang="ts">
defineProps(layoutProps);

const lpoConfig = useLpoConfig();
const baseLayout = lpoConfig.customLayout;
if (!baseLayout) {
  console.error("No custom layout defined");
}
</script>

<template>
  
  <PortableLayout :element="baseLayout" :filter="filter">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}"></slot>
    </template>
  </PortableLayout>

  <StickyFooter>
    <slot name="sticky-add-to-cart"></slot>
  </StickyFooter>

  <slot id="filters-drawer" name="filters-drawer"></slot>

  <slot id="menus-drawer" name="menus-drawer"></slot>
</template>
