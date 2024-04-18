<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useDynamicLpoConfig } from '~/composables/config'
import { useCustomLayout } from '~/composables/custom-layout'

const customLayout = useCustomLayout()
if (!customLayout) throw new Error('no custom layout initialized')

if (!customLayout) {
  throw new Error('no custom layout initialized')
}

const dynamicLpoConfig = useDynamicLpoConfig()
const layoutConfig = computed(() => dynamicLpoConfig.value.customLayout)

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

// global stylesheet from confi
useHead({
  style: [{ children: () => layoutConfig.value?.global.stylesheet }]
})

const route = useRoute()
const routeState = computed(() => route.query.state)
const showMainProduct = computed(() => !(routeState.value === 'hideMainProduct'))
</script>

<template>
  <div v-if="layoutConfig" id="custom-layout" class="flex flex-col w-full justify-center">
    <!-- preHeader -->
    <CustomLayoutInserts insert-position="pre-header" :config="layoutConfig.preHeader">
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
    <CustomLayoutInserts insert-position="post-header" :config="layoutConfig.postHeader">
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
        <div id="filter-header-btn">
          <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
              {{ layoutConfig.mainReco.filtersTitle }}
          </div>
          <div id="reset-btn">
            <button @click="customLayout?.filter.reset()" :style="layoutConfig.mainReco.filterParamsButtonEraseStyle"
              v-if="layoutConfig.mainReco.filterParamsButtonEraseEnable">
                {{ layoutConfig.mainReco.filterParamsButtonEraseText }}
            </button>
          </div>
        </div>

        <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
      </div>

      <div class="flex flex-col grow shrink min-w-0">
        <!-- preMainProduct -->
        <CustomLayoutInserts insert-position="pre-main-product" :config="layoutConfig.preMainProduct">
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
        <CustomLayoutInserts insert-position="post-main-product" :config="layoutConfig.postMainProduct">
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
              <template #filters-no-results>
                <slot name="filters-no-results">
                  <div class="text-center">
                    {{ $t('noResultsCatalog') }}
                  </div>
                </slot>
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
      <div id="filter-header-btn">
          <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
              {{ layoutConfig.mainReco.filtersTitle }}
          </div>
          <div id="reset-btn">
            <button @click="customLayout?.filter.reset()" :style="layoutConfig.mainReco.filterParamsButtonEraseStyle"
              v-if="layoutConfig.mainReco.filterParamsButtonEraseEnable">
                {{ layoutConfig.mainReco.filterParamsButtonEraseText }}
            </button>
          </div>
        </div>
        <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
      </div>
    </div>

    <template v-else>
      <!-- preMainProduct -->
      <CustomLayoutInserts insert-position="pre-main-product" :config="layoutConfig.preMainProduct">
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
      <CustomLayoutInserts insert-position="post-main-product" :config="layoutConfig.postMainProduct">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </CustomLayoutInserts>

      <div id="filters" class="flex flex-row w-full">
        <div
          v-if="layoutConfig.mainReco.filtersDisplay === 'left'"
          id="filters-aside"
          class="shrink-0"
          :style="layoutConfig.mainReco.filterStyle"
        >
        <div id="filter-header-btn">
          <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
              {{ layoutConfig.mainReco.filtersTitle }}
          </div>
          <div id="reset-btn">
            <button @click="customLayout?.filter.reset()" :style="layoutConfig.mainReco.filterParamsButtonEraseStyle"
              v-if="layoutConfig.mainReco.filterParamsButtonEraseEnable">
                {{ layoutConfig.mainReco.filterParamsButtonEraseText }}
            </button>
          </div>
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
            <template #filters-no-results>
              <slot name="filters-no-results">
                <div class="text-center">
                  {{ $t('noResultsCatalog') }}
                </div>
              </slot>
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
        <div id="filter-header-btn">
          <div v-if="layoutConfig.mainReco.filtersTitle" :style="layoutConfig.mainReco.filtersTitleStyle">
              {{ layoutConfig.mainReco.filtersTitle }}
          </div>
          <div id="reset-btn">
            <button @click="customLayout?.filter.reset()" :style="layoutConfig.mainReco.filterParamsButtonEraseStyle"
              v-if="layoutConfig.mainReco.filterParamsButtonEraseEnable">
                {{ layoutConfig.mainReco.filterParamsButtonEraseText }}
            </button>
          </div>
        </div>
          <CustomLayoutFiltersAside :filter="customLayout.filter" :config="layoutConfig" />
        </div>
      </div>
    </template>

    <!-- postMainReco -->
    <CustomLayoutInserts insert-position="post-main-reco" :config="layoutConfig.postMainReco">
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
    <StickyFooter v-if="!customLayout.showFiltersSlideover.value && layoutConfig.stickyAtc.enabled" v-bind="layoutConfig.stickyAtc">
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
