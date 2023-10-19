// @ts-nocheck
import { ComputedRef, Ref } from "vue";

export const useStructuredFilter = (
  options: Omit<
    UseRecommenderOptions,
    | "configRecoParams"
    | "endpoint"
    | "grouper"
    | "localPagination"
    | "structuredResponse"
  >
) => {
  return useStructuredRecommender({
    configRecoParams: "mainRecoParams",
    endpoint: "structured-filter",
    grouper: undefined,
    localPagination: false,
    ...options,
  });
};

export const useStructuredRecommender = (options: UseRecommenderOptions) => {
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
    const init: Record<string, FilterRule[]> = {};

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
          baseProductRegexpReplace: r.baseProductRegexpReplace ?? "",
        });
      }
    }
    return init;
  };

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

  // secondary fetchers for criteria values (used in AutoListingCheckbox)
  // cached manually to avoid concurrent calls on app startup
  // (useFetch has set its own cache only after the first response)
  let criteriaValuesCache: Record<string, any> = {};

  // main fetcher that returns an auto updating list of products to display
  let fetchParams: Record<
    string,
    | string
    | number
    | Ref<string>
    | Ref<number>
    | Ref<boolean>
    | ComputedRef<string>
    | ComputedRef<number>
    | ComputedRef<boolean>
  > = {
    productId: options.productId,
    sort: computed(() =>
      sort.value.startsWith("-") ? sort.value.substring(1) : sort.value
    ),
    sortDesc: computed(() => sort.value.startsWith("-")),
    filters: currentFilters,
  };
  if (options.criteriaValues?.length) {
    fetchParams.criteriaValues = JSON.stringify(options.criteriaValues);
  }

  fetchParams.limit = limit;
  fetchParams.page = page;

  if (options.fetchQuery) {
    for (const [key, value] of Object.entries(options.fetchQuery)) {
      fetchParams[key] = value;
    }
  }
  let _fetcher = useFetch(
    () => "/api/recommendations/default/" + options.endpoint,
    {
      params: fetchParams,
      ...(options.fetchOptions ?? {}),
    }
  );

  let fetcher = {
    data: computed(() => {
      if (_fetcher.data.value) {
        return _fetcher.data.value.page;
      }
      return _fetcher.data.value;
    }),
    pending: _fetcher.pending,
    refresh: _fetcher.refresh,
    execute: _fetcher.execute,
    error: _fetcher.error,
  };

  // issue side request to get total items count
  let count = computed(() => {
    if (_fetcher.data.value) {
      return _fetcher.data.value.total;
    }
    return 0;
  });

  const fetchCriteriaValues = (criteria: string) => {
    let cached = {};
    return {
      data: computed(() => {
        if (Object.keys(cached).length) {
          return cached
        }
        if (_fetcher.data.value) {
          if (_fetcher.data.value.criteriaValues[criteria]) {
            cached = _fetcher.data.value.criteriaValues[criteria];
            return cached;
          }
          return {};
        }
        return _fetcher.data.value;
      }),
      pending: _fetcher.pending,
      refresh: _fetcher.refresh,
      execute: _fetcher.execute,
      error: _fetcher.error,
    };
  };


  // all functions below allow state manipulation
  const hasRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = "",
    baseProductValue = "",
    baseProductRegexpMatch = "",
    baseProductRegexpReplace = ""
  ): boolean => {
    if (!state.value[group]) {
      return false;
    }
    return !!state.value[group].find(
      (rule) =>
        rule.criteria === criteria &&
        rule.operator === operator &&
        rule.value === value &&
        rule.valueCriteria === valueCriteria &&
        rule.baseProductValue === baseProductValue &&
        rule.baseProductRegexpMatch === baseProductRegexpMatch &&
        rule.baseProductRegexpReplace === baseProductRegexpReplace
    );
  };

  const getFirstRuleValue = (group: string): string | null => {
    if (state.value[group]?.length > 0) {
      return state.value[group][0].value;
    }
    return null;
  };

  const pushRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = "",
    baseProductValue = "",
    baseProductRegexpMatch = "",
    baseProductRegexpReplace = ""
  ): void => {
    if (
      !hasRule(
        group,
        criteria,
        operator,
        value,
        valueCriteria,
        baseProductValue,
        baseProductRegexpMatch,
        baseProductRegexpReplace
      )
    ) {
      if (state.value[group]) {
        state.value[group].push({
          criteria,
          operator,
          value,
          valueCriteria,
          baseProductValue,
          baseProductRegexpMatch,
          baseProductRegexpReplace,
        });
      } else {
        state.value[group] = [
          {
            criteria,
            operator,
            value,
            valueCriteria,
            baseProductValue,
            baseProductRegexpMatch,
            baseProductRegexpReplace,
          },
        ];
      }
    }
  };

  const setOnlyRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = "",
    baseProductValue = "",
    baseProductRegexpMatch = "",
    baseProductRegexpReplace = ""
  ): void => {
    state.value[group] = [
      {
        criteria,
        operator,
        value,
        valueCriteria,
        baseProductValue,
        baseProductRegexpMatch,
        baseProductRegexpReplace,
      },
    ];
  };

  const removeRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = "",
    baseProductValue = "",
    baseProductRegexpMatch = "",
    baseProductRegexpReplace = ""
  ): void => {
    if (
      !hasRule(
        group,
        criteria,
        operator,
        value,
        valueCriteria,
        baseProductValue,
        baseProductRegexpMatch,
        baseProductRegexpReplace
      )
    ) {
      return;
    }
    const index = state.value[group].findIndex(
      (rule) =>
        rule.criteria === criteria &&
        rule.operator === operator &&
        rule.value === value &&
        rule.valueCriteria === valueCriteria &&
        rule.baseProductValue === baseProductValue &&
        rule.baseProductRegexpMatch === baseProductRegexpMatch &&
        rule.baseProductRegexpReplace === baseProductRegexpReplace
    );
    if (index > -1) {
      state.value[group].splice(index, 1);
    }
  };

  const removeAllRules = (group: string): void => {
    state.value[group] = [];
  };

  const reset = () => {
    state.value = initState();
  };

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
