import { AsyncData, UseFetchOptions } from "#app";
import { Ref, ComputedRef } from "vue";
import { FetchError } from "ofetch";
import { Variations } from "~~/components/variation-layout.vue";

declare global {
  export interface InlineLPOConfig {
    name: string,
    isDefault: string,
    PublishUp: Date | null,
    PublishDown: Date | null,
    fields: InlineLPOConfigField[],
  }

  export interface InlineLPOConfigField {
    name: keyof LPOConfig,
    type: string,
    value: string,
    active: boolean,
    updatedAt: Date
  }

  export interface Window { __LPO_CONFIG__: Partial<InlineLPOConfig> | undefined; }
  export interface ProductDataPrice {
    currency: string;
    value: string;
  }

  export interface CustomAttribute {
    name: string;
    value: string;
  }

  export interface ProductData {
    title: string;
    additionalImageLinks: string[];
    ageGroup: string;
    availability: string;
    brand: string;
    channel: string;
    color: string;
    condition: string;
    contentLanguage: string;
    description: string;
    gender: string;
    id: string;
    identifierExists: boolean;
    imageLink: string;
    itemGroupId: string;
    kind: string;
    link: string;
    mpn: string;
    offerId: string;
    pattern: string;
    price: ProductDataPrice;
    salePrice: ProductDataPrice;
    costOfGoodsSold: ProductDataPrice;
    productTypes: string[];
    sizeSystem: string;
    sizes: string[];
    source: string;
    targetCountry: string;
    customAttributes: CustomAttribute[];
    customLabel0: string;
    customLabel1: string;
    customLabel2: string;
    customLabel3: string;
    customLabel4: string;
    shipping: Shipping[];
  }

  export interface Shipping {
    country: string;
    price: ProductDataPrice;
  }

  export interface Product {
    accountId: string;
    createdAt: string;
    data: ProductData;
    extraData: ProductData;
    id: string;
    segmentId: number;
    status: string;
    syncId: number;
    updatedAt: string;
    uri: string;
    fragment: string;
  }

  export interface ServerConfig {
    domain: string;
    mirroredDomain: string;
  }

  export interface AssocString {
    [key: string]: string;
  }

  export interface PageData {
    product: Product;
    config: ServerConfig;
    collectorData: AssocString;
  }

  export interface Order {
    by: string; // the column to order by
    d?: string; // The direction to dfilter in (default asc)
  }

  export interface Store {
    id: string;
    city: string;
  }

  type StoreData = Map<string, Store>;

  export interface LocalInventory {
    data: LocalInventoryData;
    createdAt: string;
    id: string;
    storeCode: string;
    updatedAt: string;
  }

  export interface LocalInventoryData {
    storeCode: string;
    price: ProductDataPrice;
    salePrice: ProductDataPrice;
    salePriceEffectiveDate: string;
    availability: string;
    quantity: number;
    pickupMethod: string;
    pickupSla: string;
    instoreProductLocation: string;
    customAttributes: CustomAttribute[];
  }

  export interface Breadcrumb {
    text: string;
    href: string;
  }

  export interface Banner {
    text: string;
    class?: string;
    href?: string;
  }

  export interface GtmConfig {
    id: string | string[];
  }

  export interface OnetrustConfig {
    dataDomainScript: string | null;
  }

  export interface AxeptioConfig {
    clientId: string | null;
  }

  export interface DidomiConfig {
    id: string | null;
  }

  export interface MenuItem {
    text: string
    href?: string
    color?: string
    imageLink: string
  }

  export interface FooterColumn {
    title: string
    items: FooterColumnItem[]
  }

  export interface FooterColumnItem {
    text: string
    href?: string
  }

  export type CrossSellData = Record<string, CrossSellItem[]>

  export interface CrossSellItem {
    text: string
    link: string
    image?: string
  }

  export interface GoogleFont {
    family: string;
    weights: string[];
  }

  export interface CustomScripts {
    location: "appendHead" | "prependHead" | "appendBody" | "prependBody";
    content: string;
    defer: boolean;
    async: boolean;
    src: string;
  }

  // Add available LPO Config fields here.
  export interface LPOConfig {
    mirroredDomainOverride?: string;
    locale?: string;
    variation?: Variations;
    banners?: Banner[];
    bannerBackground?: string;
    bannerColor?: string;
    gtm?: GtmConfig;
    onetrust?: OnetrustConfig;
    axeptio?: AxeptioConfig;
    didomi?: DidomiConfig;
    messages?: Record<string, Record<string, any>>
    numberFormats?: Record<string, Record<string, Record<string, string>>>
    menu?: MenuItem[];
    subMenu?: MenuItem[];
    footerColumns?: FooterColumn[];
    footerItems?: MenuItem[];
    crossSellData?: CrossSellData;
    useLightMainProduct?: boolean;
    customerSpecific?: Record<string, JSONValue>
    cssVariables?: Record<string, string>;
    extraReco?: boolean;
    colorData?: Record<string, string>;
    mainRecoParams: FilterParams;
    sliderRecoParams: FilterParams;
    searchRecoParams: FilterParams;
    accessibilityVariant?: {
      text: string;
    };
    customScripts?: CustomScripts[];
    productHook?: string;

    // Non-standard fields, do not use !
    breadcrumbs: Record<string, Array<Record<string, string>>>;
    carousel: Record<string, Array<Record<string, string>>>;
  }

  export interface FilterParams {
    filterRules?: FilterRule[][]
    sortRules?: FilterRule[][]
    sort?: string
    limit?: number
    deduplicate?: string
  }

  export interface UseFilterOptions {
    // product to get recommendations for
    productId: string;

    // base recommendation rules for all queries
    baseRules?: FilterRule[][];

    // initial rules to add to the state
    initialRules?: InitialFilterRule[];

    // optional extra query parameters for recommendation endpoint
    fetchQuery?: Record<string, string | number>;

    // optional options for useFetch composable
    fetchOptions?: UseFetchOptions<Product[]>;

    // default page size (can be updated dynamically using Filter.limit property)
    defaultLimit?: number;

    // an optional grouping function to return groups of products instead of individual items
    grouper?: (d: Product) => string;

    // an optional local sorting function
    groupSorter?: (groupA: Product[], groupB: Product[]) => number;

    // paginate locally instead of server side. pagination is still controlled using Filter.limit and Filter.page
    localPagination?: boolean;
  }

  export interface FilterResults {
    data: ComputedRef<any | null>;
    pending: Ref<boolean>;
    refresh: (opts?: any) => Promise<void>;
    execute: (opts?: any) => Promise<void>;
    error: Ref<FetchError<any> | null>;
  }

  export interface Filter {
    results: FilterResults;
    count: Ref<number>;
    limit: Ref<number>;
    page: Ref<number>;
    sort: Ref<string>;
    hasRule: (group: string, criteria: string, operator: string, value: string, valueCriteria?: string, baseProductValue?: string) => boolean;
    getFirstRuleValue: (group: string) => string | null;
    pushRule: (group: string, criteria: string, operator: string, value: string, valueCriteria?: string, baseProductValue?: string) => void;
    setOnlyRule: (group: string, criteria: string, operator: string, value: string, valueCriteria?: string, baseProductValue?: string) => void;
    removeRule: (group: string, criteria: string, operator: string, value: string, valueCriteria?: string, baseProductValue?: string) => void;
    removeAllRules: (group: string) => void;
    fetchCriteriaValues: (criteria: string) => AsyncData<Record<string, number>, FetchError<any> | null>;
    reset: () => void;
  }

  export interface InitialFilterRule extends FilterRule {
    group: string;
  }

  export interface FilterRule {
    criteria: string;
    operator: string;
    value: string;
    valueCriteria?: string;
    baseProductValue?: string;
  }

  export interface Region {
    displayName: string
    merchantId: string
    postalCodeArea: PostalCodeArea
    regionId: string
    regionalInventoryEligible: boolean
    shippingEligible: boolean
  }

  export interface PostalCodeArea {
    postalCodes: PostalCode[]
    regionCode: string
  }

  export interface PostalCode {
    begin: string
  }

}

// a json serializable type
type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;
