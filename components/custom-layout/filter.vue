<script setup lang="ts">
const props = defineProps<{
  filterKey: string
  context: CustomLayoutContext
}>();

const config = useRuntimeConfig();
const s = config.public.layoutStyle;

const filter = props.context.recommenders?.[props.filterKey];
if (!filter) {
  throw new Error("Filter not found");
}

let { data: filterProducts } = filter.results;
</script>

<template>
    <div :id="`filters-${filterKey}`" :class="s.filters.class">
        <div :id="`filters-content-${filterKey}`" :class="s.filters.contentClass">
            <div :class="s.filters.contentGridClass">
                <slot
                    v-if="filterProducts?.length"
                    name="filters-content-grid-item"
                    v-for="(item, index) in filterProducts"
                    :key="item.id ? item.id : JSON.stringify(item)"
                    :item="item"
                    :index="index"
                ></slot>
                <slot v-else name="filters-no-results"></slot>
            </div>
            <div :id="`filters-pagination-${filterKey}`" :class="s.filters.paginationClass">
                <slot name="filters-pagination"></slot>
            </div>
        </div>
    </div>
</template>