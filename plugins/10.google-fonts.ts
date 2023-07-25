import { defineNuxtPlugin, useRuntimeConfig, useHead } from "#app";

/*
 * Load Google Fonts
 */
export default defineNuxtPlugin((options) => {
  const fontConfigs = useRuntimeConfig()?.public.googleFonts

  if (fontConfigs) {
    useHead({
      link: fontConfigs.map(fontConfig => {
        let url = new URL("https://fonts.googleapis.com/css2?display=swap")
        url.searchParams.set("family", `${fontConfig.family}:wght@${fontConfig.weights.join(';')}`)
        return { rel: "stylesheet", href: url.toString() }
      }) 
    })
  }
})