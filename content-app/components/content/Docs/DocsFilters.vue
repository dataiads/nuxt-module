<script setup lang="ts">
const config = {
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
            max: '1000',
            minPlaceholder: 'Min €',
            maxPlaceholder: 'Max €',
            label: '',
            value: '',
            'value-criteria': '',
            step: 5,
            trailling: '€',
            placeholder: '',
            autoMinMax: false,
            icon: '',
            type: 'text',
            ariaLabel: '',
            valuesFilter: '',
            subTitle: '',
            subTitleStyle: {},
            starSize: '18px',
            starFullImg: '',
            starEmptyImg: '',
            starsLabelTitle: '',
            moreLabelTitle: '',
            seeMore: false,
            limit: 5,
            seeMoreText: 'See more',
            seeLessText: 'See less'
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
      title: 'Taille',
      elements: [
        {
          component: 'autolist-checkbox',
          props: {
            criteria: 'size',
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
            autoMinMax: false,
            icon: '',
            type: 'text',
            ariaLabel: '',
            valuesFilter: '',
            subTitle: '',
            subTitleStyle: {},
            starSize: '18px',
            starFullImg: '',
            starEmptyImg: '',
            starsLabelTitle: '',
            moreLabelTitle: '',
            seeMore: false,
            limit: 5,
            seeMoreText: 'See more',
            seeLessText: 'See less'
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
      title: 'Couleur',
      elements: [
        {
          component: 'autolist-checkbox',
          props: {
            criteria: 'color',
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
            autoMinMax: false,
            icon: '',
            type: 'text',
            ariaLabel: '',
            valuesFilter: '',
            subTitle: '',
            subTitleStyle: {},
            starSize: '18px',
            starFullImg: '',
            starEmptyImg: '',
            starsLabelTitle: '',
            moreLabelTitle: '',
            seeMore: false,
            limit: 5,
            seeMoreText: 'See more',
            seeLessText: 'See less'
          }
        }
      ],
      style: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '320px',
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
  filterParamsDisableInteractions: false,
  filterParamsClosedIcon:
    'https://api.iconify.design/heroicons:chevron-up.svg',
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
  filterParamsButtonEraseEnable: false,
  filterParamsButtonEraseText: 'Reset',
  filterParamsButtonEraseStyle: {},
  filterParamsButtonValidateEnable: false,
  filterParamsButtonValidateText: 'Validate',
  filterParamsButtonValidateStyle: {},
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
          criteria: 'availability',
          operator: 'EQUAL',
          type: 'value',
          value: 'in stock',
          valueCriteria: '',
          baseProductValue: '',
          baseProductRegexpMatch: '',
          baseProductRegexpReplace: ''
        }
      ]
    ],
    sortRules: [
      [
        {
          criteria: 'salePrice',
          operator: 'LOWER',
          type: 'valueCriteria',
          value: '',
          valueCriteria: 'price',
          baseProductValue: '',
          baseProductRegexpMatch: '',
          baseProductRegexpReplace: ''
        }
      ],
      [
        {
          criteria: 'price',
          operator: 'GREATER',
          type: 'baseProductValue',
          value: '',
          valueCriteria: '',
          baseProductValue: 'multiply(price, 0.80)',
          baseProductRegexpMatch: '',
          baseProductRegexpReplace: ''
        }
      ],
      [
        {
          criteria: 'price',
          operator: 'LOWER',
          type: 'baseProductValue',
          value: '',
          valueCriteria: '',
          baseProductValue: 'multiply(price, 1.30)',
          baseProductRegexpMatch: '',
          baseProductRegexpReplace: ''
        }
      ]
    ],
    sort: '',
    limit: 12,
    deduplicate: 'mpn'
  },
  filterStyle: {
    width: '250px',
    marginTop: '50px'
  },
  gridStyle: {
    display: 'grid',
    gap: '30px 15px',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '16px'
  },
  itemLayout: 'filters-content-grid-item',
  itemStyle: {
    style: {
      padding: '5px'
    },
    imageStyle: {
      display: 'flex',
      justifyContent: 'center'
    },
    titleStyle: {
      font: '14px'
    },
    priceStyle: {
      color: '#ff0000'
    },
    salePriceContainerStyle: {
      display: 'flex',
      justifyContent: 'center'
    },
    salePriceStyle: {
      fontWeight: 'bold'
    },
    salePriceOriginalPriceStyle: {
      color: '#000000',
      textDecoration: 'line-through'
    }
  },
  paginationContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    columnGap: '10px',
    marginBottom: '20px',
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingRight: '15px',
    paddingLeft: '15px',
    marginTop: '20px'
  },
  paginationButtonStyle: {
    paddingTop: '10px',
    paddingRight: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    backgroundColor: '#ededed',
    borderRadius: '2px'
  }
}
</script>

<template>
  <!-- 
    <FiltersWrapper :config="config">
      <FiltersHeaderTitle />
      <Accordion type="single" class="w-full" collapsible>
        <FiltersPanel v-for="panel in config.filterParams" :key="panel.title" :panel="panel" />
      </Accordion>
    </FiltersWrapper>
    -->
</template>
