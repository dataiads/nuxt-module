<script setup lang="ts">
const product = useProduct();

const globalComponent = ref({
  stickyATC: {
    enable: true,
  },
  mainProduct: {
    light: true,
  },
  mainReco: {
    showFilters: true,
    highFilters: false,
    filterParams: [
      {
        title: "productType",
        elements: [
          {
            component: "autolist-checkbox",
            props: {
              criteria: "productType",
              operator: "EQUAL",
            },
          },
        ],
      },
      {
        title: "color",
        elements: [
          {
            component: "autolist-checkbox",
            props: {
              criteria: "color",
              operator: "EQUAL",
            },
          },
        ],
      },
      {
        title: "price",
        elements: [
          {
            component: "range",
            props: {
              criteria: "price",
              min: "0",
              minPlaceholder: "Min €",
              max: "10000",
              maxPlaceholder: "Max €",
            },
          },
          {
            component: "checkbox",
            props: {
              criteria: "salePrice",
              operator: "LOWER",
              "value-criteria": "price",
              label: "En promotion",
            },
          },
        ],
      },
      {
        title: "size",
        elements: [
          {
            component: "autolist-checkbox",
            props: {
              criteria: "size",
              operator: "EQUAL",
            },
          },
        ],
      },
    ],
    algo: {
      criteriaValues: ["size", "color", "productType"],
      limit: 24,
      deduplicate: "itemGroupId",
      filterRules: [
        [
          {
            criteria: "productType",
            operator: "EQUAL",
            baseProductValue: "productType",
          },
        ],
      ],
      sortRules: [
        [
          {
            criteria: "salePrice",
            operator: "LOWER",
            valueCriteria: "price",
          },
        ],
      ],
    },
  },
});

const config = {
  preHeader: [
    {
      type: "banner",
      enable: true,
      interval: 4000,
      banners: [{ text: "RETRAIT ET LIVRAISON OFFERTE 1h magasin" }],
    },
  ],
  postHeader: [
    {
      type: "breadcrumb",
      enable: true,
    },
    {
      type: "reco-slider",
      enable: true,
      autoScroll: true,
      scrollSpeed: 7,
      algo: {
        baseRules: [
          [
            {
              criteria: "productType",
              operator: "EQUAL",
              baseProductValue: "productType",
            },
          ],
          [
            {
              criteria: "channel",
              operator: "EQUAL",
              baseProductValue: "channel",
            },
          ],
        ],
        sortRules: [
          [
            {
              criteria: "salePrice",
              operator: "LOWER",
              valueCriteria: "price",
            },
          ],
        ],
      },
    },
    {
      type: "cross-sell",
      enable: true,
      crossSellData: {
        Demo: [
          {
            text: "Nouvelle collection",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/files/big_727593_5110_V1_1080x.png?v=1631004631",
          },
          {
            text: "Vestes et Manteaux",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/products/727407_2200_V5_600x.jpg?v=1631027312",
          },
          {
            text: "Tee-shirts",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/products/727593_9010_V4_600x.jpg?v=1631003250",
          },
          {
            text: "Chemises",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/products/725348_5080_V4_470x.jpg?v=1631002065",
          },
          {
            text: "Pantalons",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/products/724246_1400_V3_2048x2048.jpg?v=1631027254",
          },
          {
            text: "Costumes",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/products/723014_8080_V1_600x.jpg?v=1631027500",
          },
          {
            text: "Accessoires",
            link: "",
            image:
              "https://shop.dataiads.io/cdn/shop/products/727872_7550_V1_470x.jpg?v=1631089842",
          },
        ],
      },
      dataKey: "",
    },
  ],
  postMainProduct: [
    {
      type: "reco-slider",
      enable: true,
      autoScroll: true,
      scrollSpeed: 7,
      algo: {
        baseRules: [
          [
            {
              criteria: "productType",
              operator: "EQUAL",
              baseProductValue: "productType",
            },
          ],
          [
            {
              criteria: "channel",
              operator: "EQUAL",
              baseProductValue: "channel",
            },
          ],
        ],
        sortRules: [
          [
            {
              criteria: "salePrice",
              operator: "LOWER",
              valueCriteria: "price",
            },
          ],
        ],
      },
    },
  ],
  postMainReco: [],
};

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>(
  "responsiveAsideItemSingleton",
  () => null
);

const filter = useFilterState();

let { data: filterProducts } = filter.results;

onMounted(() => {
  // scroll top of the filters when returning less results
  watch(filterProducts, (newData, oldData) => {
    if (
      globalComponent.value.mainReco.highFilters &&
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
    <InsertZone :elements="config.preHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </InsertZone>

    <header id="header">
      <slot name="header" />
    </header>

    <InsertZone :elements="config.postHeader">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </InsertZone>

    <div>HIGH FILTERS</div>
    <input v-model="globalComponent.mainReco.highFilters" type="checkbox" />
    <div>Show Filters</div>
    <input v-model="globalComponent.mainReco.showFilters" type="checkbox" />
    <template
      v-if="
        globalComponent.mainReco.showFilters &&
        globalComponent.mainReco.highFilters
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
          <MainProduct :light="globalComponent.mainProduct.light">
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

          <InsertZone :elements="config.postMainProduct">
            <template v-for="(_, name) in $slots" #[name]="scope">
              <slot :name="name" v-bind="scope"></slot>
            </template>
          </InsertZone>
        </div>
      </div>
    </template>

    <template v-else>
      <MainProduct :light="globalComponent.mainProduct.light">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </MainProduct>
      <InsertZone :elements="config.postMainProduct">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </InsertZone>

      <template v-if="globalComponent.mainReco.showFilters">
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

    <InsertZone :elements="config.postMainReco">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </InsertZone>

    <footer id="footer">
      <slot name="footer" />
    </footer>

    <StickyFooter v-if="globalComponent.stickyATC.enable">
      <slot name="sticky-add-to-cart" />
    </StickyFooter>
  </div>
</template>

<style lang="scss">
#filters {
  @apply flex;
}
</style>
