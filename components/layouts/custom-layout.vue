<script setup lang="ts">
const props = defineProps(layoutProps);
const product = useProduct();

const globalComponent = {
  stickyATC: {
    enable: true,
  },
  mainProductLight: true,
  mainReco: {
    enable: true,
    highFilters: true,
    params: {
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
};

const config = {
  prependHeader: [
    {
      type: "banner",
      options: {
        enable: true,
        interval: 4000,
        banners: [{ text: "RETRAIT ET LIVRAISON OFFERTE 1h magasin" }],
      },
    },
  ],
  appendHeader: [
    {
      type: "breadcrumb",
      options: {
        enable: true,
      },
    },
    {
      type: "reco-slider",
      options: {
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
    },
    {
      type: "cross-sell",
      options: {
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
    },
  ],
  appendMainProduct: [],
  appendMainReco: [],
};

let { data: filterProducts } = props.filter.results;

// global singleton to ensure only a single dropdown is open on mobile
const mobileFilterOpen = useState<(() => void) | null>(
  "responsiveAsideItemSingleton",
  () => null
);
</script>

<template>
  <div class="lg:mx-auto">
    <!-- Prepend Header-->
    <div
      v-for="(element, i) in config.prependHeader"
      :id="element.type"
      :key="'prependheader_' + i"
    >
      <slot
        v-if="element.options.enable"
        :name="element.type"
        :options="element.options"
      />
    </div>

    <header id="header">
      <slot name="header" />
    </header>

    <div
      v-for="(element, i) in config.appendHeader"
      :id="element.type"
      :key="'postheader_' + i"
    >
      <slot
        v-if="element.options.enable"
        :name="element.type"
        :options="element.options"
      />
      <RecoSlider
        v-if="element.type === 'reco-slider' && element.options.enable"
        :slider-props="{
          autoscroll: element.options.autoScroll,
          scrollSpeed: element.options.scrollSpeed,
        }"
        :algo="element.options.algo"
      >
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </RecoSlider>
    </div>

    <div v-if="globalComponent.mainReco.highFilters">
      <div
        id="filters-aside"
        :class="[
          mobileFilterOpen != null ? 'overflow-x-hidden' : 'overflow-x-scroll',
        ]"
      >
        <slot name="filters-aside" />
      </div>
      <MainProduct :light="globalComponent.mainProductLight">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </MainProduct>
      <div
        v-for="(element, i) in config.appendMainProduct"
        :id="element.type"
        :key="'appendmainProduct_' + i"
      >
        <slot
          v-if="element.options.enable"
          :name="element.type"
          :options="element.options"
        />
        <RecoSlider
          v-if="element.type === 'reco-slider' && element.options.enable"
          :slider-props="{
            autoscroll: element.options.autoScroll,
            scrollSpeed: element.options.scrollSpeed,
          }"
          :algo="element.options.algo"
        >
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
          </template>
        </RecoSlider>
      </div>
    </div>
    <template v-else>
      <MainProduct :light="globalComponent.mainProductLight">
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </MainProduct>
      <div
        v-for="(element, i) in config.appendMainProduct"
        :id="element.type"
        :key="'appendmainProduct_' + i"
      >
        <slot
          v-if="element.options.enable"
          :name="element.type"
          :options="element.options"
        />
        <RecoSlider
          v-if="element.type === 'reco-slider' && element.options.enable"
          :slider-props="{
            autoscroll: element.options.autoScroll,
            scrollSpeed: element.options.scrollSpeed,
          }"
          :algo="element.options.algo"
        >
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
          </template>
        </RecoSlider>
      </div>
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
        >
          <slot name="filters-aside"></slot>
        </div>
        <div id="filters-content">
          <div id="filters-content-header">
            <slot name="filters-content-header"></slot>
          </div>
          <div>
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
    </template>

    <div
      v-for="(element, i) in config.appendMainReco"
      :id="element.type"
      :key="'appendmainProduct_' + i"
    >
      <slot
        v-if="element.options.enable"
        :name="element.type"
        :options="element.options"
      />
      <RecoSlider
        v-if="element.type === 'reco-slider' && element.options.enable"
        :slider-props="{
          autoscroll: element.options.autoScroll,
          scrollSpeed: element.options.scrollSpeed,
        }"
        :algo="element.options.algo"
      >
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </RecoSlider>
    </div>

    <footer id="footer">
      <slot name="footer" />
    </footer>

    <StickyFooter v-if="globalComponent.stickyATC.enable">
      <slot name="sticky-add-to-cart" />
    </StickyFooter>
  </div>
</template>
