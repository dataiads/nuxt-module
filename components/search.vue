<script setup lang="ts">
interface Props {
  // mirrored site search url
  redirectUrl: string;

  // mirrored site search value query param on search url
  redirectSearchParam?: string;

  // allow search to use ajax lookup of similar products
  lpoSearchReccomendations?: boolean;

  // Open full screen overlay when turggered (for example, when user focuses on search).
  fullScreenOverlay?: boolean;

  // Display search results in either vertical or horizontal
  direction?: "horizontal" | "vertical";

  // Number of products to display
  limit?: number;

  // Fields to search in
  searchFields?: string[];

  // Allow initial search, even when there is no input entered in the search bar
  allowEmptySearch?: boolean;

  // Search prefilters
  baseRules?: FilterRule[][];

  // Search sort order
  sort?: string;

  // deduplicate search results
  deduplicate?: string;
}

const props = withDefaults(defineProps<Props>(), {
  redirectSearchParam: "",
  lpoSearchReccomendations: true,
  fullScreenOverlay: false,
  direction: "vertical",
  limit: 4,
  searchFields: () => ["title"],
  allowEmptySearch: false,
  sort: "random",
  deduplicate: "itemGroupId",
});

const value = useState("search.value", () => "");
const overlayOpen = ref(false);

const searchFilters = computed(() => {
  const filter = props.baseRules ?? [];
  if (props.allowEmptySearch && value.value === "") {
    return JSON.stringify(filter);
  }

  filter.push(
    ...[
      props.searchFields.map((field) => ({
        criteria: field,
        operator: "CONTAINS_ALL_CI",
        value: value.value.split(" ").join(","),
      })),
    ]
  );

  return JSON.stringify(filter);
});

// on submit, redirect to mirrored domain search url
const submit = () => {
  if (value.value && props.redirectUrl) {
    let url = new URL(props.redirectUrl);

    // If no search param is specified, search by appending to the URL path.
    if (props.redirectSearchParam === "") {
      url.pathname = url.pathname + encodeURIComponent(value.value);
    } else {
      url.searchParams.set(props.redirectSearchParam, value.value);
    }
    window.location.href = url.toString();
  }
  overlayOpen.value = false;
};

// -- Search suggestions --
const fetchSearchProducts = async () => {
  const { data: searchRecoProductsFetch } = await useFetch(
    "/api/recommendations/default/filtered",
    {
      params: {
        productId: product.value.id,
        limit: props.limit,
        sort: props.sort?.startsWith("-")
          ? props.sort.substring(1)
          : props.sort,
        sortDesc: props.sort?.startsWith("-") ?? false,
        filters: searchFilters.value,
        deduplicate: props.deduplicate,
      },
    }
  );
  return searchRecoProductsFetch.value;
};

const searchRecoProducts: Ref<Product[]> = ref([]);

const product = useProduct();
const searchValue: Ref<string> = refDebounced(value, 500); // https://vueuse.org/shared/refDebounced/#refdebounced
watch(searchValue, async () => {
  if (props.lpoSearchReccomendations && (searchValue.value !== "" || props.allowEmptySearch)) {
    searchRecoProducts.value = await fetchSearchProducts();
  } else {
    searchRecoProducts.value = [];
  }
});

// input event handler for slot input
const input = (event: Event) => {
  value.value = (event.target as HTMLInputElement).value;
};

const toggleOverlay = () => (overlayOpen.value = !overlayOpen.value);

// Run filtering once if we allow empty search
if (props.allowEmptySearch) {
  searchRecoProducts.value = await fetchSearchProducts();
}
</script>

<template>
  <form @submit.prevent="submit">
    <slot
      :value="value"
      :input="input"
      :toggle-overlay="toggleOverlay"
      :overlay-open="overlayOpen"
    >
      <input :value="value" @input="input" placeholder="search..." />
    </slot>
  </form>
  <div id="search-slider" v-if="lpoSearchReccomendations && !fullScreenOverlay">
    <div class="absolute z-10">
      <slot name="search-slider-header"></slot>
      <Slider
        :items="searchRecoProducts"
        :autoscroll="false"
        :direction="direction"
      >
        <template #item="{ item }">
          <slot name="search-slider-item" :key="item.id" :item="item">
            <div class="bg-white flex content-center max-w-[540px] p-2.5">
              <div class="flex">
                <div class="pr-1 h-[120px]">
                  <figure class="relative max-w-sm cursor-pointer">
                    <a aria-label="view search result" :href="$oriUrl(item.data.link)">
                      <img
                        :src="item.data.imageLink"
                        width="120"
                        height="120"
                        class="mx-auto h-[120px] w-auto"
                        loading="lazy"
                        alt="recommended product image"
                      />
                    </a>
                  </figure>
                </div>
                <div class="flex flex-col flex-1 py-3 pl-2">
                  <a :href="$oriUrl(item.data.link)" class="uppercase font-bold font-custom line-clamp-2 leading-[19px]">
                    {{ item?.extraData?.title || item.data.title }}
                  </a>

                  <div class="flex items-center">
                    <PriceDisplay :product="item">
                      <template #price="{ price }">
                        <span class="text-[15px] font-medium">{{ price }}&euro;</span>
                      </template>
                      <template #sale-price="{ price, salePrice }">
                        <span class="text-[15px] font-medium">{{ salePrice }}&euro;</span>
                        <div class="line-through text-gray-400 text-right ml-1.5 text-[13px] leading-[14px]">
                          {{ price }}&euro;
                        </div>
                      </template>
                    </PriceDisplay>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </template>
        <template #previous-btn="scope">
          <slot name="search-slider-previous-btn" v-bind="scope">
            <div></div>
          </slot>
        </template>
        <template #next-btn="scope">
          <slot name="search-slider-next-btn" v-bind="scope">
            <div></div>
          </slot>
        </template>
      </Slider>
      <slot v-if="!searchRecoProducts.length" name="search-slider-empty"></slot>
      <slot name="search-slider-footer"></slot>
    </div>
  </div>
  <Teleport to="body" v-if="fullScreenOverlay">
    <Transition
      :duration="{ enter: 800, leave: 800 }"
      enter-active-class="transition-all transition-slow ease-out-quad"
      leave-active-class="transition-all transition-slow ease-in-quad"
      enter-from-class="opacity-0 scale-70"
      enter-to-class="opacity-100 scale-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-70"
      appear
    >
    <div v-if="overlayOpen" aria-modal="true" tabindex="0" class="fixed inset-0 w-full h-full z-50 overflow-hidden bg-white">
        <slot name="full-screen-overlay" :close="() => overlayOpen = false" :items="searchRecoProducts" :value="value" :input="input"></slot>
      </div>
    </Transition>
  </Teleport>
</template>
