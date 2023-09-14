<script setup lang="ts">
defineProps(layoutProps);

const lpoConfig = useLpoConfig();
const rootLayout = lpoConfig.customLayout;
if (!rootLayout) {
  console.error("No custom layout defined");
}
</script>

<template>
  <PortableLayout :element="(rootLayout as LayoutElement)">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}"></slot>
    </template>
  </PortableLayout>
</template>
