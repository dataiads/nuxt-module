// @ts-ignore
import {
  defineNuxtPlugin,
  useRuntimeConfig,
  type UseFetchOptions,
  useHead,
  useState,
  useFetch,
  useLazyFetch
} from '#app'

/* fetch main product data for this page
  handles compatibility with url based product match
  when no lpoid parameter is present
 */
function fetchPageData (u: URL, conf?: BaseProductConfig) {

  const baseProductMode = conf?.mode || 'auto'

  let lpoid: string = ''
  if (baseProductMode == 'manual' && conf?.productId) {
    lpoid = conf.productId
  } else if (baseProductMode == 'none') {
    lpoid = 'none'
  } else {
    const urlId = u.searchParams.get('lpoid')
    if (urlId) {
      lpoid = urlId
    }
  }

  if (!lpoid) {
    // backward compatibility: use path matching when no lpoid
    return useFetch<PageData>('/api/page-data', {
      params: {
        uri: u.pathname + u.search,
        fragment: u.hash.replace('#', '')
      }
    })
  }

  return useFetch<PageData>(`/api/page-data/${encodeURI(lpoid)}`)
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const lpoConfig = useLpoConfig()
  const product = useState<Product | undefined>('product')
  const mirroredDomain = useMirroredDomain()

  if (!runtimeConfig.public.mirroredDomain) {
    throw new Error('mirroredDomain is expected in public runtime config')
  }

  // force robots noindex meta tag
  // the associated canonical link is provided by the server using a header
  useHead({
    htmlAttrs: {
      // @ts-ignore
      lang: lpoConfig.locale ?? runtimeConfig.public.lang
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  })

  // register error handlers
  if (!process.server) {
    // According to https://nuxt.com/docs/getting-started/error-handling#nitro-server-lifecycle
    // we cannot define a server-side handler for errors.
    // It kind of helps me out because SSR was NOT enjoying the use of useRoute.
    nuxtApp.vueApp.config.errorHandler = (error, instance) => {
      reportError(error)
      return errorRedirect(error, mirroredDomain, instance?.$route?.fullPath)
    }
  }

  // setup global app timeout, not used on server side
  if (!process.server) {
    const pageLoadTimeout = setTimeout(
      () => errorRedirect('app took too long to respond.', mirroredDomain),
      runtimeConfig.public.timeout.initialPageLoad
    )
    nuxtApp.hook('app:suspense:resolve', () => {
      clearTimeout(pageLoadTimeout)
      if (runtimeConfig.public.dataiadsGreeting) {
        console.log('Powered by Dataïads')
      }
    })
  }

  // fetch the product on init
  const dataTimeout = setTimeout(
    () => errorRedirect('page data timeout', mirroredDomain),
    runtimeConfig.public.timeout.pageDataLoad
  )

  const route = useRoute()
  let pageUrl = runtimeConfig.public.baseURL + route.fullPath
  if (!process.server) {
    pageUrl = window.location.href
  }

  const u = new URL(pageUrl)
  const { data: pageData, error } = await fetchPageData(u, lpoConfig.baseProduct)
  clearTimeout(dataTimeout)
  if (error.value) {
    errorRedirect(error.value, mirroredDomain)
  }

  if (pageData.value === null) {
    errorRedirect('Failed to fetch page data', mirroredDomain)
  }

  const data = pageData.value
  product.value = data?.product

  if (!process.server && data?.product) {
    injectProductStructuredData(data.product)
  }

  if (data?.product) {
    useHead({
      title: data?.product.extraData?.title ?? data?.product.data.title
    })
  }

  return {
    provide: {
      fetchProductRecommendations,
      errorRedirect,
      reportError
    }
  }
})

function errorRedirect (reason: unknown, mirroredDomain: string, path?: string): void {
  /* Redirect to same URI on mirroredDomain */
  if (!path && process.server) {
    const route = useRoute()
    path = route.fullPath
  }
  let errorUri = mirroredDomain + path
  if (!process.server) {
    errorUri = mirroredDomain + window.location.pathname + window.location.search
  }

  console.debug(reason)
  if (process.env.NODE_ENV === 'development') {
    console.error(
      `Production app would have redirected to ${errorUri}: ${reason}`
    )
  } else {
    window.location.replace(errorUri)
  }
}

export function reportError (err: unknown) {
  return $fetch('/api/error/report', {
    method: 'POST',
    body: {
      error: `${err} on ${location.toString()}`,
      service: 'landing-page',
      version: '1.0'
    }
  })
}

function fetchProductRecommendations (
  recommender: string,
  algo: string,
  params?: Record<string, any>,
  key?: string
) {
  const runtimeConfig = useRuntimeConfig()
  const mirroredDomain = useMirroredDomain()

  const fetchOptions: UseFetchOptions<Product[]> = {
    params: params
  }
  if (key) {
    fetchOptions.key = key
  }

  const fetcher = useLazyFetch<Product[]>(
    `/api/recommendations/${recommender}/${algo}`,
    fetchOptions
  )
  setTimeout(() => {
    if (fetcher.pending.value) {
      errorRedirect('product recommendations timeout', mirroredDomain)
    }
  }, runtimeConfig.public.timeout.recommendationsLoad)

  return fetcher
}

function injectProductStructuredData (product: Product) {
  /* Inject structured product data in application/ld+json script from:
   *   1. scrapped or collected data stored in "structured-data" custom attribute
   *   2. reconstructed from GMC feed data
   */

  let structuredData = ''

  if (product?.extraData?.customAttributes?.length) {
    for (const customAttr of product.extraData.customAttributes) {
      if (customAttr.name === 'structured-data' && customAttr.value) {
        structuredData = customAttr.value
      }
    }
  }

  if (!structuredData) {
    structuredData = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.data.title,
      image: [product.data.imageLink],
      color: product.data.color,
      productId: product.data.offerId,
      brand: {
        '@type': 'Brand',
        name: product.data.brand
      },
      offers: {
        '@type': 'Offer',
        url: product.data.link,
        priceCurrency: product.data.salePrice?.currency || product.data.price?.currency,
        price: product.data.salePrice?.value || product.data.price?.value
      }
    })
  }

  const script = document.createElement('script')
  script.setAttribute('type', 'application/ld+json')
  script.textContent = structuredData
  document.head.appendChild(script)
}