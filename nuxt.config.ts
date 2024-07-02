import { defineNuxtConfig } from 'nuxt/config'
import { createResolver, resolvePath } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  // @ts-ignore
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@vueuse/nuxt'],


  app: {
    // use cdn url from environment
    cdnURL: process.env.CDN_URL || ''
  },

  css: [],

  runtimeConfig: {
    public: {
      // mirroredDomain should not be used directly, as it can be overriden by lpoConfig.mirroredDomainOverride
      // useMirroredDomain() composable should be used instead
      mirroredDomain: '',

      baseURL: '',

      liveConfigUrl: process.env.LIVECONFIGURL,

      // default timeouts for server interaction
      timeout: {
        pageDataLoad: 8000,
        initialPageLoad: 10000,
        recommendationsLoad: 1000000
      },

      // expose cdn url inside config
      cdnURL: process.env.CDN_URL || '',

      googleFonts: ([] as GoogleFont[]),

      // toggle optimized images component
      optimizeImageLoad: true,

      // activate region fetching
      fetchRegion: false,

      // customize layouts behaviour
      layoutStyle: {
        header: {
          class: ['col-span-full', 'w-full', 'z-[2]']
        },
        breadcrumb: {
          class: ['w-full', 'lg:container', 'mx-auto']
        },
        mainProduct: {
          class: 'w-full lg:container mx-auto flex flex-wrap lg:max-h-[80vh]',
          imageClass: 'w-full lg:w-[400px] xl:w-[540px] flex-nowrap',
          descriptionClass: 'w-full lg:grow flex items-start md:my-auto',
          verticalSlider: {
            class: '',
            sliderClass: ''
          }
        },
        recoSlider: {
          class: ['w-full', 'transition-translate', 'duration-1000'],
          containerClass: ['mx-auto'],
          overlayClass: [],
          arrowClass: [],
          sliderClass: ['flex', 'flex-nowrap', 'overflow-x-scroll'],
          itemClass: ['w-1/2 md:w-auto md:min-w-[160px] p-2'],
          autoscroll: false,
          scrollSpeed: 5,
          openOverlayButton: true
        },
        customOverlay: {
          class: ['w-full', 'transition-translate', 'duration-1000'],
          containerClass: ['mx-auto'],
          overlayClass: [],
          sliderClass: ['flex', 'flex-nowrap', 'overflow-x-scroll'],
          autoscroll: false,
          scrollSpeed: 5,
          openOverlayButton: true
        },
        filters: {
          class: ['flex', 'flex-col', 'md:flex-row', 'flex-nowrap', 'items-stretch'],
          highFilters: 'flex flex-col md:flex-row',
          headerClass: [],
          asideClass: [
            'flex-none',
            'w-auto',
            'md:w-[256px]',
            'h-[50px]',
            'md:h-auto',
            'flex',
            'items-stretch',
            'flex',
            'flex-row',
            'md:flex-col',
            'md:overflow-x-none',
            'overflow-y-none',
            'md:overflow-y-scroll'
          ],
          contentClass: ['grow'],
          contentHeaderClass: [],
          contentGridClass: [
            'grid',
            'grid-cols-[var(--catalog-grid-cols)]',
            'md:grid-cols-[var(--md-catalog-grid-cols)]',
            'lg:grid-cols-[var(--lg-catalog-grid-cols)]',
            'xl:grid-cols-[var(--xl-catalog-grid-cols)]',
            '2xl:grid-cols-[var(--2xl-catalog-grid-cols)]',
            '3xl:grid-cols-[var(--3xl-catalog-grid-cols)]',
            'gap-[var(--catalog-grid-gap)]',
            'md:gap-[var(--md-catalog-grid-gap)]',
            'lg:gap-[var(--lg-catalog-grid-gap)]',
            'xl:gap-[var(--xl-catalog-grid-gap)]',
            '2xl:gap-[var(--2xl-catalog-grid-gap)]',
            '3xl:gap-[var(--3xl-catalog-grid-gap)]'
          ],
          paginationClass: ['w-full', 'flex', 'flex-row', 'justify-center']
        },
        extraReco: {
          class: ['h-full', 'flex', 'flex-col', 'md:flex-row', 'flex-nowrap', 'items-stretch'],
          contentClass: ['grow'],
          contentHeaderClass: [],
          contentGridClass: ['grid', 'grid-cols-2', 'gap-4', 'md:gap-8', 'lg:grid-cols-3', 'xl:grid-cols-4']
        },
        crossSell: {
          class: ['lg:container', 'mx-auto']
        },
        footer: {
          class: ['col-span-full', 'w-full']
        }
      }
    }
  },

  tailwindcss: {
    cssPath: ['~/assets/css/generic.scss', { injectPosition: 'last' }],
    exposeConfig: true,
    config: {
      content: [
        resolve('./nuxt.config.ts'), // scan layer nuxt.config.ts for tailwind classes
        './nuxt.config.ts' // scan client nuxt.config.ts for tailwind classes
      ],
      plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
      theme: {
        extend: {
          transitionProperty: {
            height: 'height'
          }
        }
      }
    }
  },

  image: {
    provider: 'imageProvider',
    providers: {
      imageProvider: {
        name: 'imageProvider',
        provider: resolve('./utils/image-provider'),
        options: {
          providerURL: ''
        }
      }
    }
  },

  components: {
    'dirs': [
      {
        'path': './components/layouts',
        'global': true
      },
      {
        'path': './components/ui',
        global: true,
        extensions: ['.vue']
      },
      { path: './components/blocks', prefix: 'D' },
      './components',
      '~/components'
    ]
  },
  hooks: {
    'ready': async (nuxt) => {
      const cssPath = await resolvePath('~/assets/css/custom.scss')
      const globalPath = resolve('./assets/scss/global.scss')
      nuxt.options.css.push(globalPath)
      nuxt.options.css.push(cssPath)
    }
  }
})