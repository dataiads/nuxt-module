import { AsyncData, UseFetchOptions } from "#app";
import { Ref, ComputedRef } from "vue";
import { FetchError } from "ofetch";
import { Variations } from "~~/components/variation-layout.vue";

declare global {
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

  export interface DidomiConfig {
    id: string;
  }

  export interface MenuItem {
    text: string
    href?: string
    color?: string
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

  // Add available LPO Config fields here.
  export interface LPOConfig {
    mirroredDomainOverride?: string;
    locale?: string;
    variation?: Variations;

    banners?: Banner[];
    bannerBackground?: string;
    bannerColor?: string;

    breadcrumbs: Record<string, Array<Record<string, string>>>;
    carousel: Record<string, Array<Record<string, string>>>;

    gtm?: GtmConfig;
    onetrust?: OnetrustConfig;
    didomi?: DidomiConfig;
    messages?: Record<string, Record<string, any>>
    menu?: MenuItem[];
    subMenu?: MenuItem[];
    footerColumns?: FooterColumn[];
    footerItems?: MenuItem[];
    crossSellData?: CrossSellData;

    useLightMainProduct?: boolean;
    customerSpecific?: Record<string, JSONValue>
    cssVariables?: Record<string, string>;

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
    hasRule: (group: string, criteria: string, operator: string, value: string) => boolean;
    getFirstRuleValue: (group: string) => string | null;
    pushRule: (group: string, criteria: string, operator: string, value: string) => void;
    setOnlyRule: (group: string, criteria: string, operator: string, value: string) => void;
    removeRule: (group: string, criteria: string, operator: string, value: string) => void;
    removeAllRules: (group: string) => void;
    fetchCriteriaValues: (criteria: string) => AsyncData<Record<string, number>, FetchError<any> | null>;
  }

  export interface InitialFilterRule extends FilterRule {
    group: string;
  }

  export interface FilterRule {
    criteria: string;
    operator: string;
    value: string;
  }
}

// a json serializable type
type JSONValue =
    | string
    | number
    | boolean
    | { [x: string]: JSONValue }
    | Array<JSONValue>;