// ONLY FOR TESTING PURPOSE
const globalComponent = {
  stickyATC: {
    enable: true,
  },
  mainProductLight: true,
  mainReco: {
    enable: true,
    highFilters: true,
    params: {
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
    baseRules: globalComponent.mainReco.params.filterRules,
    ...globalComponent.mainReco.params,
    fetchQuery: { type: "filter" },
  });
}
