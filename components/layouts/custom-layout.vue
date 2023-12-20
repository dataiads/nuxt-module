<script setup lang="ts">
const product = useProduct();

const layoutConfig = useLpoConfig().customLayout;

const overlayContent = ref(null);

const filter = useState("filter", () =>
  useStructuredRecommender({
    productId: product.value.id,
    baseRules: layoutConfig.mainReco.filterRules,
    sortRules: layoutConfig.mainReco.sortRules,
    deduplicate: layoutConfig.mainReco.deduplicate,
    defaultLimit: layoutConfig.mainReco.limit,
    defaultSort: layoutConfig.mainReco.sort,
  })
);

// scroll top of the filters when returning less results
onMounted(() => {
  watch(filter.value.results.data, (newData, oldData) => {
    if (
      layoutConfig.mainReco.highFilters &&
      oldData &&
      newData.length < oldData.length
    ) {
      document.querySelector("#filters")?.scrollIntoView();
    }
  });
});
</script>

<template>
  <div class="lg:mx-auto">
    <!-- preHeader -->
    <CustomLayoutInserts :config="layoutConfig.preHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </CustomLayoutInserts>

    <header id="header">
      <slot name="header" />
    </header>

    <!-- postHeader -->
    <CustomLayoutInserts :config="layoutConfig.postHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </CustomLayoutInserts>

    <!-- high filters mode -->
    <template
      v-if="
        layoutConfig.mainReco.showFilters && layoutConfig.mainReco.highFilters
      "
    >
      <div id="filters-header">
        <slot name="filters-header"></slot>
      </div>

      <div class="flex flex-row">
        <div id="filters-aside" class="shrink-0">
          <slot name="filters-aside" />
        </div>

        <div>
          <!-- preMainProduct -->
          <CustomLayoutInserts :config="layoutConfig.preMainProduct">
            <template v-for="(_, name) in $slots" #[name]="scope">
              <slot :name="name" v-bind="scope"></slot>
            </template>
          </CustomLayoutInserts>

          <!-- main product -->
          <MainProduct :light="layoutConfig.mainProduct.light">
            <template v-for="(_, name) in $slots" #[name]="scope">
              <slot :name="name" v-bind="scope"></slot>
            </template>
          </MainProduct>

          <!-- postMainProduct -->
          <CustomLayoutInserts :config="layoutConfig.postMainProduct">
            <template v-for="(_, name) in $slots" #[name]="scope">
              <slot :name="name" v-bind="scope"></slot>
            </template>
          </CustomLayoutInserts>

          <!-- main reco -->
          <div id="filters">
            <div id="filters-content">
              <div id="filters-content-header">
                <slot name="filters-content-header"></slot>
              </div>

              <div
                class="grid grid-cols-[var(--catalog-grid-cols)] md:grid-cols-[var(--md-catalog-grid-cols)] lg:grid-cols-[var(--lg-catalog-grid-cols)] xl:grid-cols-[var(--xl-catalog-grid-cols)] 2xl:grid-cols-[var(--2xl-catalog-grid-cols)] 3xl:grid-cols-[var(--3xl-catalog-grid-cols)] gap-[var(--catalog-grid-gap)] md:gap-[var(--md-catalog-grid-gap)] lg:gap-[var(--lg-catalog-grid-gap)] xl:gap-[var(--xl-catalog-grid-gap)] 2xl:gap-[var(--2xl-catalog-grid-gap)] 3xl:gap-[var(--3xl-catalog-grid-gap)]"
              >
                <slot
                  v-if="filter.results?.data?.length"
                  name="filters-content-grid-item"
                  v-for="(item, index) in filter.results.data"
                  :key="item.id ? item.id : JSON.stringify(item)"
                  :item="item"
                  :index="index"
                ></slot>
                <slot v-else name="filters-no-results"></slot>
              </div>

              <div id="filters-pagination">
                <slot name="filters-pagination"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <!-- preMainProduct -->
      <CustomLayoutInserts :config="layoutConfig.preMainProduct">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </CustomLayoutInserts>

      <!-- main product -->
      <MainProduct :light="layoutConfig.mainProduct.light">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </MainProduct>

      <!-- postMainProduct -->
      <CustomLayoutInserts :config="layoutConfig.postMainProduct">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </CustomLayoutInserts>

      <div id="filters-header">
        <slot name="filters-header"></slot>
      </div>

      <div id="filters">
        <template v-if="layoutConfig.mainReco.showFilters">
          <div id="filters-aside" class="shrink-0">
            <slot name="filters-aside"></slot>
          </div>
        </template>

        <div id="filters-content">
          <div id="filters-content-header">
            <slot name="filters-content-header"></slot>
          </div>
          <div
            class="grid grid-cols-[var(--catalog-grid-cols)] md:grid-cols-[var(--md-catalog-grid-cols)] lg:grid-cols-[var(--lg-catalog-grid-cols)] xl:grid-cols-[var(--xl-catalog-grid-cols)] 2xl:grid-cols-[var(--2xl-catalog-grid-cols)] 3xl:grid-cols-[var(--3xl-catalog-grid-cols)] gap-[var(--catalog-grid-gap)] md:gap-[var(--md-catalog-grid-gap)] lg:gap-[var(--lg-catalog-grid-gap)] xl:gap-[var(--xl-catalog-grid-gap)] 2xl:gap-[var(--2xl-catalog-grid-gap)] 3xl:gap-[var(--3xl-catalog-grid-gap)]"
          >
            <slot
              v-if="filter.results?.data?.length"
              name="filters-content-grid-item"
              v-for="(item, index) in filter.results.data"
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

    <!-- postMainReco -->
    <CustomLayoutInserts :config="layoutConfig.postMainReco">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </CustomLayoutInserts>

    <CustomLayoutOverlay v-if="layoutConfig.overlay">
      <template #overlay-content>
        <CustomLayoutInserts :config="layoutConfig.overlay">
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
          </template>
        </CustomLayoutInserts>
      </template>
    </CustomLayoutOverlay>

    <footer id="footer">
      <slot name="footer" />
    </footer>

    <StickyFooter v-if="layoutConfig.stickyAtc.enable">
      <slot name="sticky-add-to-cart" />
    </StickyFooter>
  </div>
</template>

<style lang="scss">
#filters {
  @apply flex;
}
</style>
