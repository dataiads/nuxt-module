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
        useLightMainProduct: false,
        extraReco: false,
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

      // mirroredDomain should not be used directly, as it can be overriden by lpoConfig.mirroredDomainOverride
      // useMirroredDomain() composable should be used instead
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

      // activate region fetching
      fetchRegion: false,

      // customize layouts behaviour
      layoutStyle: {
        header: {
          class: ["col-span-full", "w-full", "z-[2]"],
        },
        breadcrumb: {
          class: ["w-full", "lg:container", "mx-auto"],
        },
        mainProduct: {
          class: "w-full lg:container mx-auto flex flex-wrap lg:max-h-[80vh]",
          imageClass: "w-full lg:w-[400px] xl:w-[540px] flex-nowrap",
          descriptionClass: "w-full lg:grow flex items-start md:my-auto",
          verticalSlider: {
            class: "",
            sliderClass: ""
          }
        },
        recoSlider: {
          class: ["w-full", "transition-translate", "duration-1000"],
          containerClass: ["mx-auto"],
          sliderClass: ["flex", "flex-nowrap", "overflow-x-scroll"],
          autoscroll: false,
          scrollSpeed: 5,
        },
        filters: {
          class: ["flex", "flex-col", "md:flex-row", "flex-nowrap", "items-stretch"],
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
            "md:overflow-x-none",
            "overflow-y-none",
            "md:overflow-y-scroll",
          ],
          contentClass: ["grow"],
          contentHeaderClass: [],
          contentGridClass: [
            "grid",
            "grid-cols-[var(--catalog-grid-cols)]",
            "md:grid-cols-[var(--md-catalog-grid-cols)]",
            "lg:grid-cols-[var(--lg-catalog-grid-cols)]",
            "xl:grid-cols-[var(--xl-catalog-grid-cols)]",
            "2xl:grid-cols-[var(--2xl-catalog-grid-cols)]",
            "3xl:grid-cols-[var(--3xl-catalog-grid-cols)]",
            "gap-[var(--catalog-grid-gap)]",
            "md:gap-[var(--md-catalog-grid-gap)]",
            "lg:gap-[var(--lg-catalog-grid-gap)]",
            "xl:gap-[var(--xl-catalog-grid-gap)]",
            "2xl:gap-[var(--2xl-catalog-grid-gap)]",
            "3xl:gap-[var(--3xl-catalog-grid-gap)]",
          ],
          paginationClass: ["w-full", "flex", "flex-row", "justify-center"],
        },
        extraReco: {
          class: ["h-full", "flex", "flex-col", "md:flex-row", "flex-nowrap", "items-stretch"],
          contentClass: ["grow"],
          contentHeaderClass: [],
          contentGridClass: ["grid", "grid-cols-2", "gap-4", "md:gap-8", "lg:grid-cols-3", "xl:grid-cols-4"],
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
          providerURL: "",
        },
      },
    },
  },
});
