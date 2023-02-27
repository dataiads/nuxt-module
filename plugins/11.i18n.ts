import { createI18n } from 'vue-i18n';

import messages from "~/locales"

export default defineNuxtPlugin(async ({ vueApp }) => {
  // Locale is changed in the backoffice.
  // OR by editing dev.config.ts in dev env.
  const { $lpoConfig } = useNuxtApp()

  if ($lpoConfig.has("locale")) {
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: $lpoConfig.get("locale"),
      messages: messages
    })
    vueApp.use(i18n)
  }

})