<script setup lang="ts">
const config = useRuntimeConfig();
const lpoConfig = useLpoConfig();
const product = useProduct();

const s = config.public.layoutStyle;

const rootLayout = lpoConfig.customLayout;
const filterParams = rootLayout?.params.mainRecoParams;

const filterOptions: UseRecommenderOptions = {
  productId: product.value.id,
  endpoint: "filtered",
  baseRules: filterParams?.filterRules
}

if (!filterOptions.fetchQuery) {
  filterOptions.fetchQuery = {};
}

if (filterParams?.limit) {
  filterOptions.defaultLimit = filterParams.limit;
}

if (filterParams?.sort) {
  filterOptions.defaultSort = filterParams.sort;
}

if (filterParams?.deduplicate) {
  filterOptions.fetchQuery.deduplicate = filterParams.deduplicate;
}

if (filterParams?.sortRules) {
  filterOptions.fetchQuery.sortFilters = JSON.stringify(filterParams.sortRules);
}

// Setting a global filter state so it can be initiated here for the setttings but acessed elsewhere.
const filter = useState('filter', () => useRecommender(filterOptions));
let { data: filterProducts } = filter.value.results;

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