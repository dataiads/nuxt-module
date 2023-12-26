// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

/* Enable Axeptio by providing customer axeptioSettings configuration
 * in config.public.axeptio.settings
 */
function prependBody (tag: string, content: string) {
  const el = document.createElement(tag)
  el.innerHTML = content
  document.querySelector('body')?.prepend(el)
}

export default defineNuxtPlugin(() => {
  const lpoConfig = useLpoConfig()
  const config = useRuntimeConfig()

  if (lpoConfig.axeptio || (config.public?.axeptio as Record<string, any>)?.clientId) {
    const axeptioConf = lpoConfig.axeptio ?? (config.public?.axeptio as AxeptioConfig)

    try {
      const axeptioSettings = JSON.stringify(axeptioConf)
      prependBody('script', `
        window.axeptioSettings = ${axeptioSettings};
        (function(d, s) {
          var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
          e.async = true; e.src = "//static.axept.io/sdk.js";
          t.parentNode.insertBefore(e, t);
          })(document, "script");
      `)
    } catch (e) {
      console.error('invalid axeptio config')
    }
  }
})