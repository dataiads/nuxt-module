// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const lpoConfig = useLpoConfig();
  const product = useProduct();

  // app:beforeMount hook is used because product data fetch happens in app:created hook
  nuxtApp.hook("app:beforeMount", async () => {
    if (lpoConfig.productHook) {
      try {
        const f = Function(
          "product",
          "getCustomAttr",
          "getCustomAttrFloat",
          "getCustomAttrInt",
          "getCustomAttrJSON",
          lpoConfig.productHook
        );
        f(
          product.value,
          getCustomAttr,
          getCustomAttrFloat,
          getCustomAttrInt,
          getCustomAttrJSON
        );
      } catch (e: any) {
        console.error("productHook error:", e);
      }
    }
  });
});
