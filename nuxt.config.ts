import { defineNuxtConfig } from "nuxt/config";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
  ],

  app: {
    // use cdn url from environment
    cdnURL: process.env.CDN_URL || "",
  },

  css: [resolve("./assets/css/tailwind.css")],

  runtimeConfig: {
    public: {
      // Add default values for the LPOConfig here.
      devLpoConfig: {
        // disable i18n by default
        locale: "",
        variation: "catalog",
        banners: [],
        gtm: {
          id: [],
        },
        onetrust: {
          dataDomainScript: null,
        },
        didomi: {
          id: null,
        }
      },

      // mandatory configuration
      lpoDomain: "",
      mirroredDomain: "",

      // default timeouts for server interaction
      timeout: {
        pageDataLoad: 8000,
        initialPageLoad: 10000,
        recommendationsLoad: 1000000,
      },

      // expose cdn url inside config
      cdnURL: process.env.CDN_URL || "",

      // toggle optimized images component
      optimizeImageLoad: true,

      // customize layouts behaviour
      layoutStyle: {
        header: {
          class: ["col-span-full", "w-full", "z-[2]"],
        },
        breadcrumb: {
          class: ["w-full", "lg:container", "mx-auto"],
        },
        mainProduct: {
          class: ["w-full", "lg:container", "mx-auto"],
        },
        recoSlider: {
          class: ["w-full"],
          containerClass: ["lg:container", "mx-auto"],
          sliderClass: ["flex", "flex-nowrap", "overflow-x-scroll"],
          autoscroll: false,
        },
        filters: {
          class: ["h-full", "flex", "flex-col", "md:flex-row", "flex-nowrap", "items-stretch"],
          asideClass: [
            "flex-none",
            "w-auto",
            "md:w-[256px]",
            "h-[50px]",
            "md:h-auto",
            "flex",
            "items-stretch",
            "flex",
            "flex-row",
            "md:flex-col",
            "overflow-x-scroll",
            "md:overflow-x-none",
            "overflow-y-none",
            "md:overflow-y-scroll",
          ],
          contentClass: ["grow"],
          contentHeaderClass: [],
          contentGridClass: ["grid", "grid-cols-2", "gap-4", "md:gap-8", "lg:grid-cols-3", "xl:grid-cols-4"],
          paginationClass: ["w-full", "flex", "flex-row", "justify-center"],
        },
        crossSell: {
          class: ["lg:container", "mx-auto"],
        },
        footer: {
          class: ["col-span-full", "w-full"],
        },
      },
    },
  },

  tailwindcss: {
    config: {
      content: [
        resolve("./nuxt.config.ts"), // scan layer nuxt.config.ts for tailwind classes
        "./nuxt.config.ts", // scan client nuxt.config.ts for tailwind classes
      ],
      plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
      theme: {
        extend: {
          transitionProperty: {
            height: "height",
          },
        },
      },
    },
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
  },
});
