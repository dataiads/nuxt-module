<script setup lang="ts">

type Color = {
  name?: string;
  value: string;
}[];

const selectedColor = ref<string | null>(null);

const localColors = ref([
  { name: 'Red', value: '#0077B6' },
  { name: 'Green', value: '#0096C7' },
  { name: 'Blue', value: '#90E0EF' },
  { name: 'Yellow', value: '#CAF0F8' }
]);

</script>

<template>
    <ToggleGroup v-model="selectedColor" type="single">
      <ToggleGroupItem
        v-for="color in localColors"
        :key="color.name"
        :value="color.value"
        class="toggle-item h-[20px] w-[20px] rounded-full cursor-pointer p-2"
        :style="{ backgroundColor: color.value, border: selectedColor === color.value ? '2px solid #71797E' : 'none' }"
      >
      </ToggleGroupItem>
    </ToggleGroup>
  </template>

<style lang="scss">

.toggle-item:not(:last-child) {
  margin-right: 10px;
}

</style>