import { AsyncData, UseFetchOptions } from '#app'
import { Ref, ComputedRef } from 'vue'
import { FetchError } from 'ofetch'
import { Variations } from '~~/components/variation-layout.vue'
import type { StyleValue } from 'nuxt/dist/app/compat/capi'



declare global {
  export interface InlineLPOConfig {
    name: string;
    isDefault: string;
    PublishUp: Date | null;
    PublishDown: Date | null;
    fields: InlineLPOConfigField[];
  }

  export interface InlineLPOConfigField {
    name: keyof LPOConfig;
    type: string;
    value: string;
    active: boolean;
    updatedAt: Date;
  }

  export interface Window {
    __LPO_CONFIG__: Partial<InlineLPOConfig> | undefined;
    __LPO_MIRRORED_DOMAIN__: string | undefined;
  }

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

  export interface ImageBanner {
    imageLink: string;
    mobileImageLink?: string;
    desktopImageLink?: string;
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
    text: string;
    href?: string;
    color?: string;
    imageLink?: string;
    children: MenuItem[]
  }

  export interface FooterColumn {
    title: string;
    items: FooterColumnItem[];
  }

  export interface FooterColumnItem {
    text: string;
    href?: string;
  }

  export type CrossSellData = Record<string, CrossSellItem[]>;

  export interface CrossSellKey {
    key: string;
    caseInsensitive: boolean;
    regex?: string;
  }

  export interface CrossSellItem {
    text: string;
    link: string;
    image?: string;
  }

  export interface GoogleFont {
    family: string;
    weights: string[];
  }

  export interface CustomScripts {
    location: 'appendHead' | 'prependHead' | 'appendBody' | 'prependBody';
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
    imageBanner?: ImageBanner;
    bannerBackground?: string;
    bannerColor?: string;
    gtm?: GtmConfig;
    onetrust?: OnetrustConfig;
    axeptio?: AxeptioConfig;
    didomi?: DidomiConfig;
    messages?: Record<string, Record<string, any>>;
    numberFormats?: Record<string, Record<string, Record<string, string>>>;
    menu?: MenuItem[];
    subMenu?: MenuItem[];
    footerColumns?: FooterColumn[];
    footerItems?: MenuItem[];
    crossSellData?: CrossSellData;
    crossSellKey?: CrossSellKey;
    useLightMainProduct?: boolean;
    customerSpecific?: Record<string, JSONValue>;
    cssVariables?: Record<string, string>;
    extraReco?: boolean;
    colorData?: Record<string, string>;
    mainRecoParams: FilterParams;
    sliderRecoParams: FilterParams;
    searchRecoParams: FilterParams;
    filterParams: FilterElement[];
    accessibilityVariant?: {
      text: string;
    };
    customScripts?: CustomScripts[];
    productHook?: string;
    customLayout: CustomLayout;

    // Non-standard fields, do not use !
    breadcrumbs: Record<string, Array<Record<string, string>>>;
    carousel: Record<string, Array<Record<string, string>>>;
  }

  export interface FilterElement {
    title: string; // Titre de la section
    elements: {
      component: 'autolist-checkbox' | 'checkbox' | 'range' | 'double-range'; // Le nom du composant
      props: any; // Les props associé à ce composant
    }[];
    style: StyleValue;
  }

  export interface FilterParams {
    filterRules?: FilterRule[][];
    sortRules?: FilterRule[][];
    sort?: string;
    limit?: number;
    deduplicate?: string;
  }

  export interface UseRecommenderOptions {
    // Recommender endpoint to use
    endpoint:
    | 'filtered'
    | 'randomfill'
    | 'filtered-grouped'
    | 'structured-filter';

    // where to get recommendation params from
    configRecoParams?: 'mainRecoParams' | 'sliderRecoParams';

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

    // default page size (can be updated dynamically using Recommender.limit property)
    defaultLimit?: number;

    // default sort field (can be updated dynamically using Recommender.sort property)
    defaultSort?: string;

    // an optional grouping function to return groups of products instead of individual items
    grouper?: (d: Product) => string;

    // an optional local sorting function
    groupSorter?: (groupA: Product[], groupB: Product[]) => number;

    // paginate locally instead of server side. pagination is still controlled using Filter.limit and Filter.page
    localPagination?: boolean;

    structuredResponse?: boolean;

    criteriaValues?: string[];
  }

  export interface RecommenderResults {
    data: ComputedRef<any | null>;
    pending: Ref<boolean>;
    refresh: (opts?: any) => Promise<Product[] | null>;
    execute: (opts?: any) => Promise<Product[] | null>;
    error: Ref<FetchError<any> | null>;
  }

  export interface Recommender {
    results: FilterResults;
    count: Ref<number> | ComputedRef<number>;
    limit: Ref<number>;
    sort: Ref<string>;
    page: Ref<number>;
    hasRule: (
      group: string,
      criteria: string,
      operator: string,
      value: string,
      valueCriteria?: string,
      baseProductValue?: string
    ) => boolean;
    getFirstRuleValue: (group: string) => string | null;
    pushRule: (
      group: string,
      criteria: string,
      operator: string,
      value: string,
      valueCriteria?: string,
      baseProductValue?: string
    ) => void;
    setOnlyRule: (
      group: string,
      criteria: string,
      operator: string,
      value: string,
      valueCriteria?: string,
      baseProductValue?: string
    ) => void;
    removeRule: (
      group: string,
      criteria: string,
      operator: string,
      value: string,
      valueCriteria?: string,
      baseProductValue?: string
    ) => void;
    removeAllRules: (group: string) => void;
    fetchCriteriaValues: (
      criteria: string
    ) => AsyncData<Record<string, number>, FetchError<any> | null>;
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
    baseProductRegexpMatch?: string;
    baseProductRegexpReplace?: string;
  }

  export interface Region {
    displayName: string;
    merchantId: string;
    postalCodeArea: PostalCodeArea;
    regionId: string;
    regionalInventoryEligible: boolean;
    shippingEligible: boolean;
  }

  export interface PostalCodeArea {
    postalCodes: PostalCode[];
    regionCode: string;
  }

  export interface PostalCode {
    begin: string;
  }
}

// a json serializable type
type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export interface UseStructuredRecommenderOptions {
  // where to get recommendation params from
  //configRecoParams?: "mainRecoParams" | "sliderRecoParams";

  // product to get recommendations for
  productId: string;

  // base recommendation rules for all queries
  baseRules?: FilterRule[][];

  // initial rules to add to the state
  initialRules?: InitialFilterRule[];

  // sorting rules
  sortRules?: FilterRule[][];

  // deduplication criteria
  deduplicate?: string;

  // optional extra query parameters for recommendation endpoint
  fetchQuery?: Record<string, string | number>;

  // optional options for useFetch composable
  fetchOptions?: UseFetchOptions<StructuredFilterResponse>;

  // default page size (can be updated dynamically using Recommender.limit property)
  defaultLimit?: number;

  // default sort field (can be updated dynamically using Recommender.sort property)
  defaultSort?: string;

  // list these criteria values along structured filters response
  criteriaValues?: string[];

  // only request criteria values on initial structured-filters call
  cacheCriteriaValues?: boolean;

  // always return all filter options on autolist checkboxes
  disableInteractions?: boolean;
}

export interface StructuredFilterResponse {
  page: Product[][];
  total: number;
  criteriaValues: Record<string, Record<string, number>>;
  criteriaValuesMinMax?: Record<string, { min: number, max: number }>;
}

export interface FetchCriteriaValuesReturn {
  data: ComputedRef<Record<string, number>>;
}

export interface StructuredRecommender {
  results: FilterResults;
  count: ComputedRef<number>;
  limit: Ref<number>;
  sort: Ref<string>;
  page: Ref<number>;
  criteriaValuesMinMax?: ComputedRef<StructuredFilterResponse['criteriaValuesMinMax']>;
  hasRule: (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria?: string,
    baseProductValue?: string
  ) => boolean;
  getFirstRuleValue: (group: string) => string | null;
  pushRule: (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria?: string,
    baseProductValue?: string
  ) => void;
  setOnlyRule: (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria?: string,
    baseProductValue?: string
  ) => void;
  removeRule: (
    group: string,
    criteria: string,
    operator: string,
    value: string,
    valueCriteria?: string,
    baseProductValue?: string
  ) => void;
  removeAllRules: (group: string) => void;
  fetchCriteriaValues: (criteria: string) => FetchCriteriaValuesReturn;
  reset: () => void;
  loadMore: () => void;
}

export type InsertParams = RecoSliderParams | CrossSellParams | BannerParams;

type ItemLayout = 'filters-content-grid-item' | 'reco-slider-slot' | 'default';

export interface RecoSliderParams {
  type: 'reco-slider';
  enabled: boolean;
  title: string;
  titleStyle: StyleValue;
  algo: FilterParams;
  autoscroll: boolean;
  scrollSpeed: number;
  absoluteArrows: boolean;
  previousButton: string;
  nextButton: string;
  buttonStyle: StyleValue;
  columnGap: string;
  style: StyleValue;
  itemLayout: ItemLayout;
  itemStyle: RecoItemStyleParams;
}

export interface CrossSellParams {
  type: 'cross-sell';
  enabled: boolean;
  title: string;
  key: CrossSellKey;
  data: CrossSellData;
  style: StyleValue;
  columnGap: string;
  scroll: boolean;
  titleStyle: StyleValue;
  itemStyle: StyleValue;
  autoscroll: boolean;
  scrollSpeed: number;
  absoluteArrows: boolean;
  imageStyle: StyleValue;
  sliderMode: boolean;
  nextButton: string;
  previousButton: string;
  buttonStyle: StyleValue;
  center?: boolean;
}

export interface BannerParams {
  type: 'banner';
  enabled: boolean;
  interval: number;
  elements: BannerElement[];
  style: StyleValue;
}

export interface BannerElement {
  type: 'html' | 'message';
  html: string;
  text: string;
  link: string;
  style: StyleValue;
}

export interface CustomLayout {
  global: GlobalParams;
  header: HeaderParams;
  mainProduct: MainProductParams;
  mainReco: MainRecoParams;
  footer: FooterParams;
  layer: LayerParams;
  stickyAtc: StickyAtcParams;
  preHeader: InsertParams[];
  postHeader: InsertParams[];
  preMainProduct: InsertParams[];
  postMainProduct: InsertParams[];
  postMainReco: InsertParams[];
}

export interface MainRecoParams {
  filtersDisplay: 'none' | 'left' | 'left-high' | 'right' | 'right-high' | 'slideover';
  filtersTitle: string;
  filtersTitleStyle: StyleValue;
  slideoverStyle: StyleValue;
  slideoverCloseButton: string;
  slideoverCloseButtonStyle: StyleValue;
  filterStyle: StyleValue;
  filterParams: FilterElement[];
  filterParamsGroupStyle: StyleValue;
  filterParamsHeaderStyle: StyleValue;
  filterParamsHeaderTitleStyle: StyleValue;
  filterParamsOpenedIcon: string;
  filterParamsClosedIcon: string;
  filterParamsHeaderIconStyle: StyleValue;
  filterParamsCheckboxStyle: StyleValue;
  filterParamsActiveCheckboxStyle: StyleValue;
  filterParamsDisableInteractions: boolean;
  filterParamsButtonEraseStyle: StyleValue;
  filterParamsButtonEraseEnable: boolean;
  filterParamsButtonEraseText: string;
  filterParamsButtonValidateStyle: StyleValue;
  filterParamsButtonValidateEnable: boolean;
  filterParamsButtonValidateText: string;
  gridStyle: StyleValue;
  itemLayout: ItemLayout;
  itemStyle: RecoItemStyleParams;
  algo: FilterParams;
  paginationContainerStyle: StyleValue;
  paginationButtonStyle: StyleValue;
  paginationActiveButtonStyle: StyleValue;
  paginationImageStyle: StyleValue;
  paginationType: 'none' | 'page' | 'more' | 'scroll';
  paginationLoadMoreText: string;
  paginationMaxVisibleButtons: number;
  paginationPreviousText: string;
  paginationNextText: string;
  paginationPreviousImage: string;
  paginationNextImage: string;
  paginationLoadMoreMode: boolean; // DEPRECATED use paginationType instead
}

export interface MainProductParams {
  light: boolean;
}

export interface HeaderParams {
  source: 'slot' | 'scrapped-html' | 'scrapped-block';
  sourceCustomAttribute: string;
  style: StyleValue;
}

export interface FooterParams {
  source: 'slot' | 'scrapped-html' | 'scrapped-block';
  sourceCustomAttribute: string;
  style: StyleValue;
}

export interface LayerParams {
  enabled: boolean;
  position: 'top' | 'left' | 'right' | 'bottom';
  delay: number;
  hideOnScroll: boolean;
  style: StyleValue;
  backdropStyle: StyleValue;
  title: string;
  titleStyle: StyleValue;
  gridStyle: StyleValue;
  algo: FilterParams;

  itemLayout: ItemLayout
  itemStyle: RecoItemStyleParams;

  sliderMode: boolean;
  nextButton: string;
  previousButton: string;
  columnGap: string;
  autoscroll: boolean;
  scrollSpeed: number;
  absoluteArrows: boolean;
  buttonStyle: StyleValue;
}

export interface RecoItemStyleParams {
  style: StyleValue;
  imageStyle: StyleValue;
  titleStyle: StyleValue;
  priceStyle: StyleValue;
  salePriceContainerStyle: StyleValue;
  salePriceStyle: StyleValue;
  salePriceOriginalPriceStyle: StyleValue;
}

export interface RecoItemParams {
  item: Product[];
  style: RecoItemStyleParams;
}

export interface StickyAtcParams {
  enabled: boolean;
  delay: number;
  yThreshold: number;
}

export interface GlobalParams {
  stylesheet: string;
}

export interface BlockConfig {
  html: string;
  style: string;
}

interface CustomLayoutContext {
  filter: StructuredRecommender
  showFiltersSlideover: Ref<boolean>
  toggleFiltersSlideover: () => void
  showOverlay: Ref<boolean>
  toggleOverlay: () => void
}

declare module '#app' {
  interface NuxtApp {
    $customLayout?: CustomLayoutContext
  }
}
