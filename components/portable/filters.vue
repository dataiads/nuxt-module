<script setup lang="ts">
const config = useRuntimeConfig();
const s = config.public.layoutStyle;

const props = defineProps<{
    filter: Recommender
}>()
let { data: filterProducts } = props.filter.results;

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>(
  "responsiveAsideItemSingleton",
  () => null
);
</script>

<template>
    <div id="filters" :class="s.filters.class" >
        <div
            id="filters-aside"
            :class="[
                ...s.filters.asideClass,
                mobileFilterOpen != null ? 'overflow-x-hidden' : 'overflow-x-scroll',
            ]"
        >
            <slot name="filters-aside"></slot>
        </div>
        <div id="filters-content" :class="s.filters.contentClass">
            <div id="filters-content-header" :class="s.filters.contentHeaderClass">
                <slot name="filters-content-header"></slot>
            </div>
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
            <div id="filters-pagination" :class="s.filters.paginationClass">
                <slot name="filters-pagination"></slot>
            </div>
        </div>
    </div>
</template>