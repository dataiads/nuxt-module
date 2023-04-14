---
nav_order: 0
parent: Reco
---

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