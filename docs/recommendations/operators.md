---
nav_order: 1
parent: Reco
---

# Operators

Operators are used in filters as a means of comparing the criteria with the value.

These are often similar to typical booolean comparison operators.


## Range

`RANGE`: Targets a range of values.

It is a numeric operator, meaning it only works with numeric criteria and values.

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

## Numeric

- `EQUAL`
- `NOT_EQUAL`
- `GREATER`
- `GREATER_OR_EQUAL`
- `LOWER_OR_EQUAL`

## Non-numeric

All of these operators are case-sensitive.
You can add the suffix `_CI` to make them case insensitive.

For example `EQUAL_CI` the value `HelLo TheRe` will match `Hello There`.

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

## Special

- `TRUE`: Always returns true, used with the `random` crtieria.