// @ts-ignore
import { useState } from '#app'
import type { StructuredRecommender } from '~/types'

/* provide a shortcut to access the main product */
export const useProduct = () => useState<Product>('product')

/* access global collector data */
export const useCollectorData = () => useState<AssocString>('collectorData')

/**
 * provide a shortcut to access the region
 * the region is available when a valid query param "store" is in the url
 * */
export const useRegion = () => useState<Region | null>('region')

/* extract part of a string using a regex with at least one capturing group
 * if multiple capturing groups are present, they will be concatenated
 * returns the whole string if match fails
 */
export const mask = (value: string, regex: RegExp): string => {
  const match = regex.exec(value)
  if (!match || match.length < 1) {
    return value
  }
  return match.slice(1).join('')
}

export const getAttr = (product: Product, attr: string): string | null => {
  // If the attribute is one of the keys in product data :
  if (Object.keys(product.data).includes(attr)) {
    const extVal = product.extraData[attr as keyof ProductData]
    if (extVal) {
      if (typeof extVal === 'object' && 'value' in extVal) {
        return (extVal as ProductDataPrice).value
      }
      if (typeof extVal !== 'object') {
        return '' + extVal
      }
    }
    const val = product.data[attr as keyof ProductData]
    if (val) {
      if (typeof val === 'object' && 'value' in val) {
        return (val as ProductDataPrice).value
      }
      if (typeof val !== 'object') {
        return '' + val
      }
    }
  }

  const extraPtype = product.extraData?.productTypes?.[0]
  const pType = product.data.productTypes?.[0]

  if (attr === 'productType') {
    return extraPtype ?? pType ?? null
  }
  if (attr === 'productType1') {
    // Not a common case, but sometimes products have 2 product types.
    return product.extraData?.productTypes?.[1] ?? product.data.productTypes?.[1] ?? null
  }
  if (attr === 'productTypePart0') {
    return extraPtype?.split(' > ')[0] ?? pType?.split(' > ')[0] ?? null
  }
  if (attr === 'productTypePart1') {
    return extraPtype?.split(' > ')[1] ?? pType?.split(' > ')[1] ?? null
  }
  if (attr === 'productTypePart2') {
    return extraPtype?.split(' > ')[2] ?? pType?.split(' > ')[2] ?? null
  }

  return getCustomAttr(product, attr)
}

// get a product customAttribute value by its name.
// extraData will take precedence over regular data
export const getCustomAttr = (product: Product, attr: string): string | null => {
  if (product?.extraData?.customAttributes) {
    const match = product.extraData.customAttributes.find((i) => i.name == attr)
    if (match != undefined) {
      return match.value
    }
  }
  if (product?.data?.customAttributes) {
    const match = product.data.customAttributes.find((i) => i.name == attr)
    if (match != undefined) {
      return match.value
    }
  }
  return null
}

// check if a product has a customAttribute value by its name.
// extraData will take precedence over regular data
export const hasCustomAttr = (product: Product, attr: string): boolean => {
  if (product?.extraData?.customAttributes) {
    const match = product.extraData.customAttributes.find((i) => i.name == attr)
    if (match != undefined) {
      return true
    }
  }
  if (product?.data?.customAttributes) {
    const match = product.data.customAttributes.find((i) => i.name == attr)
    if (match != undefined) {
      return true
    }
  }
  return false
}

// same as getCustomAttr but casts the returned value to an integer.
// if parsing fails, returns null
export const getCustomAttrInt = (product: Product, attr: string): number | null => {
  const strVal = getCustomAttr(product, attr)
  if (strVal) {
    try {
      return parseInt(strVal, 10)
    } catch (e) {
      // Fail quietly
    }
  }
  return null
}

// same as getCustomAttr but casts the returned value to a float.
// if parsing fails, returns null
export const getCustomAttrFloat = (product: Product, attr: string): number | null => {
  const strVal = getCustomAttr(product, attr)
  if (strVal) {
    try {
      return parseFloat(strVal.replace(',', '.'))
    } catch (e) {
      // Fail quietly
    }
  }
  return null
}

// same as getCustomAttr but loads the returned value with JSON.parse().
// a default value must be provided to match the expected return type
// if parsing fails, returns the default value
export const getCustomAttrJSON = <Type>(product: Product, attr: string, def: Type): Type => {
  const strVal = getCustomAttr(product, attr)
  if (strVal) {
    try {
      return JSON.parse(strVal)
    } catch (e) {
      // Fail quietly
    }
  }
  return def
}

// returns the percentage of difference between a product sale price and its regular price
// defaults to zero when any of the values is missing or cannot be parsed
export const salePriceDifference = (product: Product): number => {
  if (product.data?.price?.value && product.data?.salePrice?.value) {
    try {
      const price = parseFloat(product.data.price.value)
      const salePrice = parseFloat(product.data.salePrice.value)
      const diff = (100 * (price - salePrice)) / price
      return diff > 0 ? Math.round(diff) : 0
    } catch (e) {
      // Fail quietly
    }
  }

  return 0
}

/**
 * returns the item part after splitting the string at `splitAt`
 * */
export const itemPart = (str: string | undefined, splitAt: string, index: number) => {
  return str?.split(splitAt)[index]
}

// returns a unified list removing duplicates based on a keygen function
export const uniqBy = <T, K>(it: T[], keyFunc: (_: T) => K): T[] => {
  const uniq = new Set<K>()
  return it.filter((item) => {
    const key = keyFunc(item)
    if (uniq.has(key)) {
      return false
    }
    uniq.add(key)
    return true
  })
}

// redirects to the targeted url
export const redirect = (url: string) => window.location.replace(url)


// Show the loader overlay, used for the user to wait
export const showLoader = (message?: string): void => {
  const redirecting = useState<boolean>('redirect.redirecting')
  const redirectMessage = useState<string>('redirect.message')
  redirectMessage.value = message ?? ''
  redirecting.value = true
}

// For pagination, decrement current page index
export const previousPaginationHandler = (filter: StructuredRecommender, _pageCount: number) => {
  if (filter.page.value > 1) {
    filter.page.value -= 1
  }
}

// For pagination, increment page index
export const nextPaginationHandler = (filter: StructuredRecommender, pageCount: number) => {
  if (filter.page.value < pageCount) {
    filter.page.value += 1
  }
}

// For pagination, go to first page
export const firstPaginationHandler = (filter: StructuredRecommender, _pageCount: number) => {
  filter.page.value = 1
}

// For pagination, increment page index
export const lastPaginationHandler = (filter: StructuredRecommender, pageCount: number) => {
  filter.page.value = pageCount
}

// Used for "one page" pagination (a "load more" button)
export const loadMorePaginationHandler = (filter: StructuredRecommender, nb: number) => {
  filter.limit.value += nb
}

export const layoutProps = {
  recoSliderProducts: { type: Array as PropType<Product[]>, required: false, default: () => [] },
  filter: { type: Object as PropType<StructuredRecommender>, required: true, default: () => ({}) },
  slider: { type: Object as PropType<StructuredRecommender>, required: false },
  extraProducts: { type: Array as PropType<Product[]>, required: false }
}
