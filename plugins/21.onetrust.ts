// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig, useHead } from "#app";

/* Enable Onetrust by providing oneTrust.dataDomainScript id
 * in public runtime config
 */

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig();

  if (config.public?.onetrust?.dataDomainScript) {
    useHead({
      script: [
        { defer: "", src: "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js", "data-domain-script": config.public.onetrust.dataDomainScript},
      ]
    })
  }
})