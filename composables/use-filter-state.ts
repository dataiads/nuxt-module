// ONLY FOR TESTING PURPOSE
const globalComponent = {
  stickyATC: {
    enable: true,
  },
  mainProductLight: true,
  mainReco: {
    enable: true,
    highFilters: true,
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
};

export default () => {
  const product = useProduct()
  return useStructuredRecommender({
    productId: product.value.id,
    baseRules: globalComponent.mainReco.algo.filterRules,
    ...globalComponent.mainReco.algo,
    fetchQuery: { type: "filter" },
  });
}
