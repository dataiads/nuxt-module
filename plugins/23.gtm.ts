
// @ts-ignore
import { defineNuxtPlugin, useHead } from '#app'

/*
 * Injects GTM in the page
 */
export default defineNuxtPlugin(() => {
  if (blockTrackingScripts()) {
    return
  }
  let gtmId = useLpoConfig()?.gtm?.id

  if (!gtmId) {
    return
  } else if (!Array.isArray(gtmId)) {
    gtmId = [gtmId]
  }

  for (const id of gtmId) {
    useHead({
      script: [
        { children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');` }
      ],
      noscript: [
        { tagPosition: 'bodyOpen', children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display: none; visibility: hidden"></iframe>` }
      ]
    })
  }
})