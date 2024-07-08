// @ts-ignore
import { defineNuxtPlugin, useHead } from '#app'

/* Enable Onetrust by providing oneTrust.dataDomainScript id
 * in public runtime config
 */

export default defineNuxtPlugin(() => {
  if (blockTrackingScripts()) {
    return
  }
  const config = useLpoConfig()?.onetrust

  if (config?.dataDomainScript) {
    useHead({
      script: [
        { defer: '', src: 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js', 'data-domain-script': config.dataDomainScript }
      ]
    })
  }
})