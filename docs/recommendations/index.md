---
nav_order: 4
title: Reco
has_children: true
---

# Recommendations

## Description
Reccomendations are a means of getting one or more products from a starting product.

This can be used for the obvious use-case of loading product reccomendations, but also for getting color variants.

## Vocabulary

- `reccomender`: almost always set to `default`, changed to something else in rare cases for custom projects.
- `algorithm`: how to handle getting the reccomendations, whether or not special rules need to be used.
- `limit`: the maximum number of products to get (if using pagination, this is also the pageSize).
- `page`: The page number to offset the limit, starts at 1.
- `filters`: The filters to apply for targeting the products.
  - Filters each have a `criteria`, `operator`, and `value`, these are detailed in the section on filters.
- `sortFilters`: Like filters, except this changes the product order without removing results.
- `sort`: A simpler version, use for basic sorts such as "price decreasing", overriden by `sortFilters`.
- `deduplicate`: Allows deduplication of products based on a criteria.

### Syntax

This is an example without real values, just using the vocabulary above in the right places.

``` vue
const { data: resultProducts } = $fetchProductRecommendations("reccomender", "algorithm", {
  productId: product.value.id,
  limit: limit,
  page: page,
  filters: JSON.stringify(filters),
  sortFilters: JSON.stringify(sortFilters),
  sort: "sort",
  deduplicate: "deduplicate"
});
```

## Example usage

The following loads 10 products that are not the main product's itemGroupId and have the same channel.
It shows products of the same color first, and only gets one product per itemGroupId in order to remove duplicates.
``` vue
const { data: recoSliderProducts } = $fetchProductRecommendations("default", "filtered", {
  productId: product.value.id,
  limit: 10,
  filters: JSON.stringify([
    [
        {
            criteria: "itemGroupId",
            operator: "NOT_EQUAL",
            value: product.value.data.itemGroupId,
        },
    ],
    [
        {
            criteria: "channel",
            operator: "EQUAL",
            value: product.value.data.channel,
        },
    ]
  ]),
  sortFilters: JSON.stringify([
    [
        {
            criteria: "color",
            operator: "EQUAL",
            value: product.value.data.color,
        },
    ]
  ]),
  deduplicate: "itemGroupId",
});
```

## Algorithms

### `filtered`

The simplest algorithm: returns the products based on the provided settings, nothing more, nothing less.

This is a useful algorithm for things like getting color or size variants.

### `randomfill`

This works like `filtered` but always tries to get to the provided `limit`.
If the filters do not find enough products, the last filter in the list is removed, this is done until all products in the limit are reached.

This is a useful algorithm for things like reccomendation blocks and sliders.

## Filters

### Structure

The filters are an array of arrays, with the first level representing and AND and the second an OR.

The example below represents: `(A || B) && C`
``` js
[
    [
        A,
        B
    ],
    [
        C
    ]
]
```

The filter statements are structured as an object containing `criteria`, `operator`, and `value`.
```js
{
    criteria: "title",
    operator: "STARTS_WITH",
    value: "Example"
}
```