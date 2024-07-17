<script setup lang="ts">
const config = {
  'type': 'reco-slider',
  'enabled': true,
  'title': 'Produits similaires en promotion',
  'titleStyle': {
    'fontSize': '16px',
    'marginBottom': '16px',
    'paddingRight': '10px',
    'paddingLeft': '0',
    'marginTop': '16px'
  },
  'algo': {
    'filterRules': [
      [
        {
          'criteria': 'productType',
          'operator': 'EQUAL',
          'type': 'baseProductValue',
          'value': '',
          'valueCriteria': '',
          'baseProductValue': 'productType',
          'baseProductRegexpMatch': '',
          'baseProductRegexpReplace': ''
        }
      ],
      [
        {
          'criteria': 'uri',
          'operator': 'NOT_EQUAL',
          'type': 'baseProductValue',
          'value': '',
          'valueCriteria': '',
          'baseProductValue': 'uri',
          'baseProductRegexpMatch': '',
          'baseProductRegexpReplace': ''
        }
      ]
    ],
    'sortRules': [
      [
        {
          'criteria': 'customLabel1',
          'operator': 'EQUAL',
          'type': 'value',
          'value': 'PLA Promo',
          'valueCriteria': '',
          'baseProductValue': '',
          'baseProductRegexpMatch': '',
          'baseProductRegexpReplace': ''
        }
      ],
      [
        {
          'criteria': 'price',
          'operator': 'GREATER',
          'type': 'baseProductValue',
          'value': '',
          'valueCriteria': '',
          'baseProductValue': 'multiply(price, 0.80)',
          'baseProductRegexpMatch': '',
          'baseProductRegexpReplace': ''
        }
      ],
      [
        {
          'criteria': 'price',
          'operator': 'LOWER',
          'type': 'baseProductValue',
          'value': '',
          'valueCriteria': '',
          'baseProductValue': 'multiply(price, 1.30)',
          'baseProductRegexpMatch': '',
          'baseProductRegexpReplace': ''
        }
      ],
      [
        {
          'criteria': 'color',
          'operator': 'EQUAL',
          'type': 'baseProductValue',
          'value': '',
          'valueCriteria': '',
          'baseProductValue': 'color',
          'baseProductRegexpMatch': '',
          'baseProductRegexpReplace': ''
        }
      ]
    ],
    'sort': '',
    'limit': 10,
    'deduplicate': 'mpn'
  },
  'autoscroll': false,
  'scrollSpeed': 5,
  'absoluteArrows': true,
  'previousButton': 'https://api.iconify.design/heroicons:chevron-left.svg',
  'nextButton': 'https://api.iconify.design/heroicons:chevron-right.svg',
  'buttonStyle': {
    'width': '40px',
    'height': '40px',
    'backgroundColor': 'white',
    'color': '#FFF',
    'borderRadius': '99999px',
    'zIndex': '21'
  },
  'columnGap': '16px',
  'style': {
    'paddingLeft': '16px',
    'paddingRight': '16px',
    'marginTop': '32px'
  },
  'itemLayout': 'reco-slider-slot',
  'itemStyle': {
    'style': {
      'padding': '5px'
    },
    'imageStyle': {
      'display': 'flex',
      'justifyContent': 'center'
    },
    'titleStyle': {
      'font': '14px'
    },
    'priceStyle': {
      'color': '#ff0000'
    },
    'salePriceContainerStyle': {
      'display': 'flex',
      'justifyContent': 'center'
    },
    'salePriceStyle': {
      'fontWeight': 'bold'
    },
    'salePriceOriginalPriceStyle': {
      'color': '#000000',
      'textDecoration': 'line-through'
    }
  },
  arrowPlacement: 'inside'
}
</script>

<template>
  <CustomLayoutRecoSlider :config="config">
    <template #reco-slider-item="{ item }">
      <img :src="item[0].data.imageLink">
    </template>
  </CustomLayoutRecoSlider>
</template>

<style lang="scss">
.reco-slider-title {
  @apply text-2xl font-bold;
}
.reco-slider-item {
  @apply basis-[150px]
}
</style>