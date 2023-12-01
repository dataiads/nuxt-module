<script setup lang="ts">
const props = withDefaults(
  defineProps<{ products: Product[]; highFilters: boolean }>(),
  {
    highFilters: false,
  }
);

const teleportLocation = computed(() => {
  if (!props.highFilters) return "#filters";
  else return "#filters-high";
});
</script>
<template>
  <div id="filters-high" v-if="highFilters">
    <div
      id="filters-aside"
      :class="[
        mobileFilterOpen != null ? 'overflow-x-hidden' : 'overflow-x-scroll',
      ]"
    >
      <slot name="filters-aside"></slot>
    </div>
    <div>
      <slot />
      <div id="filters">
        <div id="filters-content">
          <div id="filters-content-header">
            <slot name="filters-content-header"></slot>
          </div>
          <div id="filters-content-grid">
            <slot
              v-if="products?.length"
              name="filters-content-grid-item"
              v-for="(item, index) in products"
              :key="item.id ? item.id : JSON.stringify(item)"
              :item="item"
              :index="index"
            />
            <slot v-else name="filters-no-results"></slot>
          </div>
          <div id="filters-pagination">
            <slot name="filters-pagination"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template v-else>
    <slot />
    <div id="filters">
      <div
        id="filters-aside"
        :class="[
          mobileFilterOpen != null ? 'overflow-x-hidden' : 'overflow-x-scroll',
        ]"
      >
        <slot name="filters-aside"></slot>
      </div>
      <div id="filters-content">
        <div id="filters-content-header">
          <slot name="filters-content-header"></slot>
        </div>
        <div id="filters-content-grid">
          <slot
            v-if="products?.length"
            name="filters-content-grid-item"
            v-for="(item, index) in products"
            :key="item.id ? item.id : JSON.stringify(item)"
            :item="item"
            :index="index"
          />
          <slot v-else name="filters-no-results"></slot>
        </div>
        <div id="filters-pagination">
          <slot name="filters-pagination"></slot>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
#filters-high {
  @apply flex flex-col md:flex-row;
}

#filters-aside {
  @apply grow shrink-0;
}
</style>
