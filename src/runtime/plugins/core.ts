
// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig, useHead, useState, useFetch } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

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
  nuxtApp.vueApp.config.errorHandler = (error, context) => {
      return errorRedirect(error)
  }

  // setup global app timeout
  const pageLoadTimeout = setTimeout(
    () => errorRedirect("app took too long to respond."),
    runtimeConfig.public.timeout.initialPageLoad
  )
  nuxtApp.hook('app:suspense:resolve', () => {
    clearTimeout(pageLoadTimeout)
  })

  // fetch the product on init
  nuxtApp.hook('app:created', async () => {
    const dataTimeout = setTimeout(() => errorRedirect("page data timeout"), runtimeConfig.timeout.pageDataLoad);
    const { data: pageData, error } = await useFetch<PageData>("/api/page-data", {
      params: {
        uri: window.location.pathname + window.location.search,
        fragment: window.location.hash.replace("#", "")
      } 
    });
    clearTimeout(dataTimeout);
    if (error.value) {
      errorRedirect(error.value);
    }
    const product = useState("product", () => pageData.value.product)

    useHead({
      title: product.value.extraData?.title ?? product.value.data.title
    })

  })

  return {
    provide: {
      errorRedirect,
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
      reportError(reason);
      window.location.replace(errorUri);
  }
}