<script setup lang="ts">
const config = {
  enabled: true,
  position: 'bottom',
  delay: 0,
  hideOnScroll: false,
  style: {},
  backdropStyle: {},
  title: 'Mon titre',
  titleStyle: {},
  gridStyle: {},
  algo: {
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

  itemLayout: 'default',
  itemStyle: {}

  // sliderMode: boolean;
  //nextButton: string;
  //previousButton: string;
  //columnGap: string;
  // autoscroll: boolean;
  //  scrollSpeed: number;
  // absoluteArrows: boolean;
  // buttonStyle: StyleValue;
}
</script>

<template>
      <CustomLayoutLayer :config="config">
        <template #reco-slider-item="{ item }">
          <img :src="item[0].data.imageLink">
        </template>
    </CustomLayoutLayer>

  
</template>