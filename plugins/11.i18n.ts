import { createI18n } from 'vue-i18n';

import messages from "~/locales"

export default defineNuxtPlugin(async ({ vueApp }) => {
  const runtimeConfig = useRuntimeConfig();
  if (runtimeConfig.public.locale) {
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: runtimeConfig.public.locale,
      messages: messages
    })
    vueApp.use(i18n)
  }

})