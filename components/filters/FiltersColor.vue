<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
const props = defineProps<{
  class?: string,
}>()

const filter = useCustomLayout().filter
const layoutConfig = useLpoConfig().customLayout
const colors = computed(() => layoutConfig.global.colors)
</script>

<template>
  <div :class="$props.class">
    <FiltersCustomCheckbox
      v-for="({ name: key, value }) of colors"
      :key="'color_' + key"
      :filter="filter"
      criteria="color"
      operator="CONTAINS_CI"
      :group="$attrs.group"
      :value="key"
    >
      <template #customCheckbox="{ set, get }">
        <button class="flex flex-col items-center" @click="set(key)">
          <div
            class="filters-color h-[20px] w-[20px] rounded-full"
            :class="{ 'border border-black': value === 'white', 'filters-color-selected': get() }"
            :style="{ backgroundColor: value }"
          />
          <span class="mt-1 text-sm">
            {{ key }}
          </span>
        </button>
      </template>
    </FiltersCustomCheckbox>
  </div>
</template>

<style lang="scss">
.filters-color-container {
  @apply flex flex-wrap gap-4;
}
</style>