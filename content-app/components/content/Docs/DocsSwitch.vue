<script setup lang="ts">

const config = {
  'global': {
    'colors': []
  },
  'mainReco': {
    'filterParams': [
      {
        'title': 'Switch',
        'elements': [
          {
            'component': 'switch',
            'props': {
              'criteria': 'salePrice',
              'operator': 'LOWER',
              'displayCount': false,
              'useTranslation': false,
              'prechecked': false,
              'searchable': false,
              'searchPlaceholder': '',
              'min': '0',
              'max': '0',
              'minPlaceholder': '',
              'maxPlaceholder': '',
              'label': 'Toggle',
              'value': '',
              'value-criteria': 'price',
              'step': 0,
              'trailling': '',
              'placeholder': '',
              'autoMinMax': false,
              'icon': '',
              'type': '',
              'ariaLabel': '',
              'valuesFilter': '',
              'subTitle': '',
              'subTitleStyle': {},
              'starSize': '',
              'starFullImg': '',
              'starEmptyImg': '',
              'starsLabelTitle': '',
              'moreLabelTitle': '',
              'seeMore': false,
              'limit': 0,
              'seeMoreText': '',
              'seeLessText': ''
            }
          }
        ],
        'style': {}
      }
    ]
  }
}

const customLayout = useCustomLayout()
</script>

<template>
  <CustomLayoutFiltersAside :config="config" :filter="customLayout.filter" />
</template>

<style lang="scss">

.filters-switch {
  @apply relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E75113] focus:ring-offset-2;

  &>span {
    @apply inline-block h-4 w-4 transform rounded-full bg-white transition-transform;
  }

  &__on {
    @apply bg-[#E75113];

    & span {
      @apply translate-x-6;
    }
  }

  &__off {
    @apply bg-gray-200;

    & span {
      @apply translate-x-1
    }
  }
}
</style>