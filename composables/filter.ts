import { ComputedRef, Ref } from "vue"

export const useFilter = (productId: string, baseRules: FilterRule[][], defaultLimit: number = 12, query?: Record<string, string | number>) => {
    // main rules state. do not edit directly use functions below instead
    const state = ref<Record<string, FilterRule[]>>({})

    // default rules for all listing calls can be applied on initialization
    if (!baseRules) {
        baseRules = []
    }
    
    // watchable configuration for recommendation request.
    // can be manipulated directly and fetcher will update automatically
    const sort = ref<string>("")
    const limit = ref<number>(defaultLimit)
    const page = ref<number>(1)

    // current filters computed property
    const currentFilters = computed(() => JSON.stringify(Object.values(state.value).concat(baseRules).filter(group => group.length > 0)))

    // main fetcher that returns an auto updating list of products to display
    let params: Record<string, string | number | Ref<string> | Ref<number> | Ref<boolean> | ComputedRef<string> | ComputedRef<number> | ComputedRef<boolean>> = {
        productId,
        limit,
        page,
        sort: computed(() => sort.value.startsWith('-') ? sort.value.substring(1) : sort.value),
        sortDesc: computed(() => sort.value.startsWith('-')),
        filters: currentFilters,
    }

    if (query) {
        for (const [key, value] of Object.entries(query)) {
            params[key] = value
        }
    }

    const fetcher = useFetch(() => "/api/recommendations/default/filtered", { params: params });

    // issue side request to get total items count
    const countFetcher = useFetch(() => "/api/recommendations/default/count-filtered", {
        params: {
            productId,
            filters: currentFilters,
        }
    })

    // secondary fetchers for criteria values (used in AutoListingCheckbox)
    // cached manually to avoid concurrent calls on app startup
    // (useFetch has set its own cache only after the first response)
    let criteriaValuesCache: Record<string, any> = {}

    const fetchCriteriaValues = (criteria: string) => {
        if (!criteriaValuesCache[criteria]) {
            criteriaValuesCache[criteria] = useFetch<Record<string, number>>(
                "/api/recommendations/default/count-property",
                {
                    params: {
                    property: criteria,
                    filters: JSON.stringify(baseRules)
                    },
                }
            )
        }
        return criteriaValuesCache[criteria]
    }

    // internal. initialize group rules.
    const initializeGroup = (group: string): void => {
        if (!state.value[group]) {
            state.value[group] = [];
        }
    }

    // all functions below allow state manipulation
    const hasRule = (group: string, criteria: string, operator: string, value: string): boolean => {
        initializeGroup(group)
        return !!state.value[group].find(rule => (
            rule.criteria === criteria &&
            rule.operator === operator &&
            rule.value === value
        ))
    }

    const getFirstRuleValue = (group: string): string|null => {
        initializeGroup(group)
        if (state.value[group].length > 0) {
            return state.value[group][0].value
        }
        return null
    }

    const pushRule = (group: string, criteria: string, operator: string, value: string): void => {
        initializeGroup(group)
        if (!hasRule(group, criteria, operator, value)) {
            state.value[group].push({criteria, operator, value})
        }
    }

    const setOnlyRule = (group: string, criteria: string, operator: string, value: string): void => {
        initializeGroup(group)
        removeAllRules(group)
        pushRule(group, criteria, operator, value.toString())
    }

    const removeRule = (group: string, criteria: string, operator: string, value: string): void => {
        initializeGroup(group)
        const index = state.value[group].findIndex(rule => (
            rule.criteria === criteria &&
            rule.operator === operator &&
            rule.value === value
        ))
        if (index > -1) {
            state.value[group].splice(index, 1)
        }
    }

    const removeAllRules = (group: string): void => {
        initializeGroup(group)
        state.value[group].splice(0, state.value[group].length)
    }

    return {
        results: fetcher,
        count: countFetcher,
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
    } as Filter
}
