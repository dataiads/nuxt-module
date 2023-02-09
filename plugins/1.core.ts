
// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig, useHead, useState, useFetch, useLazyFetch } from "#app";

/* fetch main product data for this page
  handles compatibility with url based product match
  when no lpoid parameter is present
 */
function fetchPageData(loc: Location) {
  const u = new URL(loc.href)
  const lpoid = u.searchParams.get("lpoid")

  if (lpoid == null) {
    // backward compatibility: use path matching when no lpoid
    return useFetch<PageData>("/api/page-data", {
      params: {
        uri: loc.pathname + loc.search,
        fragment: loc.hash.replace("#", "")
      } 
    })
  }

  return useFetch<PageData>(`/api/page-data/${lpoid}`)
}

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig.public.mirroredDomain) {
    throw new Error("mirroredDomain is expected in public runtime config")
  }

  if (!runtimeConfig.public.lpoDomain) {
    throw new Error("mirroredDomain is expected in public runtime config")
  }


  // force robots noindex meta tag
  // the associated canonical link is provided by the server using a header
  useHead({
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
    htmlAttrs: {
      lang: runtimeConfig.public.lang,
    },
    meta: [
      { name: "robots", content: "noindex" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ]
  })

  // register error handlers
  nuxtApp.vueApp.config.errorHandler = (error) => {
      reportError(error)
      return errorRedirect(error)
  }

  // setup global app timeout
  const pageLoadTimeout = setTimeout(
    () => errorRedirect("app took too long to respond."),
    runtimeConfig.public.timeout.initialPageLoad
  )
  nuxtApp.hook('app:suspense:resolve', () => {
    clearTimeout(pageLoadTimeout)
    console.log("Powered by Dataïads");
  })

  // fetch the product on init
  nuxtApp.hook('app:created', async () => {
    const dataTimeout = setTimeout(() => errorRedirect("page data timeout"), runtimeConfig.timeout.pageDataLoad);
    const { data: pageData, error } = await fetchPageData(window.location)
    clearTimeout(dataTimeout);
    if (error.value) {
      errorRedirect(error.value);
    }
    useState<Product>("product", () => pageData.value.product)
    useState<AssocString>("collectorData", () => pageData.value.collectorData)

    useHead({
      title: pageData.value.product.extraData?.title ?? pageData.value.product.data.title
    })

  })
  return {
    provide: {
      fetchProductRecommendations,
      errorRedirect,
      reportError,
    }
  }
})


function errorRedirect(reason: unknown): void {
  /* Redirect to same URI on mirroredDomain */
  const runtimeConfig = useRuntimeConfig();
  let errorUri = runtimeConfig.public.mirroredDomain + window.location.pathname + window.location.search
  console.debug(reason);
  if (process.env.NODE_ENV === 'development') {
      console.error(`Production app would have redirected to ${errorUri}: ${reason}`)
  } else {
      window.location.replace(errorUri);
  }
}

export function reportError(err: string) {
  const data = {
    error: `${err} on ${location.toString()}`,
    service: "landing-page",
    version: "1.0",
  };

  return useFetch<void>("/api/error/report", {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify(data),
  });
}

function fetchProductRecommendations(recommender: string, algo: string, params?: Record<string, any>) {
  const runtimeConfig = useRuntimeConfig()

  const fetcher = useLazyFetch<Product[]>(`/api/recommendations/${recommender}/${algo}`, {
      params: params,
  })
  setTimeout(() => {
      if (fetcher.pending.value) {
          errorRedirect("product recommendations timeout")
      }
  }, runtimeConfig.public.timeout.recommendationsLoad);

  return fetcher
}
