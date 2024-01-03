<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { useCustomLayout } from '~/composables/custom-layout'

const product = useProduct()
const customLayout = useCustomLayout()

const layoutConfig = useLpoConfig().customLayout

// init main recommmender
const filter = customLayout.filter
filter.value = useStructuredRecommender({
  productId: product.value.id,
  baseRules: layoutConfig.mainReco.algo.filterRules,
  sortRules: layoutConfig.mainReco.algo.sortRules,
  deduplicate: layoutConfig.mainReco.algo.deduplicate,
  defaultLimit: layoutConfig.mainReco.algo.limit,
  defaultSort: layoutConfig.mainReco.algo.sort,
  criteriaValues: layoutConfig.mainReco.filterParams.reduce(
    (acc, item) => {
      for (const el of item.elements) {
        if (
          el.component === 'autolist-checkbox' &&
          el.props.criteria &&
          acc.indexOf(el.props.criteria) < 0
        ) {
          acc.push(el.props.criteria)
        }
      }
      return acc
    },
    [] as string[]
  )
})

// init filters slideover
const showFiltersSlideover = customLayout.showFiltersSlideover

// scroll top of the filters when returning less results
onMounted(() => {
  watch(filter.value.results.data, (newData, oldData) => {
    if (
      oldData &&
      newData.length < oldData.length
    ) {
      document.querySelector('#filters')?.scrollIntoView()
    }
  })
})

// global stylesheet from config
if (layoutConfig?.global?.stylesheet) {
  useHead({
    style: [{ children: layoutConfig.global.stylesheet }]
  })
}
</script>

<template>
  <div class="flex flex-col w-full justify-center max-w-[100vw]">
    <!-- preHeader -->
    <CustomLayoutInserts :config="layoutConfig.preHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutInserts>

    <!-- Header -->
    <CustomLayoutHeader :config="layoutConfig.header">
      <template #header>
        <slot name="header" />
      </template>
    </CustomLayoutHeader>

    <!-- postHeader -->
    <CustomLayoutInserts :config="layoutConfig.postHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutInserts>

    <!-- high filters mode -->
    <div
      v-if="layoutConfig.mainReco.filtersDisplay === 'left-high' ||
        layoutConfig.mainReco.filtersDisplay === 'right-high'
      "
      class="flex"
    >
      <div
        v-if="layoutConfig.mainReco.filtersDisplay === 'left-high'"
        id="filters-aside"
        class="flex-none"
        :style="layoutConfig.mainReco.filterStyle"
      >
        <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
          {{ layoutConfig.mainReco.filtersTitle }}
        </div>

        <slot name="filters-aside" :filter="customLayout.filter">
          <FiltersContainer :filter-params="layoutConfig.mainReco.filterParams" :filter="filter" :open="true" />
        </slot>
      </div>

      <div class="flex flex-col grow shrink min-w-0">
        <!-- preMainProduct -->
        <CustomLayoutInserts :config="layoutConfig.preMainProduct">
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </CustomLayoutInserts>

        <!-- main product -->
        <main v-if="layoutConfig.mainProduct.light" id="main-product">
          <slot name="main-product-light" />
        </main>
        <main v-else id="main-product">
          <slot name="main-product" />
        </main>

        <!-- postMainProduct -->
        <CustomLayoutInserts :config="layoutConfig.postMainProduct">
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </CustomLayoutInserts>

        <!-- main reco -->
        <div id="filters">
          <div id="filters-content">
            <div id="filters-content-header">
              <slot name="filters-content-header" />
            </div>

            <div v-if="filter.results?.data?.length" :style="layoutConfig.mainReco.gridStyle">
              <slot
                v-for="(item, index) in filter.results.data"
                :key="item.id ? item.id : JSON.stringify(item)"
                name="filters-content-grid-item"
                :item="item"
                :index="index"
              />
            </div>
            <slot v-else name="filters-no-results" />

            <div id="filters-pagination">
              <slot name="filters-pagination" />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="layoutConfig.mainReco.filtersDisplay === 'right-high'"
        id="filters-aside"
        class="shrink-0"
        :style="layoutConfig.mainReco.filterStyle"
      >
        <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
          {{ layoutConfig.mainReco.filtersTitle }}
        </div>
        <slot name="filters-aside" :filter="filter">
          <FiltersContainer :filter-params="layoutConfig.mainReco.filterParams" :filter="filter" :open="true" />
        </slot>
      </div>
    </div>

    <template v-else>
      <!-- preMainProduct -->
      <CustomLayoutInserts :config="layoutConfig.preMainProduct">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </CustomLayoutInserts>

      <!-- main product -->
      <main v-if="layoutConfig.mainProduct.light" id="main-product">
        <slot name="main-product-light" />
      </main>
      <main v-else id="main-product">
        <slot name="main-product" />
      </main>

      <!-- postMainProduct -->
      <CustomLayoutInserts :config="layoutConfig.postMainProduct">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </CustomLayoutInserts>

      <div id="filters" class="flex flex-row">
        <div
          v-if="layoutConfig.mainReco.filtersDisplay === 'left'"
          id="filters-aside"
          class="shrink-0"
          :style="layoutConfig.mainReco.filterStyle"
        >
          <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
            {{ layoutConfig.mainReco.filtersTitle }}
          </div>
          <slot name="filters-aside" :filter="filter">
            <FiltersContainer :filter-params="layoutConfig.mainReco.filterParams" :filter="filter" :open="true" />
          </slot>
        </div>

        <div id="filters-content" class="grow">
          <div id="filters-content-header">
            <slot name="filters-content-header" />
          </div>
          <div v-if="filter.results?.data?.length" :style="layoutConfig.mainReco.gridStyle">
            <slot
              v-for="(item, index) in filter.results.data"
              :key="item.id ? item.id : JSON.stringify(item)"
              name="filters-content-grid-item"
              :item="item"
              :index="index"
            />
          </div>
          <slot v-else name="filters-no-results" />

          <div id="filters-pagination">
            <slot name="filters-pagination" />
          </div>
        </div>

        <div
          v-if="layoutConfig.mainReco.filtersDisplay === 'right'"
          id="filters-aside"
          class="shrink-0"
          :style="layoutConfig.mainReco.filterStyle"
        >
          <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
            {{ layoutConfig.mainReco.filtersTitle }}
          </div>
          <slot name="filters-aside" :filter="filter">
            <FiltersContainer :filter-params="layoutConfig.mainReco.filterParams" :filter="filter" :open="true" />
          </slot>
        </div>
      </div>
    </template>

    <!-- postMainReco -->
    <CustomLayoutInserts :config="layoutConfig.postMainReco">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutInserts>

    <!-- Footer -->
    <CustomLayoutFooter :config="layoutConfig.header">
      <template #footer>
        <slot name="footer" />
      </template>
    </CustomLayoutFooter>

    <!-- Sticky ATC -->
    <StickyFooter v-if="layoutConfig.stickyAtc.enabled">
      <slot name="sticky-add-to-cart" />
    </StickyFooter>

    <!-- Layers -->
    <CustomLayoutOverlay v-if="layoutConfig.layer.enabled" :config="layoutConfig.layer">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutOverlay>

    <!-- Filters slideover -->
    <Dialog
      v-if="layoutConfig.mainReco.filtersDisplay === 'slideover'"
      :open="showFiltersSlideover"
      @close="showFiltersSlideover = false"
    >
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div class="fixed inset-0">
        <DialogPanel :style="layoutConfig.mainReco.slideoverStyle">
          <div class="flex justify-end">
            <img v-if="layoutConfig.mainReco.slideoverCloseButton" :src="layoutConfig.mainReco.slideoverCloseButton" :style="layoutConfig.mainReco.slideoverCloseButtonStyle" @click="customLayout.toggleFiltersSlideover">
            <div v-else class="cursor-pointer" @click="customLayout.toggleFiltersSlideover">
              close
            </div>
          </div>
          <slot name="filters-aside" :filter="filter">
            <FiltersContainer :filter-params="layoutConfig.mainReco.filterParams" :filter="filter" :open="true" />
          </slot>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>
