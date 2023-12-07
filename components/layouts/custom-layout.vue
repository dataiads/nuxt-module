<script setup lang="ts">
const product = useProduct();

const layoutConfig = useLpoConfig().customLayout;

console.log("CUSTOM LAYOUT CONFIG", layoutConfig);

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>(
  "responsiveAsideItemSingleton",
  () => null
);


const overlayContent = ref(null);

const filter = useFilterState();

let { data: filterProducts } = filter.results;

onMounted(() => {
  // scroll top of the filters when returning less results
  watch(filterProducts, (newData, oldData) => {
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
    <!-- Prepend Header-->
    <CustomLayoutInserts :config="layoutConfig.preHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </CustomLayoutInserts>

    <header id="header">
      <slot name="header" />
    </header>

    <CustomLayoutInserts :config="layoutConfig.postHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </CustomLayoutInserts>

    <template
      v-if="
        layoutConfig.mainReco.showFilters && layoutConfig.mainReco.highFilters
      "
    >
      <div id="filters-header">
        <slot name="filters-header"></slot>
      </div>
      <div class="flex flex-row">
        <div
          id="filters-aside"
          :class="[
            mobileFilterOpen != null
              ? 'overflow-x-hidden'
              : 'overflow-x-scroll',
          ]"
          class="shrink-0"
        >
          <slot name="filters-aside" />
        </div>
        <div>
          <MainProduct :light="layoutConfig.mainProduct.light">
            <template v-for="(_, name) in $slots" #[name]="scope">
              <slot :name="name" v-bind="scope"></slot>
            </template>
          </MainProduct>

          <div id="filters">
            <div id="filters-content">
              <div id="filters-content-header">
                <slot name="filters-content-header"></slot>
              </div>
              <div
                class="grid grid-cols-[var(--catalog-grid-cols)] md:grid-cols-[var(--md-catalog-grid-cols)] lg:grid-cols-[var(--lg-catalog-grid-cols)] xl:grid-cols-[var(--xl-catalog-grid-cols)] 2xl:grid-cols-[var(--2xl-catalog-grid-cols)] 3xl:grid-cols-[var(--3xl-catalog-grid-cols)] gap-[var(--catalog-grid-gap)] md:gap-[var(--md-catalog-grid-gap)] lg:gap-[var(--lg-catalog-grid-gap)] xl:gap-[var(--xl-catalog-grid-gap)] 2xl:gap-[var(--2xl-catalog-grid-gap)] 3xl:gap-[var(--3xl-catalog-grid-gap)]"
              >
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
              <div id="filters-pagination">
                <slot name="filters-pagination"></slot>
              </div>
            </div>
          </div>

          <div
            v-for="(element, i) in layoutConfig.postMainProduct"
            :id="element.type"
            :key="'appendmainProduct_' + i"
          >
            <slot
              v-if="element.enable"
              :name="element.type"
              :options="element"
            />
            <RecoSlider
              v-if="element.type === 'reco-slider' && element.enable"
              :slider-props="{
                autoscroll: element.autoScroll,
                scrollSpeed: element.scrollSpeed,
              }"
              :algo="element.algo"
            >
              <template v-for="(_, name) in $slots" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
              </template>
            </RecoSlider>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <MainProduct :light="layoutConfig.mainProduct.light">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </MainProduct>
      <div
        v-for="(element, i) in layoutConfig.postMainProduct"
        :id="element.type"
        :key="'appendmainProduct_' + i"
      >
        <slot v-if="element.enable" :name="element.type" :options="element" />
        <RecoSlider
          v-if="element.type === 'reco-slider' && element.enable"
          :slider-props="{
            autoscroll: element.autoScroll,
            scrollSpeed: element.scrollSpeed,
          }"
          :algo="element.algo"
        >
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
          </template>
        </RecoSlider>
      </div>
      <template v-if="layoutConfig.mainReco.showFilters">
        <div id="filters-header">
          <slot name="filters-header"></slot>
        </div>

        <div id="filters">
          <div
            id="filters-aside"
            :class="[
              mobileFilterOpen != null
                ? 'overflow-x-hidden'
                : 'overflow-x-scroll',
            ]"
            class="shrink-0"
          >
            <slot name="filters-aside"></slot>
          </div>
          <div id="filters-content">
            <div id="filters-content-header">
              <slot name="filters-content-header"></slot>
            </div>
            <div
              class="grid grid-cols-[var(--catalog-grid-cols)] md:grid-cols-[var(--md-catalog-grid-cols)] lg:grid-cols-[var(--lg-catalog-grid-cols)] xl:grid-cols-[var(--xl-catalog-grid-cols)] 2xl:grid-cols-[var(--2xl-catalog-grid-cols)] 3xl:grid-cols-[var(--3xl-catalog-grid-cols)] gap-[var(--catalog-grid-gap)] md:gap-[var(--md-catalog-grid-gap)] lg:gap-[var(--lg-catalog-grid-gap)] xl:gap-[var(--xl-catalog-grid-gap)] 2xl:gap-[var(--2xl-catalog-grid-gap)] 3xl:gap-[var(--3xl-catalog-grid-gap)]"
            >
              <slot
                v-if="filterProducts?.length"
                name="filters-content-grid-item"
                v-for="(item, index) in filterProducts"
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

    <div
      v-for="(element, i) in layoutConfig.postMainReco"
      :id="element.type"
      :key="'appendmainProduct_' + i"
    >
      <slot
        v-if="element.enable"
        :name="element.type"
        :options="element.options"
      />
      <RecoSlider
        v-if="element.type === 'reco-slider' && element.enable"
        :slider-props="{
          autoscroll: element.autoScroll,
          scrollSpeed: element.scrollSpeed,
        }"
        :algo="element.algo"
      >
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </RecoSlider>
    </div>

    <CustomLayoutOverlay v-if="layoutConfig.overlay">
      <template #overlay-content>
        <CustomLayoutInserts :config="layoutConfig.overlay">
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
          </template>
        </CustomLayoutInserts>  
      </template>
    </CustomLayoutOverlay>

    <!-- 
      <div
        v-if="layoutConfig.overlay"
        id="overlay"
        class="fixed bottom-0 w-full bg-black/50 z-20"
        :class="{
          'pointer-events-none': overlayState === 'closed',
          'h-0': overlayState === 'closed',
          'h-full': overlayState !== 'closed',
        }"
      >
        <div
          id="overlayContent"
          ref="overlayContent"
          class="fixed right-0 top-0 bottom-0 transition duration-500 ease-in-out z-21 bg-white p-2 w-2/5 lg:w-[380px] h-full"
          :class="{
            'translate-y-[50vh]': overlayState === 'initial',
            'md:translate-y-0': overlayState === 'initial',
            'translate-y-0': overlayState === 'open',
            'translate-y-full': overlayState === 'closed',
          }"
        >
          <slot name="overlay-content">
            <CustomLayoutInserts :config="layoutConfig.overlay">
              <template v-for="(_, name) in $slots" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
              </template>
            </CustomLayoutInserts>
          </slot>
        </div>
      </div>

     -->

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
