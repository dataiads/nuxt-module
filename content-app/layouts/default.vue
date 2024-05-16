<script setup lang="ts">
const open = ref(false)
const layoutConfig = useLpoConfig().customLayout
const defineLayoutConfigLayer = () => {
  layoutConfig.layer = layoutConfig.layer = {
    enabled: true,
    algo: {
      filterRules: [
        [
          {
            criteria: 'googleProductCategory',
            operator: 'EQUAL',
            type: 'baseProductValue',
            value: '',
            valueCriteria: '',
            baseProductValue: 'googleProductCategory',
            baseProductRegexpMatch: '',
            baseProductRegexpReplace: ''
          },
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
            criteria: 'gender',
            operator: 'EQUAL',
            type: 'baseProductValue',
            value: '',
            valueCriteria: '',
            baseProductValue: 'gender',
            baseProductRegexpMatch: '',
            baseProductRegexpReplace: ''
          }
        ]
      ],
      sortRules: [
        [
          {
            criteria: 'color',
            operator: 'EQUAL',
            type: 'baseProductValue',
            value: '',
            valueCriteria: '',
            baseProductValue: 'color',
            baseProductRegexpMatch: '',
            baseProductRegexpReplace: ''
          }
        ]
      ],
      sort: '',
      limit: 10,
      deduplicate: 'itemGroupId'
    },
    position: 'top',
    delay: 0,
    hideOnScroll: true,
    style: {
      padding: '5px',
      backgroundColor: 'white'
    },
    backdropStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    title: 'VIEW MORE PRODUCTS',
    titleStyle: {
      margin: '5px',
      fontWeight: '500',
      fontSize: '14px',
      letterSpacing: '1px'
    },
    gridStyle: {
      display: 'flex',
      gap: '26px'
    },
    itemLayout: 'default',
    itemStyle: {
      style: {
        padding: '5px'
      },
      imageStyle: {
        display: 'flex',
        justifyContent: 'center',
        height: '178px',
        width: '100%',
        minWidth: '178px'
      },
      titleStyle: {
        font: '14px',
        display: 'none'
      },
      priceStyle: {
        accentColor: '#ff0000',
        display: 'none'
      },
      salePriceContainerStyle: {
        display: 'none',
        justifyContent: 'center'
      },
      salePriceStyle: {
        fontWeight: 'bold',
        display: 'none'
      },
      salePriceOriginalPriceStyle: {
        color: '#000000',
        textDecoration: 'line-through',
        display: 'none'
      }
    },
    sliderMode: false,
    nextButton: 'https://storage.googleapis.com/dataiads-cdn/assets/chevron-right.svg',
    previousButton: 'https://storage.googleapis.com/dataiads-cdn/assets/chevron-left.svg',
    columnGap: '10px',
    autoscroll: false,
    scrollSpeed: 5,
    absoluteArrows: true,
    buttonStyle: {
      width: '32px',
      backgroundColor: 'white',
      borderRadius: '99999px',
      paddingLeft: '4px',
      paddingRight: '4px',
      paddingTop: '4px',
      paddingBottom: '4px',
      marginRight: '8px',
      marginLeft: '8px'
    }
  }
}
defineLayoutConfigLayer()
</script>

<template>
  <div>
    <Button @click="open = !open">
      Open
    </Button>
    <CommandSearch v-model="open" />
  </div>
  <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
    <div>
      <nav>
        <ContentNavigation v-slot="{ navigation }">
          <DocsNavLink class="flex flex-col gap-4" :links="navigation" />
        </ContentNavigation>
      </nav>
    </div>
    <div class="xl:grid xl:grid-cols-[1fr,250px] xl:gap-5">
      <slot />
    </div>
  </div>
</template>