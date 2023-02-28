import storeData from "~/data/stores.json";

export default defineNuxtPlugin(({ }) => {
  const config = useRuntimeConfig();
  const store = useState<Store>("lia.store");

  if (config.public.enableLIA) {
    let storeId = new URL(window.location.href).searchParams.get("store");
    if (storeId && storeData[storeId]) {
      store.value = storeData[storeId] as Store;
    }
  }

  return {
    provide: {
      fetchLocalInventory() {
        const product = useProduct();
        return useFetch<LocalInventory>(`/api/products/${product.value.data.offerId}/lia/${store.value.id}`);
      },
    },
  };
});
