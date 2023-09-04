// @ts-ignore
import {
  defineNuxtPlugin,
  useRuntimeConfig,
  UseFetchOptions,
  useHead,
  useState,
  useFetch,
  useLazyFetch,
} from "#app";

/* fetch main product data for this page
  handles compatibility with url based product match
  when no lpoid parameter is present
 */
function fetchPageData(loc: Location) {
  const u = new URL(loc.href);
  const lpoid = u.searchParams.get("lpoid");

  if (lpoid == null) {
    // backward compatibility: use path matching when no lpoid
    return useFetch<PageData>("/api/page-data", {
      params: {
        uri: loc.pathname + loc.search,
        fragment: loc.hash.replace("#", ""),
      },
    });
  }

  return useFetch<PageData>(`/api/page-data/${encodeURI(lpoid)}`);
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const lpoConfig = useLpoConfig();

  if (!runtimeConfig.public.mirroredDomain) {
    throw new Error("mirroredDomain is expected in public runtime config");
  }

  // force robots noindex meta tag
  // the associated canonical link is provided by the server using a header
  useHead({
    htmlAttrs: {
      // @ts-ignore
      lang: lpoConfig.locale ?? runtimeConfig.public.lang,
    },
    meta: [
      { charset: "utf-8" },
      { name: "robots", content: "noindex" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  });

  // register error handlers
  nuxtApp.vueApp.config.errorHandler = (error) => {
    reportError(error);
    return errorRedirect(error);
  };

  // setup global app timeout
  const pageLoadTimeout = setTimeout(
    () => errorRedirect("app took too long to respond."),
    runtimeConfig.public.timeout.initialPageLoad
  );
  nuxtApp.hook("app:suspense:resolve", () => {
    clearTimeout(pageLoadTimeout);
    if (runtimeConfig.public.dataiadsGreeting) {
      console.log("Powered by Dataïads");
    }
  });

  // fetch the product on init
  nuxtApp.hook("app:created", async () => {
    const dataTimeout = setTimeout(
      () => errorRedirect("page data timeout"),
      runtimeConfig.public.timeout.pageDataLoad
    );
    const { data: pageData, error } = await fetchPageData(window.location);
    clearTimeout(dataTimeout);
    if (error.value) {
      errorRedirect(error.value);
    }

    if (pageData.value === null) {
      errorRedirect("Failed to fetch page data");
    }

    const data = pageData.value;
    useState<Product | undefined>("product", () => data?.product);
    useState<AssocString | undefined>(
      "collectorData",
      () => data?.collectorData
    );

    if (data?.product) {
      injectProductStructuredData(data.product);
    }

    useHead({
      title: data?.product.extraData?.title ?? data?.product.data.title,
    });
  });
  return {
    provide: {
      fetchProductRecommendations,
      errorRedirect,
      reportError,
    },
  };
});

function errorRedirect(reason: unknown): void {
  /* Redirect to same URI on mirroredDomain */
  const mirroredDomain = useMirroredDomain();

  let errorUri =
    mirroredDomain + window.location.pathname + window.location.search;
  console.debug(reason);
  if (process.env.NODE_ENV === "development") {
    console.error(
      `Production app would have redirected to ${errorUri}: ${reason}`
    );
  } else {
    window.location.replace(errorUri);
  }
}

export function reportError(err: unknown) {
  return $fetch("/api/error/report", {
    method: "POST",
    body: {
      error: `${err} on ${location.toString()}`,
      service: "landing-page",
      version: "1.0",
    },
  });
}

function fetchProductRecommendations(
  recommender: string,
  algo: string,
  params?: Record<string, any>,
  key?: string
) {
  const runtimeConfig = useRuntimeConfig();

  const fetchOptions: UseFetchOptions<Product[]> = {
    params: params,
  };
  if (key) {
    fetchOptions.key = key;
  }

  const fetcher = useLazyFetch<Product[]>(
    `/api/recommendations/${recommender}/${algo}`,
    fetchOptions
  );
  setTimeout(() => {
    if (fetcher.pending.value) {
      errorRedirect("product recommendations timeout");
    }
  }, runtimeConfig.public.timeout.recommendationsLoad);

  return fetcher;
}

function injectProductStructuredData(product: Product) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.data.title,
    image: [product.data.imageLink],
    color: product.data.color,
    productId: product.data.offerId,
    brand: {
      "@type": "Brand",
      name: product.data.brand,
    },
    offers: {
      "@type": "Offer",
      url: product.data.link,
      priceCurrency: product.data.price?.currency,
      price: product.data.price?.value,
    }
  };
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}