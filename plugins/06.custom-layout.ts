// @ts-ignore
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const product = useProduct()

  const lpoConfig = useLpoConfig()
  const layoutConfig = lpoConfig?.customLayout

  if (lpoConfig?.variation !== 'custom-layout' || !layoutConfig) {
    return {}
  }

  // setup main recommender
  const filter = useStructuredRecommender({
    productId: product.value.id,
    baseRules: layoutConfig.mainReco.algo.filterRules,
    sortRules: layoutConfig.mainReco.algo.sortRules,
    deduplicate: layoutConfig.mainReco.algo.deduplicate,
    defaultLimit: layoutConfig.mainReco.algo.limit,
    defaultSort: layoutConfig.mainReco.algo.sort,
    criteriaValues: getAutolistCriteriaFromFiltersParams(layoutConfig.mainReco.filterParams),
    initialRules: await getInitialRulesFromFiltersParams(product.value, layoutConfig.mainReco.filterParams),
    disableInteractions: layoutConfig.mainReco.filterParamsDisableInteractions,
  })

  // setup filter slideover
  const showFiltersSlideover = ref(false)
  const toggleFiltersSlideover = () => showFiltersSlideover.value = !showFiltersSlideover.value

  // setup overlay
  const showOverlay = ref(false)
  const toggleOverlay = () => showOverlay.value = !showOverlay.value

  return {
    provide: {
      customLayout: {
        filter,
        showFiltersSlideover,
        toggleFiltersSlideover,
        showOverlay,
        toggleOverlay
      }
    }
  }
})

export const getAutolistCriteriaFromFiltersParams = (filterParams: FilterElement[]): string[] => {
  /* List all autolist-checkbox criteria in a filter params configuration. Also include range elements for min / max values
   */
  return filterParams.reduce(
    (acc, item) => {
      for (const el of item.elements) {
        if (
          (el.component === 'autolist-checkbox' || ((el.component === 'double-range' || el.component === 'range') && el.props.autoMinMax)) &&
          el.props.criteria &&
          acc.indexOf(el.props.criteria) < 0
        ) {
          acc.push(el.props.criteria)
        }
      }
      return acc
    },
    [] as string[]
  )
}

export const getInitialRulesFromFiltersParams = async (product: Product, filterParams: FilterElement[]): Promise<InitialFilterRule[]> => {
  /* use filters params prechecked attributes to build a recommender initialFilterRules array
   * requires an api call to resolve criteria into actual values
   */

  const withCriteriaValues: { group: string, criteria: string, operator: string }[] = []

  // lookup autolist checkboxes with precheck option toggled
  for (const [groupIndex, group] of filterParams.entries()) {
    for (const [elementIndex, el] of group.elements.entries()) {
      if (el.component === 'autolist-checkbox' && el.props.prechecked) {
        withCriteriaValues.push({
          group: `auto-${groupIndex}-${elementIndex}`,  // name convention is reused in ~/components/filters/container.vue
          criteria: el.props.criteria,
          operator: el.props.operator
        })
      }
    }
  }

  // avoid api call unless necessary
  if (!withCriteriaValues.length) {
    return []
  }

  try {
    // resolve criteria values using api
    const values = await $fetch<Record<string, string>>(`/api/products/${encodeURIComponent(product.id)}/criteria-values`, {
      params: {
        criteria: JSON.stringify(withCriteriaValues.map(item => item.criteria))
      }
    })

    // build and return initial filter rules. Remove missing values
    return withCriteriaValues
      .map(item => ({
        group: item.group,
        criteria: item.criteria,
        operator: item.operator,
        value: values[item.criteria]
      }))
      .filter(item => item.value)

  } catch (e) {
    console.debug('filter initial rules error', e)
    return []
  }
}