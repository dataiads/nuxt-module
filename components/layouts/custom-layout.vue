<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useCustomLayout } from '~/composables/custom-layout'

const customLayout = useCustomLayout()
if (!customLayout) throw new Error('no custom layout initialized')

const layoutConfig = useLpoConfig().customLayout

// scroll top of the filters when returning less results
onMounted(() => {
  watch(customLayout.filter.results.data, (newData, oldData) => {
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
const product = useProduct()
const route = useRoute()
const routeState = computed(() => route.query.state)
const showMainProduct = computed(() => !!product.value && !(routeState.value === 'hideMainProduct'))
</script>

<template>
  <div id="custom-layout" class="flex flex-col w-full justify-center">
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
    <template v-if="showMainProduct">
      <slot v-if="layoutConfig.mainProduct.light" name="main-product-light-header" />
      <slot v-else name="main-product-light-header" />
    </template>

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

        <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
      </div>

      <div class="flex flex-col grow shrink min-w-0">
        <!-- preMainProduct -->
        <CustomLayoutInserts :config="layoutConfig.preMainProduct">
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope" />
          </template>
        </CustomLayoutInserts>

        <!-- main product -->
        <template v-if="showMainProduct">
          <main v-if="layoutConfig.mainProduct.light" id="main-product">
            <slot name="main-product-light" />
          </main>
          <main v-else id="main-product">
            <slot name="main-product" />
          </main>
        </template>

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

            <CustomLayoutCatalogGrid :config="layoutConfig.mainReco">
              <template #filters-content-grid-item="ctx">
                <slot name="filters-content-grid-item" v-bind="ctx" />
              </template>
            </CustomLayoutCatalogGrid>

            <div id="filters-pagination">
              <CustomLayoutPagination :filter="customLayout.filter" :config="layoutConfig.mainReco" />
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
        <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
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
      <template v-if="showMainProduct">
        <main v-if="layoutConfig.mainProduct.light" id="main-product">
          <slot name="main-product-light" />
        </main>
        <main v-else id="main-product">
          <slot name="main-product" />
        </main>
      </template>

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
          <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
        </div>

        <div id="filters-content" class="grow">
          <div id="filters-content-header">
            <slot name="filters-content-header" />
          </div>

          <CustomLayoutCatalogGrid :config="layoutConfig.mainReco">
            <template #filters-content-grid-item="ctx">
              <slot name="filters-content-grid-item" v-bind="ctx" />
            </template>
          </CustomLayoutCatalogGrid>

          <div id="filters-pagination">
            <CustomLayoutPagination :filter="customLayout.filter" :config="layoutConfig.mainReco" />
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
          <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
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
    <StickyFooter
      v-if="!customLayout.showFiltersSlideover.value && layoutConfig.stickyAtc.enabled"
      v-bind="layoutConfig.stickyAtc"
    >
      <slot name="sticky-add-to-cart" />
    </StickyFooter>

    <!-- Layers -->
    <CustomLayoutOverlay v-if="layoutConfig.layer.enabled" :config="layoutConfig.layer">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutOverlay>

    <!-- Filters slideover -->
    <TransitionRoot appear :show="customLayout.showFiltersSlideover.value" as="template">
      <Dialog as="div" class="relative z-10" @close="customLayout.showFiltersSlideover.value = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-500"
            enter-from="opacity-0 translate-x-full"
            enter-to="opacity-100"
            leave="ease-in-out duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0 translate-x-full"
          >
            <DialogPanel :style="layoutConfig.mainReco.slideoverStyle" class="grid grid-rows-[auto_1fr_auto]">
              <div class="flex justify-end">
                <img
                  v-if="layoutConfig.mainReco.slideoverCloseButton"
                  :src="layoutConfig.mainReco.slideoverCloseButton"
                  :style="layoutConfig.mainReco.slideoverCloseButtonStyle"
                  @click="customLayout.toggleFiltersSlideover"
                >
                <div v-else class="cursor-pointer" @click="customLayout.toggleFiltersSlideover">
                  close
                </div>
              </div>
              <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" class="overflow-y-auto" />
              <CustomLayoutFiltersButtons :config="layoutConfig" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
