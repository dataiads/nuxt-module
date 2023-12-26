import { createI18n } from 'vue-i18n'

// @ts-ignore
import bundleMessages from '~/locales'

export default defineNuxtPlugin(({ vueApp }) => {
  // Locale is changed in the backoffice.
  // OR by editing lpoConfig part of the nuxt.config.ts file of the LP.
  const lpoConfig = useLpoConfig()

  if (lpoConfig.locale) {
    const messages = lpoConfig.messages ? lpoConfig.messages : bundleMessages
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: lpoConfig.locale,
      messages: messages,
      numberFormats: lpoConfig.numberFormats
    })
    vueApp.use(i18n)
  } else {
    return {
      provide: {
        // if no locale is configured, inject $t helper to prevent errors
        t (a: string) { return a}
      }
    }
  }
})