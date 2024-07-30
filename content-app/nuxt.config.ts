// https://nuxt.com/docs/api/configuration/nuxt-config
const lpoDomain = 'https://lp.becquet.fr' 
const mirroredDomain = 'https://www.becquet.fr'

export default defineNuxtConfig({
  devServer: {
    port: 4000
  },
  ssr: false,
  devtools: { enabled: true },
  extends: ['dataiads-nuxt-layer', '@nuxt-themes/typography'],
  content: {
    highlight: {
      preload: [
        'diff',
        'json',
        'js',
        'ts',
        'css',
        'shell',
        'html',
        'md',
        'yaml',
        'vue',
        'vue-html',
        'bash',
        'typescript',
        'javascript'
      ],
      theme: 'github-light'
    },
    documentDriven: true,
    api: {
      baseURL: '/_my_content'
    }
  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  runtimeConfig: {
    public: {
      mirroredDomain,
      mirroredDomainOverride: mirroredDomain,
      devLpoConfig:
      process.env.NODE_ENV === 'development'
        ? {
            variation: 'custom-layout', // catalog-no-slider, catalog-no-slider-xsell-top, catalog-top-slider

            customLayout: {
              global: {
                stylesheet:
                  '#header + div {margin: 0 auto; width: 100%; max-width: 1340px; }'
              },
              header: {
                source: 'slot',
                sourceCustomAttribute: '',
                style: { width: '100%' }
              },
              mainProduct: { light: true },
              mainReco: {
                filtersDisplay: 'left',
                filtersTitle: 'FILTRER PAR',
                filtersTitleStyle: {
                  fontSize: '16px',
                  fontWeight: '600',
                  padding: '0 10px',
                  marginBottom: '12px'
                },
                slideoverStyle: {
                  margin: '5px',
                  background: '#ffffff',
                  width: '100%',
                  right: '100%'
                },
                slideoverCloseButton: '',
                slideoverCloseButtonStyle: {},
                filterParams: [
                  {
                    title: 'Prix',
                    elements: [
                      {
                        component: 'range',
                        props: {
                          criteria: 'price',
                          operator: 'EQUAL',
                          displayCount: true,
                          useTranslation: false,
                          prechecked: false,
                          searchable: false,
                          searchPlaceholder: 'Search...',
                          min: '0',
                          max: '10000',
                          minPlaceholder: 'Min €',
                          maxPlaceholder: 'Max €',
                          label: '',
                          value: '',
                          'value-criteria': '',
                          step: 5,
                          trailling: '€',
                          placeholder: '',
                          autoMinMax: false
                        }
                      }
                    ],
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      gap: '10px',
                      marginBottom: '16px'
                    }
                  },
                  {
                    title: 'Age',
                    elements: [
                      {
                        component: 'autolist-checkbox',
                        props: {
                          criteria: 'customLabel1',
                          operator: 'EQUAL',
                          displayCount: true,
                          useTranslation: false,
                          prechecked: false,
                          searchable: false,
                          searchPlaceholder: 'Search...',
                          min: '0',
                          max: '10000',
                          minPlaceholder: 'Min',
                          maxPlaceholder: 'Max',
                          label: '',
                          value: '',
                          'value-criteria': '',
                          step: 5,
                          trailling: '€',
                          placeholder: '',
                          autoMinMax: false
                        }
                      }
                    ],
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      gap: '10px',
                      marginBottom: '16px',
                      paddingTop: '4px',
                      paddingBottom: '4px'
                    }
                  },
                  {
                    title: 'Type de produit',
                    elements: [
                      {
                        component: 'autolist-checkbox',
                        props: {
                          criteria: 'productTypePart1',
                          operator: 'EQUAL',
                          displayCount: true,
                          useTranslation: false,
                          prechecked: false,
                          searchable: false,
                          searchPlaceholder: 'Search...',
                          min: '0',
                          max: '10000',
                          minPlaceholder: 'Min',
                          maxPlaceholder: 'Max',
                          label: '',
                          value: '',
                          'value-criteria': '',
                          step: 5,
                          trailling: '€',
                          placeholder: '',
                          autoMinMax: false
                        }
                      }
                    ],
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      gap: '10px',
                      marginBottom: '16px',
                      paddingBottom: '4px',
                      paddingTop: '4px'
                    }
                  },
                  {
                    title: 'Spécificités',
                    elements: [
                      {
                        component: 'autolist-checkbox',
                        props: {
                          criteria: 'customLabel0',
                          operator: 'EQUAL',
                          displayCount: true,
                          useTranslation: false,
                          prechecked: false,
                          searchable: false,
                          searchPlaceholder: 'Search...',
                          min: '0',
                          max: '10000',
                          minPlaceholder: 'Min',
                          maxPlaceholder: 'Max',
                          label: '',
                          value: '',
                          'value-criteria': '',
                          step: 5,
                          trailling: '€',
                          placeholder: '',
                          autoMinMax: false
                        }
                      }
                    ],
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '300px',
                      overflowY: 'auto',
                      gap: '10px',
                      marginBottom: '16px',
                      paddingBottom: '4px',
                      paddingTop: '4px'
                    }
                  }
                ],
                filterParamsGroupStyle: {},
                filterParamsHeaderStyle: {
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                },
                filterParamsOpenedIcon:
                  'https://api.iconify.design/heroicons:chevron-down.svg',
                filterParamsClosedIcon:
                  'https://api.iconify.design/heroicons:chevron-up.svg',
                helloNewField: 'hello',
                filterParamsHeaderTitleStyle: {
                  whiteSpace: 'nowrap',
                  paddingTop: '4px',
                  paddingBotttom: '4px',
                  fontWeight: '600',
                  fontSize: '16px'
                },
                filterParamsHeaderIconStyle: {
                  width: '20px',
                  height: '20px',
                  marginLeft: 'auto'
                },
                filterParamsCheckboxStyle: {
                  backgroundColor: '#ffffff',
                  borderRadius: '2px',
                  borderColor: '#9e9e9e',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer'
                },
                filterParamsActiveCheckboxStyle: {
                  backgroundColor: '#aaaaaa'
                },
                algo: {
                  filterRules: [
                    [
                      {
                        criteria: 'customLabel3',
                        operator: 'EQUAL',
                        type: 'baseProductValue',
                        value: '',
                        valueCriteria: '',
                        baseProductValue: 'customLabel3',
                        baseProductRegexpMatch: '',
                        baseProductRegexpReplace: ''
                      }
                    ],
                    [
                      {
                        criteria: 'uri',
                        operator: 'NOT_EQUAL',
                        type: 'baseProductValue',
                        value: '',
                        valueCriteria: '',
                        baseProductValue: 'uri',
                        baseProductRegexpMatch: '',
                        baseProductRegexpReplace: ''
                      }
                    ]
                  ],
                  sortRules: [
                    [
                      {
                        criteria: 'productType',
                        operator: 'EQUAL',
                        type: 'baseProductValue',
                        value: '',
                        valueCriteria: '',
                        baseProductValue: 'productType',
                        baseProductRegexpMatch: '',
                        baseProductRegexpReplace: ''
                      }
                    ],
                    [
                      {
                        criteria: 'customLabel1',
                        operator: 'EQUAL',
                        type: 'baseProductValue',
                        value: '',
                        valueCriteria: '',
                        baseProductValue: 'customLabel1',
                        baseProductRegexpMatch: '',
                        baseProductRegexpReplace: ''
                      }
                    ]
                  ],
                  sort: '',
                  limit: 12,
                  deduplicate: 'itemGroupId'
                },
                filterStyle: { width: '205px' },
                gridStyle: {
                  display: 'grid',
                  gap: '30px 15px',
                  gridTemplateColumns: 'repeat(3, 1fr)'
                },
                paginationContainerStyle: {
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: '10px',
                  marginBottom: '10px'
                },
                paginationButtonStyle: {
                  paddingTop: '10px',
                  paddingRight: '10px',
                  paddingBottom: '10px',
                  paddingLeft: '10px',
                  backgroundColor: '#ededed',
                  borderRadius: '2px'
                },
                paginationActiveButtonStyle: {
                  backgroundColor: '#dddddd',
                  color: '#ffffff'
                },
                paginationImageStyle: { height: '10px' },
                paginationType: 'page',
                paginationLoadMoreMode: false,
                paginationLoadMoreText: 'Load more...',
                paginationMaxVisibleButtons: 3,
                paginationPreviousText: 'previous',
                paginationNextText: 'next',
                paginationPreviousImage: '',
                paginationNextImage: ''
              },
              footer: {
                source: 'slot',
                sourceCustomAttribute: '',
                style: { width: '100%' }
              },
              layer: {
                enabled: false,
                position: 'bottom',
                delay: 1000,
                style: { padding: '5px' },
                title: 'More products',
                titleStyle: { margin: '5px' },
                gridStyle: {},
                algo: {
                  filterRules: [],
                  sortRules: [],
                  sort: '',
                  limit: 10,
                  deduplicate: ''
                }
              },
              stickyAtc: {
                enabled: true,
                delay: 100,
                yThreshold: 100,
                displayOnScroll: true
              },
              preHeader: [],
              postHeader: [],
              preMainProduct: [
                {
                  type: 'cross-sell',
                  enabled: true,
                  title: '',
                  key: { key: 'productTypePart0', caseInsensitive: true },
                  data: {
                    chat: [
                      {
                        text: 'Croquettes pour chat',
                        link: 'https://www.ultrapremiumdirect.com/chat/croquette/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-299,h-299,f-avif/france/production/catalog/products/003002/product_list.jpg?v=96184094'
                      },
                      {
                        text: 'Pâtée pour chat',
                        link: 'https://www.ultrapremiumdirect.com/chat/patee/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/004013/5.jpg?v=456296312'
                      },
                      {
                        text: 'Bi-nutrition pour chat',
                        link: 'https://www.ultrapremiumdirect.com/chat/bi-nutrition/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/011008/2.jpg?v=-203606199'
                      },
                      {
                        text: 'Litière et soins pour chat',
                        link: 'https://www.ultrapremiumdirect.com/chat/litiere-soins/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/france/production/catalog/products/015003/2.jpg?v=658456114'
                      },
                      {
                        text: 'Friandise pour chat',
                        link: 'https://www.ultrapremiumdirect.com/chat/friandises-complements/friandise/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/020006/3.jpg?v=298456327'
                      },
                      {
                        text: 'Compléments alimentaires',
                        link: 'https://www.ultrapremiumdirect.com/chat/friandises-complements/complements/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/009009/2.jpg?v=1164782478'
                      }
                    ],
                    chien: [
                      {
                        text: 'Croquettes pour chien',
                        link: 'https://www.ultrapremiumdirect.com/chien/croquette/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/france/production/catalog/products/002006/2.jpg?v=-1916138914'
                      },
                      {
                        text: 'Pâtées pour chien ',
                        link: 'https://www.ultrapremiumdirect.com/chien/patee/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/005023/4.jpg?v=125838132'
                      },
                      {
                        text: 'Friandise pour chien',
                        link: 'https://www.ultrapremiumdirect.com/chien/friandise/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/006007/4.jpg?v=-1667953575'
                      },
                      {
                        text: 'Compléments alimentaire chien',
                        link: 'https://www.ultrapremiumdirect.com/chien/complements/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/009008/3.jpg?v=1164782478'
                      },
                      {
                        text: 'Produits d\'Hygiène et soin',
                        link: 'https://www.ultrapremiumdirect.com/chien/hygiene/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/017002/2.jpg?v=-1944835691'
                      },
                      {
                        text: 'Box cadeau chien',
                        link: 'https://www.ultrapremiumdirect.com/produits/box-cadeau-pour-chien-hiver/',
                        image:
                          'https://medias.ultrapremiumdirect.com/tr:w-2208,h-2208/production/catalog/products/010012/3.jpg?v=-2085396759'
                      }
                    ]
                  },
                  style: {
                    padding: '2px',
                    paddingTop: '22px',
                    paddingBottom: '22px',
                    paddingLeft: '79px',
                    paddingRight: '79px'
                  },
                  titleStyle: {},
                  itemStyle: {
                    padding: '2px',
                    textAlign: 'center',
                    fontSize: '14px',
                    marginTop: '0px',
                    fontWeight: '600',
                    minWidth: '130px'
                  },
                  imageStyle: {
                    height: '130px',
                    width: '130px',
                    borderRadius: '114px',
                    'text-align': 'center',
                    marginBottom: '10px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    minWidth: '130px'
                  },
                  columnGap: '80px',
                  scroll: true,
                  sliderMode: true,
                  autoscroll: false,
                  scrollSpeed: 5,
                  absoluteArrows: true,
                  nextButton:
                    'https://api.iconify.design/heroicons:chevron-right.svg',
                  previousButton:
                    'https://api.iconify.design/heroicons:chevron-left.svg',
                  buttonStyle: {
                    padding: '8px',
                    margin: '0 4px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 20px 0px #00000040'
                  }
                }
              ],
              postMainProduct: [
                {
                  type: 'reco-slider',
                  enabled: false,
                  title: '',
                  titleStyle: { margin: '5px', maxWidth: '1340px' },
                  algo: {
                    filterRules: [
                      [
                        {
                          criteria: 'customLabel3',
                          operator: 'EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: '',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ]
                    ],
                    sortRules: [],
                    sort: '',
                    limit: 10,
                    deduplicate: ''
                  },
                  autoscroll: false,
                  scrollSpeed: 5,
                  absoluteArrows: true,
                  previousButton:
                    'https://api.iconify.design/heroicons:chevron-left.svg',
                  nextButton:
                    'https://api.iconify.design/heroicons:chevron-right.svg',
                  buttonStyle: {
                    padding: '8px',
                    margin: '0 4px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 20px 0px #00000040'
                  },
                  columnGap: '8px',
                  style: {
                    padding: '2px',
                    maxWidth: '1300px',
                    background: '#F1F1F1'
                  }
                },
                {
                  type: 'reco-slider',
                  enabled: true,
                  title: '',
                  titleStyle: { margin: '5px' },
                  algo: {
                    filterRules: [
                      [
                        {
                          criteria: 'productType',
                          operator: 'EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: 'productType',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ],
                      [
                        {
                          criteria: 'uri',
                          operator: 'NOT_EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: 'uri',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ],
                      [
                        {
                          criteria: 'itemGroupId',
                          operator: 'NOT_EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: 'itemGroupId',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ]
                    ],
                    sortRules: [
                      [
                        {
                          criteria: 'customLabel3',
                          operator: 'EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: 'customLabel3',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ],
                      [
                        {
                          criteria: 'customLabel1',
                          operator: 'EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: 'customLabel1',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ],
                      [
                        {
                          criteria: 'customLabel0',
                          operator: 'EQUAL',
                          type: 'baseProductValue',
                          value: '',
                          valueCriteria: '',
                          baseProductValue: 'customLabel0',
                          baseProductRegexpMatch: '',
                          baseProductRegexpReplace: ''
                        }
                      ]
                    ],
                    sort: '',
                    limit: 7,
                    deduplicate: 'itemGroupId'
                  },
                  autoscroll: false,
                  scrollSpeed: 5,
                  absoluteArrows: true,
                  previousButton:
                    'https://api.iconify.design/heroicons:chevron-left.svg',
                  nextButton:
                    'https://api.iconify.design/heroicons:chevron-right.svg',
                  buttonStyle: {
                    padding: '8px',
                    margin: '0 4px',
                    width: '44px',
                    height: '44px',
                    borderRadius: '9999px',
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 20px 0px #00000040'
                  },
                  columnGap: '16px',
                  style: {
                    padding: '2px',
                    maxWidth: '1340px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    background: '#F1F1F1',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    marginTop: '8px',
                    marginBottom: '8px'
                  }
                },
                {
                  type: 'banner',
                  enabled: true,
                  interval: 0,
                  elements: [
                    {
                      type: 'html',
                      html: '      <div class="lg:container flex justify-between items-start flex-wrap gap-4">\n        <div class="flex gap-2 items-center">\n          <img style="width: 40px"\n            src="https://lp.ultrapremiumdirect.com/storage/assets/af815a8035914f28ae65881dd56d8a86.card.png">\n          <div>\n            <div>Paiement <span class="font-bold">100% sécurisé</span></div>\n            <img style="width: 170px" src="https://lp.ultrapremiumdirect.com/storage/assets/23b5f96db83046c794aab098c096d372.payment.png" />\n          </div>\n        </div>\n        <div class="flex gap-2 items-center">\n          <img style="width: 40px"\n            src="https://lp.ultrapremiumdirect.com/storage/assets/de1933d97fd84617abca28c4a5a7f8b8.delivery.png">\n          <div>Livraison express <br> en <span class="font-bold">24 / 48h</span></div>\n        </div>\n        <div class="flex gap-2 items-center">\n          <img style="width: 40px"\n            src="https://lp.ultrapremiumdirect.com/storage/assets/a9935c36d7dc4b1b98debb2d1b9d656d.shipping.png">\n          <div class="font-medium">Livraison gratuite <br> à partir de 60€</div>\n        </div>\n        <div class="flex gap-2 items-center">\n          <img style="width: 40px"\n            src="https://lp.ultrapremiumdirect.com/storage/assets/bd7b0a1cabd5457aa6d40dbe94340040.discount.png">\n          <div>Abonnez-vous <br> <span class="font-bold">10% de réduction</span></div>\n        </div>\n      </div>',
                      text: '',
                      link: '',
                      style: { padding: '5px' }
                    }
                  ],
                  style: { marginTop: '26px', marginBottom: '26px' }
                }
              ],
              postMainReco: []
            },
            mainRecoParams: {
              limit: 24,
              deduplicate: 'itemGroupId',
              filterRules: [
                [
                  {
                    criteria: 'productType',
                    operator: 'EQUAL',
                    baseProductValue: 'productType'
                  }
                ]
              ],
              sortRules: [
                [
                  {
                    criteria: 'salePrice',
                    operator: 'LOWER',
                    valueCriteria: 'price'
                  }
                ]
              ]
            },
            sliderRecoParams: {
              limit: 10,
              filterRules: [
                [
                  {
                    criteria: 'productType',
                    operator: 'EQUAL',
                    baseProductValue: 'productType'
                  }
                ],
                [
                  {
                    criteria: 'channel',
                    operator: 'EQUAL',
                    baseProductValue: 'channel'
                  }
                ]
              ],
              sortRules: [
                [
                  {
                    criteria: 'salePrice',
                    operator: 'LOWER',
                    valueCriteria: 'price'
                  }
                ]
              ]
            },
            banners: [
              {
                text: '-5€ sur votre 1ère commande &gt; code <b>WELCOME</b>'
              }
            ],
            locale: 'fr-fr',
            messages: {
              'fr-fr': {
                searchPlaceholder: 'Essayer : croquettes pour grand chien',
                searchRedirectUrl: '',
                cartUrl: '',
                similar: 'Articles similaires',
                color: 'Couleur',
                sizes: 'Tailles',
                addToCart: 'Ajouter au panier',
                reinsuranceDelivery:
                  '<span class="font-bold">LIVRAISON</span> sous 1-3 jours',
                reinsuranceReturn:
                  '<span class="font-bold">ECHANGES ET RETOURS</span> gratuits en boutique',
                payLater:
                  'Payez <span class="font-bold">plus tard</span> ou <span class="font-bold">3X sans frais</span> dès 90€',
                moreInfo: 'En savoir plus',
                details: 'Voir détails',
                discover: 'Découvrir',
                disclaimer:
                  '*en vous abonnant vous vous engagez à accepter un minimum de 2 livraisons',
                ourSimilarProducts: 'Nos produits similaires',
                startingFrom: 'à partir de',
                subscriptionAvailable: 'Existe avec un abonnement',
                allTheProducts: 'Encore plus de choix !',
                discoverMoreProducts: 'Découvrir plus de produits',
                reinsurance1: 'Paiement <span class="font-medium">100% sécurisé</span>',
                reinsurance2: 'Livraison express <br>en <span class="font-medium">24 / 48h</span>',
                reinsurance3: '<span class="font-medium">Livraison gratuite <br>à partir de 60€</span>',
                reinsurance4: 'Abonnez-vous, <br class="hidden md:block" <span class="font-medium">10% de réduction</span>',
                reinsurance5: 'Ingrédients de haute qualité',
                reinsurance5Sub: 'Recettes complètes et équilibrées',
                reinsurance6: 'Prix direct usine',
                reinsurance6Sub: 'Economisez jusqu’à 40%',
                reinsurance7: 'Respect du régime naturel',
                reinsurance7Sub: 'Fabriqué sans Céréales - Super Premium',
                reinsurance8: 'Livraison express ',
                reinsurance8Sub: 'En 24/48h',
                format: 'Format',
                price: 'Prix',
                age: 'Age',
                specificities: 'Spécificités',
                size: 'Taille',
                sizeGuide: 'Guide des tailles',
                sizeGuideLink: '',
                myCart: 'Mon panier',
                pickUp: 'Retirer en magasin',
                productType: 'Type de produit',
                filterBy: 'Filter par',
                sortBy: 'Trier par',
                priceUp: 'Prix croissant',
                priceDown: 'Prix décroissant',
                brand: 'Marque',
                moreItems: 'Plus de propositions...',
                newsFooter:
                  'Nouveautés, promotions et offres en exclusivité avant tout monde !',
                showResults: 'Afficher les { count } résultats',
                review: '{n} avis'
              }
            },
            menu: [
              { text: 'Chien', href: '#' },
              { text: 'Chat', href: '#' },
              { text: 'La marque', href: '#' },
              { text: 'Contact', href: '#' }
            ],
            subMenu: [],
            footerColumns: [
              {
                title: 'Informations',
                items: [
                  { text: 'Mentions légales', href: '#' },
                  { text: 'Conditions générales de vente', href: '#' },
                  { text: 'Données personnelles', href: '#' }
                ]
              },
              {
                title: 'NOS SERVICES',
                items: [
                  { text: 'Pass\'Bébé', href: '#' },
                  { text: 'Programme de Fidélité', href: '#' },
                  { text: 'E-réservation', href: '#' },
                  { text: 'Nos moyens de paiement', href: '#' },
                  { text: 'Modes de livraison et retrait', href: '#' },
                  { text: 'Satisfait ou remboursé', href: '#' },
                  {
                    text: 'Retour et échange gratuits en magasin',
                    href: '#'
                  },
                  { text: 'Service clients personnalisé', href: '#' },
                  { text: 'Tous nos services', href: '#' }
                ]
              },
              {
                title: 'Nos services',
                items: [
                  { text: 'L\'abonnement', href: '#' },
                  { text: 'Parrainage', href: '#' },
                  { text: 'Avis clients', href: '#' },
                  { text: 'Livraison et retours', href: '#' },
                  { text: 'Paiement sécurisé', href: '#' },
                  { text: 'Tarifs professionnels', href: '#' },
                  { text: 'Affiliation', href: '#' },
                  { text: 'Aide & FAQ', href: '#' }
                ]
              },
              {
                title: 'La marque',
                items: [
                  { text: 'Nos engagements', href: '#' },
                  { text: 'Notre savoir-faire', href: '#' },
                  { text: 'Nos recettes Ultra Premium', href: '#' },
                  { text: 'Trouver l\'aliment adapté', href: '#' },
                  { text: 'Croquettes races de chien', href: '#' },
                  { text: 'Croquettes races de chat', href: '#' },
                  { text: 'Codes promo et bons de réduction', href: '#' },
                  { text: 'Le blog', href: '#' },
                  { text: 'Notre histoire', href: '#' },
                  { text: 'On parle de nous', href: '#' },
                  { text: 'On recrute', href: '#' },
                  { text: 'Index égalité Homme/Femme', href: '#' },
                  { text: 'Partenaires - Subventions', href: '#' }
                ]
              }
            ],
            crossSellData: {
              Demo: [
                {
                  text: 'Nouvelle collection',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/files/big_727593_5110_V1_1080x.png?v=1631004631'
                },
                {
                  text: 'Vestes et Manteaux',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/products/727407_2200_V5_600x.jpg?v=1631027312'
                },
                {
                  text: 'Tee-shirts',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/products/727593_9010_V4_600x.jpg?v=1631003250'
                },
                {
                  text: 'Chemises',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/products/725348_5080_V4_470x.jpg?v=1631002065'
                },
                {
                  text: 'Pantalons',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/products/724246_1400_V3_2048x2048.jpg?v=1631027254'
                },
                {
                  text: 'Costumes',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/products/723014_8080_V1_600x.jpg?v=1631027500'
                },
                {
                  text: 'Accessoires',
                  link: '',
                  image:
                    'https://shop.dataiads.io/cdn/shop/products/727872_7550_V1_470x.jpg?v=1631089842'
                }
              ]
            },
            cssVariables: {
              // customizable columns behavior
              '--catalog-grid-cols': 'repeat(2, minmax(0, 1fr))',
              '--md-catalog-grid-cols': 'repeat(2, minmax(0, 1fr))',
              '--lg-catalog-grid-cols': 'repeat(3, minmax(0, 1fr))',
              '--xl-catalog-grid-cols': 'repeat(3, minmax(0, 1fr))',
              '--2xl-catalog-grid-cols': 'repeat(3, minmax(0, 1fr))',
              '--3xl-catalog-grid-cols': 'repeat(3, minmax(0, 1fr))',

              '--catalog-grid-gap': '2px',
              '--md-catalog-grid-gap': '7.5px',
              '--lg-catalog-grid-gap': '15px',
              '--xl-catalog-grid-gap': '15px',
              '--2xl-catalog-grid-gap': '15px',
              '--3xl-catalog-grid-gap': '15px'
            }
          }
        : {}
    }
  },
  components: {
    'dirs': [
      {
        'path': './components/custom',
        global: true,
        extensions: ['.vue'],
        priority: 9
      }
    ]
  },
  nitro: {
    devProxy: {
      '/api/': {
        target: (process.env.PROXY_URL || lpoDomain) + '/api/',
        changeOrigin: true
      }
    }
  }
})