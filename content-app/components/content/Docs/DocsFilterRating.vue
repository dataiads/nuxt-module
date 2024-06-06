<script setup lang="ts">
const config = {
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
        'starFullImg': 'https://api.iconify.design/heroicons:star-solid.svg',
        'starEmptyImg': 'https://api.iconify.design/heroicons:star.svg',
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
</script>

<template>
  <h1>bonjour</h1>
</template>