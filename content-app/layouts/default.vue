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
  <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <Button class="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64 ml-auto" variant="outline" @click="open = !open">
        <span>
          Search documentation...
        </span>
        <kbd
          class="absolute pointer-events-none right-[0.3rem] top-[0.3rem] inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
        >
          <span class="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandSearch v-model="open" />
    </div>
  </header>
  <div class="flex-1 items-start md:grid md:grid-cols-[120px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[120px_minmax(0,1fr)] px-4">
    <div class="py-6">
      <nav>
        <ContentNavigation v-slot="{ navigation }">
          <DocsNavLink class="flex flex-col gap-4" :links="navigation" />
        </ContentNavigation>
      </nav>
    </div>
    <div class="xl:grid xl:grid-cols-[minmax(0,1fr)_16px] xl:gap-5 py-6">
      <slot />
    </div>
  </div>
</template>