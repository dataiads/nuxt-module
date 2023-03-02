import { Variations } from "~~/components/variation-layout.vue";

interface ProductDataPrice {
  currency: string,
  value: string,
}

interface CustomAttribute {
  name: string,
  value: string,
}

interface ProductData {
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

interface Shipping {
  country: string,
  price: ProductDataPrice,
}

interface Product {
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

interface ServerConfig {
  domain: string,
  mirroredDomain: string,
}

interface AssocString { [key: string]: string }

interface PageData {
  product: Product,
  config: ServerConfig,
  collectorData: AssocString
}

interface Order {
  by: string, // the column to order by
  d?: string // The direction to dfilter in (default asc)
}

interface Store {
  id: string,
  city: string,
}

type StoreData = Map<string, Store>

interface LocalInventory {
  data: LocalInventoryData,
  createdAt: string,
  id: string,
  storeCode: string,
  updatedAt: string,
}

interface LocalInventoryData {
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

interface Breadcrumb {
  text: string,
  href: string,
}

// Add available LPO Config fields here.
interface LPOConfig {
  locale: string,
  variation?: Variations
}


declare module '@nuxt/types/config/runtime/public' {
  interface NuxtRuntimeConfig {
    devLpoConfig: LPOConfig
  }
}