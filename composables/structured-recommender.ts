import { type ComputedRef, type Ref } from 'vue'
import { type UseStructuredRecommenderOptions, type StructuredFilterResponse, type StructuredRecommender } from '~/types'

type FetchParams = Record<string, string | number | Ref<string> | Ref<number> | Ref<boolean> | ComputedRef<string> | ComputedRef<number> | ComputedRef<boolean>>;

export const useStructuredRecommender = (options: UseStructuredRecommenderOptions) => {
  if (!options.fetchQuery) {
    options.fetchQuery = {}
  }

  const initState = () => {
    const init: Record<string, FilterRule[]> = {}

    // handle initial rules before setting up fetcher
    if (options.initialRules) {
      for (const r of options.initialRules) {
        if (!init[r.group]) {
          init[r.group] = []
        }
        init[r.group].push({
          criteria: r.criteria,
          operator: r.operator,
          value: r.value,
          valueCriteria: r.valueCriteria ?? '',
          baseProductValue: r.baseProductValue ?? '',
          baseProductRegexpMatch: r.baseProductRegexpMatch ?? '',
          baseProductRegexpReplace: r.baseProductRegexpReplace ?? ''
        })
      }
    }
    return init
  }

  // main rules state. do not edit directly use functions below instead
  const state = ref<Record<string, FilterRule[]>>(initState())

  // watchable configuration for recommendation request.
  // can be manipulated directly and fetcher will update automatically
  const sort = ref<string>(options.defaultSort ?? '')
  const limit = ref<number>(options.defaultLimit ?? 12)
  const page = ref<number>(1)

  // cache criteria values to only request a single time
  const criteriaValuesCache: Record<string, Record<string, number>> = reactive({})

  // initial filters state (always active) computed property
  const baseFilters = computed(() => JSON.stringify((options.baseRules || []).filter((group) => group.length > 0)))

  // current filters state (checkboxes) computed property
  const activeFilters = computed(() => JSON.stringify(Object.values(state.value).filter((group) => group.length > 0)))

  const activeFiltersCount = computed(() => Object.values(state.value).filter((group) => group.length > 0).length)

  // main fetcher that returns an auto updating list of products to display
  const fetchParams: FetchParams = {
    productId: options.productId,
    sort: computed(() => (sort.value.startsWith('-') ? sort.value.substring(1) : sort.value)),
    sortDesc: computed(() => sort.value.startsWith('-')),
    filters: baseFilters,
    activeFilters,
    limit,
    page,
    disableInteractions: options.disableInteractions ? "true": "false",
  }

  if (options.sortRules?.length) {
    fetchParams.sortFilters = JSON.stringify(options.sortRules)
  }

  if (options.deduplicate) {
    fetchParams.deduplicate = options.deduplicate
  }

  // should not be used directly but preserved for compatibility
  // (deduplicate and sortFilters were not 1st class params before)
  if (options.fetchQuery) {
    for (const [key, value] of Object.entries(options.fetchQuery)) {
      fetchParams[key] = value
    }
  }
  const options_ = options

  let _fetcher = useAsyncData(async () => {
    return {
      total: 0,
      page: [],
      criteriaValues: {}
    } as StructuredFilterResponse
  })

  if (options.baseRules?.length) {
    // Core fetch is not exposed direcly
    _fetcher = useFetch<StructuredFilterResponse>(() => '/api/recommendations/default/structured-filter', {
      params: fetchParams,
      ...(options.fetchOptions ?? {}),
      onRequest ({ options }) {
        // criteriaValues is injected with hook
        // as we want to update it before every call
        // but we cant use a computed property as it would be watched
        if (options?.params && options_.criteriaValues?.length) {
          options.params.criteriaValues = JSON.stringify((options_.criteriaValues || []).filter((criteria: string) => !options_.cacheCriteriaValues || !criteriaValuesCache[criteria]))
        }
      }
    })
  }

  // Expose result products page as an AsyncData style object
  const fetcher = {
    data: computed(() => {
      if (_fetcher.data.value) {
        return _fetcher.data.value.page
      }
      return _fetcher.data.value
    }),
    pending: _fetcher.pending,
    refresh: _fetcher.refresh,
    execute: _fetcher.execute,
    error: _fetcher.error
  }

  // Expose count as a computed
  const count = computed(() => {
    if (_fetcher.data.value) {
      return _fetcher.data.value.total
    }
    return 0
  })

  // Expose criteria values as an AsyncData style object
  const fetchCriteriaValues = (criteria: string) => {
    return {
      data: computed(() => {
        if (options.cacheCriteriaValues) {
          const cached = criteriaValuesCache[criteria]
          if (cached && Object.keys(cached).length) {
            return cached
          }
        }
        if (_fetcher.data.value) {
          if (_fetcher.data.value.criteriaValues[criteria]) {
            criteriaValuesCache[criteria] = _fetcher.data.value.criteriaValues[criteria]
            return criteriaValuesCache[criteria]
          }
          return {}
        }

        return _fetcher.data.value
      }),
      pending: _fetcher.pending,
      refresh: _fetcher.refresh,
      execute: _fetcher.execute,
      error: _fetcher.error
    }
  }

  // all functions below allow state manipulation
  const hasRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = '',
    baseProductValue = '',
    baseProductRegexpMatch = '',
    baseProductRegexpReplace = ''
  ): boolean => {
    if (!state.value[group]) {
      return false
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
    )
  }

  const getFirstRuleValue = (group: string): string | null => {
    if (state.value[group]?.length > 0) {
      return state.value[group][0].value
    }
    return null
  }

  const pushRule = (group: string, criteria: string, operator: string, value: string, valueCriteria = '', baseProductValue = '', baseProductRegexpMatch = '', baseProductRegexpReplace = ''): void => {
    if (!hasRule(group, criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace)) {
      if (state.value[group]) {
        state.value[group].push({
          criteria,
          operator,
          value,
          valueCriteria,
          baseProductValue,
          baseProductRegexpMatch,
          baseProductRegexpReplace
        })
      } else {
        state.value[group] = [
          {
            criteria,
            operator,
            value,
            valueCriteria,
            baseProductValue,
            baseProductRegexpMatch,
            baseProductRegexpReplace
          }
        ]
      }
    }
  }

  const setOnlyRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = '',
    baseProductValue = '',
    baseProductRegexpMatch = '',
    baseProductRegexpReplace = ''
  ): void => {
    state.value[group] = [
      {
        criteria,
        operator,
        value,
        valueCriteria,
        baseProductValue,
        baseProductRegexpMatch,
        baseProductRegexpReplace
      }
    ]
  }

  const removeRule = (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria = '',
    baseProductValue = '',
    baseProductRegexpMatch = '',
    baseProductRegexpReplace = ''
  ): void => {
    if (!hasRule(group, criteria, operator, value, valueCriteria, baseProductValue, baseProductRegexpMatch, baseProductRegexpReplace)) {
      return
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
    )
    if (index > -1) {
      state.value[group].splice(index, 1)
    }
  }

  const removeAllRules = (group: string): void => {
    state.value[group] = []
  }

  const reset = () => {
    state.value = initState()
  }

  const criteriaValuesMinMax = computed(() => _fetcher.data.value?.criteriaValuesMinMax)

  const loadMore = () => {
    // if limit is already over the count, do nothing
    if (count.value > 0 && limit.value > count.value ) {
      return
    } 

    if (options.defaultLimit) {
      limit.value += options.defaultLimit
    } else {
      // no default limit was provided, fallback to twice the previous limit
      limit.value += limit.value
    }
  }

  return {
    results: fetcher,
    count: count,
    limit,
    sort,
    page,
    activeFiltersCount,
    fetchCriteriaValues,
    hasRule,
    getFirstRuleValue,
    pushRule,
    removeRule,
    setOnlyRule,
    removeAllRules,
    initialRules: options.initialRules,
    criteriaValuesMinMax,
    state: state,
    reset,
    loadMore
  } as StructuredRecommender
}

// Recommender constructors for classic cases
export const useStructuredFilter = (options: Omit<UseStructuredRecommenderOptions, 'configRecoParams'>) => {
  const config = useLpoConfig()?.mainRecoParams
  const opts = { ...options }
  if (config) {
    opts.baseRules = config.filterRules
    opts.sortRules = config.sortRules
    opts.deduplicate = config.deduplicate
    opts.defaultLimit = config.limit
    opts.defaultSort = config.sort
    opts.fetchQuery = { type: 'filter' }
  }

  return useStructuredRecommender(opts)
}

export const useStructuredSlider = (options: Omit<UseStructuredRecommenderOptions, 'configRecoParams'>) => {
  const config = useLpoConfig()?.sliderRecoParams
  const opts = { ...options }
  if (config) {
    opts.baseRules = config.filterRules
    opts.sortRules = config.sortRules
    opts.deduplicate = config.deduplicate
    opts.defaultLimit = config.limit
    opts.defaultSort = config.sort
    opts.fetchQuery = { type: 'slider' }
  }

  return useStructuredRecommender(opts)
}