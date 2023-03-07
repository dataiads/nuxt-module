# 1.Composables

Composables are functions or variables that can be accessed from anywhere in the application.


## `useLpoConfig`
In production: loads the config provided by the backend.
In dev: loads the config found in `runtimeConfig.public.devLPOConfig`.

## `useProduct`
A shortcut to access the main product data stored inside a global state.
Data is automatically fetched on application startup.

This is reactive in both ways, meaning you can change the main product by setting this, the page will automatically update.

This can be useful for things like selecting variants and not having to worry about updating the price of the "in stock" info.

Usage:
``` typescript
const product = useProduct()

// This function can for example be called when toggling between sizes.
const changeVariant((variant: Product) => product.value = variant)
```
Note: Variant is a product object.


## `useCollectorData`
A shortcut to access the global collector data stored inside a global state. data is automatically fetched on application startup.

## `getCustomAttr`
Access product custom attributes.

There are 4 variants of this function which return different types.
- `getCustomAttr`: returns the value as a `string`.
- `getCustomAttrInt`: returns the value as a whole `number`.
- `getCustomAttrFloat`: returns the value as a floating point `number`.
- `getCustomAttrJSON`: reuturns the parsed JSON of the value.

Usage:
``` typescript
const product = useProduct()

const collectedPromoCode = getCustomAttr(product.value, 'promoCode')

// getCustomAttrJSON allows you to pass a default value.
const defaultMenu = [{
    "title": "Home",
    "link": "/"
}]
const collectedMenu = getCustomAttrJSON(product.value, 'menu', defaultMenu)
```

## `salePriceDifference` 
Get a products regular/sale price difference as a percentage.

## `mask`
A utility function to extract parts of a string using a regular expression.


## `itemPart` 
A utility that splits a string and returns the requested part based on an index
