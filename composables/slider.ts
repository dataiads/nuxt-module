import { ComputedRef, Ref } from "vue";

export const useSlider = (options: UseSliderOptions) => {

  const lpoConfig = useLpoConfig();

  if (!options.fetchQuery) {
    options.fetchQuery = {};
  }
  if (lpoConfig.sliderRecoParams?.filterRules) {
    options.baseRules = lpoConfig.sliderRecoParams?.filterRules;
  }
  if (lpoConfig.sliderRecoParams?.sortRules) {
    options.fetchQuery.sortRules = JSON.stringify(lpoConfig.sliderRecoParams.sortRules);
  }
  if (lpoConfig.sliderRecoParams?.deduplicate) {
    options.fetchQuery.deduplicate = lpoConfig.sliderRecoParams.deduplicate;
  }
  if (lpoConfig.sliderRecoParams?.limit) {
    options.defaultLimit = lpoConfig.sliderRecoParams.limit;
  }

  // watchable configuration for recommendation request.
  // can be manipulated directly and fetcher will update automatically
  const sort = ref<string>(lpoConfig.mainRecoParams?.sort ?? "");
  const limit = ref<number>(options.defaultLimit ?? 12);

  // current filters computed property
  const currentFilters = computed(() => {
    return JSON.stringify(options.baseRules ?? []);
  });

  // main fetcher that returns an auto updating list of products to display
  let fetchParams: Record<string, string | number | Ref<string> | Ref<number> | Ref<boolean> | ComputedRef<string> | ComputedRef<number> | ComputedRef<boolean>> = {
    productId: options.productId,
    sort: computed(() => (sort.value.startsWith("-") ? sort.value.substring(1) : sort.value)),
    sortDesc: computed(() => sort.value.startsWith("-")),
    filters: currentFilters,
  };
  if (options.localPagination) {
    fetchParams.limit = 1000; // arbitrary max limit when using local pagination
  } else {
    fetchParams.limit = limit;
  }
  if (options.fetchQuery) {
    for (const [key, value] of Object.entries(options.fetchQuery)) {
      fetchParams[key] = value;
    }
  }
  let _fetcher = useFetch(() => "/api/recommendations/default/filtered", {
    params: fetchParams,
    ...(options.fetchOptions ?? {}),
  });

  // fetcher post processing (grouping, local pagination...)
  let fetcher: FilterResults = {
    data: computed(() => {
      let rawData = _fetcher.data.value;
      if (!rawData) {
        return rawData;
      }

      // data can be transformed from Product[] to any array type
      let data: any[] = rawData;

      if (options.grouper) {
        data = execGrouper(data, options.grouper);
      }

      if (options.groupSorter) {
        data = execGroupSorter(data, options.groupSorter);
      }

      return data;
    }),
    pending: _fetcher.pending,
    refresh: _fetcher.refresh,
    execute: _fetcher.execute,
    error: _fetcher.error,
  };

  // issue side request to get total items count
  let count = ref(0);

  if (!options.localPagination) {
    const countFetcher = useFetch<number>(() => "/api/recommendations/default/count-filtered", {
      params: {
        productId: options.productId,
        filters: currentFilters,
        ...(options.fetchQuery || {}),
      },
    });
    watch(countFetcher.data, (val) => (count.value = val ?? 0));
  }

  return {
    results: fetcher,
    count: count,
    limit,
    sort,
  } as Slider;
};

function execGrouper(data: Product[], grouper: (p: Product) => string): Product[][] {
  let groups: Record<string, Product[]> = {};
  for (let p of data) {
    const key = grouper(p);
    if (groups[key]) {
      groups[key].push(p);
    } else {
      groups[key] = [p];
    }
  }
  return Object.values(groups);
}

function execGroupSorter(groups: Product[][], groupSorter: (groupA: Product[], groupB: Product[]) => number): Product[][] {
  return groups.sort((groupA, groupB) => groupSorter(groupA, groupB));
}