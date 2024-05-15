import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const runtimeConfig = useRuntimeConfig()
    let storeCode: string | null = null
    if (!process.server) {
      storeCode = new URLSearchParams(window.location.search).get('store')
    } else {
      const route = useRoute()
      storeCode = route.params.store?.[0] ?? route.params.store
    }

    const productId = useProduct().value?.id

    if (runtimeConfig.public.fetchRegion && storeCode && productId) {
      $fetch<Region>(`/api/products/${productId}/regions/${storeCode.padStart(6, '0')}`).then((res) => {
        useState<Region | null>('region', () => res)
      })
    }
  })
})