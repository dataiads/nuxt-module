<script setup lang="ts">
defineProps(layoutProps);

const lpoConfig = useLpoConfig();
const product = useProduct();
const rootLayout = lpoConfig.customLayout;
if (!rootLayout) {
  console.error("No custom layout defined");
}
const context: CustomLayoutContext = {}

const filters: Record<string, Recommender> = {}
if (rootLayout?.recommenderParams) {
  for (const [filterKey, filterParams] of Object.entries(rootLayout.recommenderParams)) {
    const filterOptions: UseRecommenderOptions = {
      productId: product.value.id,
      endpoint: filterParams.endpoint ?? 'filtered',
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

    filters[filterKey] = useRecommender(filterOptions);
  }
  context.recommenders = filters;
}

</script>

<template>
  <CustomLayoutNode v-for="child in rootLayout?.root" :element="child" :context="context">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}"></slot>
    </template>
  </CustomLayoutNode>
</template>
