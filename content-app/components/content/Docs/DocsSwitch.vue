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
              'label': 'Not activated',
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

const state = ref(config.mainReco.filterParams[0].elements[0].props.label)

const setActivated = () => {
  state.value = state.value !== 'Activated' ? 'Activated' : 'Not activated'
}

</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <p>{{ state }}</p>
    
    <Switch :class="[`data-[state=unchecked]:bg-input`, `data-[state=checked]:bg-primary`, `data-[disabled]:bg-input`]" :disabled="false" @update:checked="setActivated" />
  </div>
</template>

