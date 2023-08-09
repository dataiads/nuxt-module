// @ts-ignore
import { defineNuxtPlugin, useRuntimeConfig, useHead } from "#app";

/* Enable Axeptio by providing customer axeptioSettings configuration
 * in config.public.axeptio.settings
 */
function prependBody(tag: string, content: string) {
  let el = document.createElement(tag);
  el.innerHTML = content;
  document.querySelector("body")?.prepend(el);
}

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig();

  if ((config.public?.axeptio as Record<string, any>)?.clientId) {
    let axeptioSettings = JSON.stringify(config.public.axeptio);
    prependBody("script", `{
      var process = { env: {} };
      window.axeptioSettings = ${axeptioSettings};
      (function(d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true;
        e.src = "https://static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");
    }`) 
  }
})