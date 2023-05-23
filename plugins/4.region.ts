
// @ts-ignore
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeCode = new URLSearchParams(window.location.search).get("store");
    const productId = useProduct().value.id;

    if (runtimeConfig.public.fetchRegion && storeCode && productId) {
      $fetch<Region>(`/api/products/${productId}/regions/${storeCode.padStart(6, "0")}`).then((res) => {
        useState<Region | null>('region', () => res)
      })
    }
  });
});