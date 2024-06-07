<script setup lang="ts">
const config = {
  'global': {
    'colors': [
      { 'name': 'Beige', 'value': '#DBB58E' },
      { 'name': 'Bleu', 'value': '#014C90' }
    ]
  },
  'mainReco': {
    'filtersDisplay': 'left',
    'filtersTitle': 'Filtrer par',
    'filtersTitleStyle': {
      'fontSize': '14px',
      'fontWeight': '400',
      'backgroundColor': '#F2F2F5',
      'paddingLeft': '5px',
      'height': '47px',
      'display': 'flex',
      'alignItems': 'center',
      'border-top': '1px solid #E6E6EB'
    },
    'slideoverStyle': {
      'background': '#ffffff',
      'width': '75%',
      'height': '100%',
      'left': '25%',
      'overflowY': 'scroll',
      'position': 'relative'
    },
    'slideoverCloseButton': 'https://storage.googleapis.com/dataiads-cdn/assets/x-mark-solid.svg',
    'slideoverCloseButtonStyle': {
      'width': '18px',
      'height': '18px',
      'marginRight': '16px',
      'marginTop': '16px',
      'cursor': 'pointer'
    },
    'filterParams': [
      {
        'title': 'Note',
        'elements': [
          {
            'component': 'rating',
            'props': {
              'criteria': 'extraDataCustomAttributeNumeric.review-value',
              'operator': 'RANGE',
              'displayCount': true,
              'useTranslation': false,
              'prechecked': false,
              'searchable': false,
              'searchPlaceholder': 'Search...',
              'min': '0',
              'max': '10000',
              'minPlaceholder': 'Min',
              'maxPlaceholder': 'Max',
              'label': '',
              'value': '',
              'value-criteria': '',
              'step': 5,
              'trailling': '€',
              'placeholder': '',
              'autoMinMax': false,
              'icon': '',
              'type': 'text',
              'ariaLabel': '',
              'valuesFilter': '',
              'subTitle': '',
              'subTitleStyle': {},
              'starSize': '12px',
              'starFullImg': 'https://lp.kiabi.com/storage/assets/19acd797b1ce43bf9d88d755989a4629.star-full.svg',
              'starEmptyImg': 'https://lp.kiabi.com/storage/assets/00dcb6a45067476d8b2a574a1562e9ae.star-empty.svg',
              'starsLabelTitle': '',
              'moreLabelTitle': '',
              'seeMore': false,
              'limit': 5,
              'seeMoreText': 'See more',
              'seeLessText': 'See less'
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
.filters-rating {
  @apply border-none
}
</style>