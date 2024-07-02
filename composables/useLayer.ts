export const useLayer = () => {
  const layoutConfig = useLpoConfig().customLayout
  const customLayout = useCustomLayout()
  const product = useProduct()
  const config = computed(() => layoutConfig.layer)

  setTimeout(() => customLayout!.showOverlay.value = true, config.value.delay)

  // get product suggestions
  const recommender = useStructuredRecommender({
    productId: product.value.id,
    baseRules: config.value.algo.filterRules,
    sortRules: config.value.algo.sortRules,
    deduplicate: config.value.algo.deduplicate,
    defaultLimit: config.value.algo.limit,
    defaultSort: config.value.algo.sort
  })

  const items = computed(() => recommender.results.data.value as Product[][])
  const displayLayer = computed(() => config.value.enabled && items.value)

  const onScroll = () => {
    if (config.value.hideOnScroll) {
      customLayout.showOverlay.value = false
    }
  }

  return {
    customLayout,
    config,
    displayLayer,
    items,
    onScroll
  }
}