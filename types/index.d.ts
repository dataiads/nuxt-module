import { Variations } from "~~/components/variation-layout.vue";

export interface ProductDataPrice {
  currency: string,
  value: string,
}

export interface CustomAttribute {
  name: string,
  value: string,
}

export interface ProductData {
  title: string,
  additionalImageLinks: string[],
  ageGroup: string,
  availability: string,
  brand: string,
  channel: string,
  color: string,
  condition: string,
  contentLanguage: string,
  description: string,
  gender: string,
  id: string,
  identifierExists: boolean,
  imageLink: string,
  itemGroupId: string,
  kind: string,
  link: string,
  mpn: string,
  offerId: string,
  price: ProductDataPrice,
  salePrice: ProductDataPrice,
  productTypes: string[],
  sizeSystem: string,
  sizes: string[],
  source: string,
  targetCountry: string,
  customAttributes: CustomAttribute[],
  customLabel0: string,
  customLabel1: string,
  customLabel2: string,
  customLabel3: string,
  customLabel4: string,
  shipping: Shipping[],
}

export interface Shipping {
  country: string,
  price: ProductDataPrice,
}

export interface Product {
  createdAt: string,
  data: ProductData,
  extraData: ProductData,
  id: string,
  segmentId: number,
  status: string,
  syncId: number,
  updatedAt: string
  uri: string,
  fragment: string,
}

export interface ServerConfig {
  domain: string,
  mirroredDomain: string,
}

export interface AssocString { [key: string]: string }

export interface PageData {
  product: Product,
  config: ServerConfig,
  collectorData: AssocString
}

export interface Order {
  by: string, // the column to order by
  d?: string // The direction to dfilter in (default asc)
}

export interface Store {
  id: string,
  city: string,
}

type StoreData = Map<string, Store>

export interface LocalInventory {
  data: LocalInventoryData,
  createdAt: string,
  id: string,
  storeCode: string,
  updatedAt: string,
}

export interface LocalInventoryData {
  storeCode: string,
  price: ProductDataPrice,
  salePrice: ProductDataPrice,
  salePriceEffectiveDate: string,
  availability: string,
  quantity: number,
  pickupMethod: string,
  pickupSla: string,
  instoreProductLocation: string,
  customAttributes: CustomAttribute[],
}

export interface Breadcrumb {
  text: string,
  href: string,
}

export interface Banner {
  text: string
  class?: string
  href?: string
}

export interface GtmConfig {
  ids: string | string[]
}

export interface OnetrustConfig {
  dataDomainScript: string | null
}

// Add available LPO Config fields here.
export interface LPOConfig {
  locale: string,
  variation?: Variations
  banners?: Banner[]
  gtm?: GtmConfig
  onetrust?: OnetrustConfig
}


declare module '@nuxt/types/config/runtime/public' {
  interface NuxtRuntimeConfig {
    devLpoConfig: LPOConfig
  }
}