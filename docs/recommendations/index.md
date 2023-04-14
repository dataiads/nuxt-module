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

### Criteria

Crtieria are the different fields you can use for searching the products.

They are split into two groups, numeric or not, with different operators available for numeric criteria.

Not all of the fields that can be found in a field are available, this list is the entirity of what you can use with out filter system in its current state.

#### Numeric

- `price`: the product price
- `salePrice`: the product salePrice

In order to sort or filter by products that are on sale, you can do :
``` js
{
    crtieria: "salePrice",
    operator: "GREATER",
    value: 0
}
```

> NOTE: Some product feeds always have a `salePrice` even when there is not a sale.


#### Non-numeric

- `id`: The product id
- `title`
- `brand`
- `color`
- `googleProductCategory`
- `productType`
- `productTypePart0`: the first part of the productType, split on ` > `.
> For a productType that is `shirts > t-shirt > graphic tees`, this would be `shirts`.
- `productTypePart1`: For `shirts > t-shirt > graphic tees`, this would be `t-shirts`.
- `productTypePart2`: For `shirts > t-shirt > graphic tees`, this would be `graphic tees`.
- `gender`
- `ageGroup`
- `gtin`
- `mpn`
- `itemGroupId`: Often used for getting color or size variants.
- `link`
- `offerId`
- `size`: Gets `data.sizes[0]`. At the moment, if there are multiple sizes (very uncommon), there is no way of getting any other than the first.
- `customLabel0`
- `customLabel1`
- `customLabel2`
- `customLabel3`
- `customLabel4`
- `availability`: Often used as a base filter, to only get things in stock.
- `material`
- `accountId`: Used when multiple product feeds are on the same platform, allowing you to only get reccomendations from the same one.
- `targetCountry`: Used when mutliple countries are present on the same feed, to get products in the same language/zone. 
> NOTE: `targetCountry` is DEPRECATED in more recent product feeds, which use `feedLabel`, although targetCountry is backfilled when the feedLabel is a country code. More info [here](https://developers.google.com/shopping-content/guides/products/feed-labels).
- `channel`: Often used to get products from the same channel, avoiding duplicates.
- `uri`
- `random`: Allows targeting a random product.

#### customAttributes

To target a customAttribute, for example named `attributeName`, you can use the following criterias :
`dataCustomAttribute.attributeName`

If this attribute is numeric, you can use `dataCustomAttributeNumeric`.

> WARNING: These fields are not indexed and their usage may impact performance negatively.

#### collected data

To target collectedData, for example named `attributeName`, you can use the following criterias :
`extraDataCustomAttribute.attributeName`

If this attribute is numeric, you can use `extraDataCustomAttributeNumeric`.

For exmaple, you can get products with more than 4/5 stars in the reviews by doing:
```js
{
    criteria: "extraDataCustomAttributeNumeric.review-value",
    operator: "GREATER",
    value: 4
}
```

> WARNING: These fields are not indexed and their usage may impact performance negatively.


### Operators

Operators are used in filters as a means of comparing the criteria with the value.

These are often similar to typical booolean comparison operators.


#### Range (numeric)

- `RANGE`: Targets a range of values.

The `RANGE` operator allows targting values between a min and max, with options to be inclusive or not of the min/max.

The `value` sent in the filter needs to be formatted specifically, as follows: 
`[min:max]`, the direction of the brackets influences whether or not to include the min or max value.

> `[min:max]` Excluses the min/max values.
>
> `]min:max[` Includes the values.
>
> `]min:max]` Includes min, but excluses max.

Min and max are numeric values, for example when filtering between prices :
`]19.99:40]` will get products costing 19.99 and up, but not 40.``

This can be used in collaboration with the product price to only target products that are (for example) 10% over/under the current product's price.

``` js
[
    {
        criteria: "price",
        operator: "RANGE",
        value: `]${(productPrice - (productPrice  * .10))}:${(productPrice + (productPrice  * .10))}[`
    }
]
```

#### Numeric

- `EQUAL`
- `NOT_EQUAL`
- `GREATER`
- `GREATER_OR_EQUAL`
- `LOWER_OR_EQUAL`

#### Non-numeric

All of these operators are case-sensitive.
You can add the suffix `_CI` to make them case insensitive.

Fir example `EQUAL_CI` the the value `HelLo TheRe` will match `Hello There`.

- `EQUAL`: Exact match
- `IN`: Value can be multiple strings, separated by comma, IN will match with an OR statement.
> Searching the title of a product: "foo,bar,baz" will return the products with the names "foo" "bar" and "baz".
- `NOT_EQUAL`
- `NOT_IN`: Value can be multiple strings, separated by comma, NOT_IN will match with an AND statement.
> Searching the title of a product: "foo,bar,baz" will return products that DO NOT have the names "foo" "bar" and "baz".
- `CONTAINS`: Matches a part of the string. For example: "art" will return a product named "Earth".
- `CONTAINS_ANY`: Matches all string containg a comma separated value of strings, matches with OR.
> "foo,bar" will return products named "food" and "barbeque" and "foobar".
- `CONTAINS_ALL`: Matches all string containg a comma separated value of strings, matches with AND.
> "foo,bar" will return products named "foobar".
- `NOT_CONTAINS`
- `NOT_CONTAINS_ANY`
- `NOT_CONTAINS_ALL`
- `STARTS_WITH`: Like contains but matches only at the start of the string.
- `NOT_STARTS_WITH`
- `ENDS_WITH`
- `NOT_ENDS_WITH`
- `REGEX`: Matches all string which match the provided regular expression.
- `NOT_REGEX`

#### Special

- `TRUE`: Always returns true, used with the `random` crtieria.