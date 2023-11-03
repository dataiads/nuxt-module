import { ComputedRef, Ref } from "vue";

export const useFilter = (options: Omit<UseRecommenderOptions, "configRecoParams" | "endpoint">) => {
  return useRecommender({
    configRecoParams: "mainRecoParams",
    endpoint: "filtered",
    ...options,
  })
};

export const useSlider = (options: Omit<UseRecommenderOptions, "configRecoParams" | "endpoint">) => {
  return useRecommender({
    configRecoParams: 'sliderRecoParams',
    endpoint: 'randomfill',
    ...options,
  })
};

export const useRecommender = (options: UseRecommenderOptions) => {

  if (!options.fetchQuery) {
    options.fetchQuery = {};
  }

  const lpoConfig = useLpoConfig();

  if (options.configRecoParams) {
    const recoParams = lpoConfig[options.configRecoParams];
    if (recoParams?.filterRules) {
      options.baseRules = recoParams?.filterRules;
    }
    if (recoParams?.sortRules) {
      options.fetchQuery.sortFilters = JSON.stringify(recoParams.sortRules);
    }
    if (recoParams?.deduplicate) {
      options.fetchQuery.deduplicate = recoParams.deduplicate;
    }
    if (recoParams?.limit) {
      options.defaultLimit = recoParams.limit;
    }
    if (recoParams?.sort) {
      options.defaultSort = recoParams.sort;
    }
  }

  const initState = () => {
    const init: Record<string, FilterRule[]> = {}

    // handle initial rules before setting up fetcher
    if (options.initialRules) {
      for (let r of options.initialRules) {
        if (!init[r.group]) {
          init[r.group] = [];
        }
        init[r.group].push({
          criteria: r.criteria,
          operator: r.operator,
          value: r.value,
          valueCriteria: r.valueCriteria ?? "",
          baseProductValue: r.baseProductValue ?? "",
          baseProductRegexpMatch: r.baseProductRegexpMatch ?? "",
          baseProductRegexpReplace: r.baseProductRegexpReplace ?? ""
        });
      }
    }
    return init;
  }

  // main rules state. do not edit directly use functions below instead
  const state = ref<Record<string, FilterRule[]>>(initState());

  // watchable configuration for recommendation request.
  // can be manipulated directly and fetcher will update automatically
  const sort = ref<string>(options.defaultSort ?? "");
  const limit = ref<number>(options.defaultLimit ?? 12);
  const page = ref<number>(1);

  // current filters computed property
  const currentFilters = computed(() => {
    return JSON.stringify(
      Object.values(state.value)
        .concat(options.baseRules || [])
        .filter((group) => group.length > 0)
    );
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
    fetchParams.page = page;
  }
  if (options.fetchQuery) {
    for (const [key, value] of Object.entries(options.fetchQuery)) {
      fetchParams[key] = value;
    }
  }
  let _fetcher = useFetch(() => "/api/recommendations/default/"+options.endpoint, {
    params: fetchParams,
    ...(options.fetchOptions ?? {}),
  });

  // fetcher post processing (grouping, local pagination...)
  let fetcher: RecommenderResults = {
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

      // local pagination is applied on transformed data
      if (options.localPagination) {
        count.value = data.length;
        data = data.slice((page.value - 1) * limit.value, page.value * limit.value);
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
    watch(countFetcher.data, (val) => (count.value = val || 0));
  }

  // secondary fetchers for criteria values (used in AutoListingCheckbox)
  // cached manually to avoid concurrent calls on app startup
  // (useFetch has set its own cache only after the first response)
  let criteriaValuesCache: Record<string, any> = {};

  const fetchCriteriaValues = (criteria: string) => {
    if (!criteriaValuesCache[criteria]) {
      criteriaValuesCache[criteria] = useFetch<Record<string, number>>("/api/recommendations/default/count-property", {
        params: {
          productId: options.productId,
          property: criteria,
          filters: JSON.stringify(options.baseRules || []),
          ...(options.fetchQuery || {}),
        },
      });
    }
    return criteriaValuesCache[criteria];
  };

  // all functions below allow state manipulation
  const hasRule = (group: string, criteria: string, operator: string, value: string, valueCriteria = "", baseProductValue = "", baseProductRegexpMatch = "", baseProductRegexpReplace = ""): boolean => {
    if (!state.value[group]) {
      return false;
    }
    return !!state.value[group].find((rule) => rule.criteria === criteria && rule.operator === operator && rule.value === value && rule.valueCriteria === valueCriteria && rule.baseProductValue === baseProductValue && rule.baseProductRegexpMatch === baseProductRegexpMatch && rule.baseProductRegexpReplace === baseProductRegexpReplace);
  };

  const getFirstRuleValue = (group: string): string | null => {
    if (state.value[group]?.length > 0) {
      return state.value[group][0].value;
    }
    return null;
  };

  const pushRule = (group: string, criteria: string, operator: string, value: string, valueCriteria = "", baseProductValue = "", baseProductRegexpMatch = "", baseProductRegexpReplace = ""): void => {
    if (!hasRule(group, criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace)) {
      if (state.value[group]) {
        state.value[group].push({ criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace });
      } else {
        state.value[group] = [{ criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace }];
      }
    }
  };

  const setOnlyRule = (group: string, criteria: string, operator: string, value: string, valueCriteria = "", baseProductValue = "", baseProductRegexpMatch = "", baseProductRegexpReplace = ""): void => {
    state.value[group] = [{ criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace }];
  };

  const removeRule = (group: string, criteria: string, operator: string, value: string, valueCriteria = "", baseProductValue = "", baseProductRegexpMatch = "", baseProductRegexpReplace = ""): void => {
    if (!hasRule(group, criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace)) {
      return;
    }
    const index = state.value[group].findIndex((rule) => rule.criteria === criteria && rule.operator === operator && rule.value === value && rule.valueCriteria === valueCriteria && rule.baseProductValue === baseProductValue && rule.baseProductRegexpMatch === baseProductRegexpMatch && rule.baseProductRegexpReplace === baseProductRegexpReplace);
    if (index > -1) {
      state.value[group].splice(index, 1);
    }
  };

  const removeAllRules = (group: string): void => {
    state.value[group] = [];
  };

  const reset = () => {
    state.value = initState();
  }

  return {
    results: fetcher,
    count: count,
    limit,
    sort,
    page,
    fetchCriteriaValues,
    hasRule,
    getFirstRuleValue,
    pushRule,
    removeRule,
    setOnlyRule,
    removeAllRules,
    reset,
  } as Recommender;
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