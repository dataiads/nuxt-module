
// @ts-ignore
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:created', () => {
    const runtimeConfig = useRuntimeConfig();
    const storeCode = new URLSearchParams(window.location.search).get("store");
    const merchantId = useProduct().value.accountId;

    if (runtimeConfig.public.fetchRegion && storeCode && merchantId) {
      $fetch<Region>(`/api/regions/${storeCode.padStart(6, "0")}/merchants/${merchantId}`).then((res) => {
        useState<Region | null>('region', () => res)
      })
    }
  });
});