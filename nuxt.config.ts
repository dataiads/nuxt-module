
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
            // mandatory configuration
            lpoDomain: "",
            mirroredDomain: "",

            // default timeouts for server interaction
            timeout: {
                pageDataLoad: 1000,
                initialPageLoad: 5000,
                recommendationsLoad: 10000,
            },

            // expose cdn url inside config
            cdnURL: process.env.CDN_URL || "",

            // toggle optimized images component
            optimizeImageLoad: true

            

        }
    },

    tailwindcss: {
        config: {
            content: [],
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
              providerURL: "/api/images/resize",
            },
          },
        },
    }
})