
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

interface Filter {
  results: AsyncData<Product[], FetchError<any> | null>;
  count: AsyncData<number, FetchError<any> | null>;
  limit: Ref<number>;
  page: Ref<number>;
  sort: Ref<string>;
  hasRule: (group: string, criteria: string, operator: string, value: string) => boolean;
  getFirstRuleValue: (group: string) => string | null;
  pushRule: (group: string, criteria: string, operator: string, value: string) => void;
  setOnlyRule: (group: string, criteria: string, operator: string, value: string) => void;
  removeRule: (group: string, criteria: string, operator: string, value: string) => void;
  removeAllRules: (group: string) => void;
  fetchCriteriaValues: (criteria: string) => AsyncData<Record<string, number>, FetchError<any> | null>;
}

interface FilterRule {
  criteria: string,
  operator: string,
  value: string,
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

interface LPOConfig {
  name: string,
  isDefault: string,
  PublishUp: Date | null,
  PublishDown: Date | null,
  fields: LPOConfigField[],
  has: function(string): boolean
  get: function(string, any): any
}

interface LPOConfigField {
  name: string,
  type: string,
  value: string,
  active: boolean,
  updatedAt: Date
}