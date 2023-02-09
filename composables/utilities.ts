
// @ts-ignore
import { useState, useRuntimeConfig } from "#app";

/* provide a shortcut to access the main product */
export const useProduct = () => useState<Product>("product")


/* access global collector data */
export const useCollectorData = () => useState<AssocString>("collectorData")


/* extract part of a string using a regex with at least one capturing group
 * if multiple capturing groups are present, they will be concatenated
 * returns the whole string if match fails
 */
export const mask = (value:string, regex: RegExp): string => {
    const match = regex.exec(value)
    if (!match || match.length < 1) {
        return value
    }
    return match.slice(1).join('')
}

// get a product customAttribute value by its name.
// extraData will take precedence over regular data
export const getCustomAttr = (product: Product, attr: string): string|null => { 
    if (product?.extraData?.customAttributes) {
        const match = product.extraData.customAttributes.find(i => i.name == attr)
        if (match != undefined) {
            return match.value
        }
    }
    if (product?.data?.customAttributes) {
        const match = product.data.customAttributes.find(i => i.name == attr)
        if (match != undefined) {
            return match.value
        }
    }
    return null
}

// same as getCustomAttr but casts the returned value to an integer.
// if parsing fails, returns null
export const getCustomAttrInt = (product: Product, attr: string): number|null => { 
    let strVal = getCustomAttr(product, attr)
    if (strVal) {
        try {
            return parseInt(strVal, 10)
        } catch(e) {}
    }
    return null
}

// same as getCustomAttr but casts the returned value to a float.
// if parsing fails, returns null
export const getCustomAttrFloat = (product: Product, attr: string): number|null => { 
    let strVal = getCustomAttr(product, attr)
    if (strVal) {
        try {
            return parseFloat(strVal)
        } catch(e) {}
    }
    return null
}

// same as getCustomAttr but loads the returned value with JSON.parse().
// a default value must be provided to match the expected return type
// if parsing fails, returns the default value
export const getCustomAttrJSON = <Type>(product: Product, attr: string, def: Type): Type => { 
    let strVal = getCustomAttr(product, attr)
    if (strVal) {
        try {
            return JSON.parse(strVal)
        } catch(e) {}
    }
    return def
}

// returns the percentage of difference between a product sale price and its regular price
// defaults to zero when any of the values is missing or cannot be parsed
export const salePriceDifference = (product: Product): number => {
    if (product.data?.price?.value && product.data?.salePrice?.value) {
        try {
            let price = parseFloat(product.data.price.value)
            let salePrice = parseFloat(product.data.salePrice.value)
            let diff = 100 * (price - salePrice) / price
            return diff > 0 ? Math.round(diff) : 0
        } catch (e) {}
    }

    return 0;
}