
import { defineNuxtConfig } from "nuxt/config"
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/image-edge"
    ],
    css: [
        resolve("./assets/css/tailwind.css")
    ],
    runtimeConfig: {
        public: {
            lpoDomain: "",
            mirroredDomain: "",

            timeout: {
                pageDataLoad: 1000,
                initialPageLoad: 1000,
                recommendationsLoad: 1000,
            }
        }
    },

    tailwindcss: {
        config: {
            plugins: [
                require('@tailwindcss/forms'),
                require('@tailwindcss/typography'),
                require('@tailwindcss/line-clamp'),
            ]
        }
    },

    image: {
        provider: "imageProvider",
        providers: {
          imageProvider: {
            name: "imageProvider",
            provider: resolve("./utils/image-provider"),
            options: {
              // Relative URL helps avoid cases where same template is deployed on multiple platforms and all image traffic is sent to a single platform.
              providerURL: "/api/images/resize",
            },
          },
        },
    }
})
 