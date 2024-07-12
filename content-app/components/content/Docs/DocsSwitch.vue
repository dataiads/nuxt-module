<script setup lang="ts">
import { Switch } from '@/components/ui/Switch'

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
              'label': 'Switch',
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

const isActivated = ref(false)
</script>

<template>
  <Switch :class="[`data-[state=unchecked]:bg-input`, `data-[state=checked]:bg-primary`]" @update:checked="isActivated = !isActivated">
    <template #default>
      {{ isActivated ? 'Activated' : 'Not activated' }}
    </template>
  </Switch>
</template>

