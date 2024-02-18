<script setup lang="ts">
const customLayout = useCustomLayout()
const config = useLpoConfig().customLayout.mainReco

/** WIP: Only for testing purpose 
config.filterParamsButtonEraseStyle = {
  padding: '10px',
  flexBasis: '50%'
}

config.filterParamsButtonValidateStyle = {
  padding: '10px',
  flexBasis: '50%'
}
*/

/** Remove all rule from the filter to reset */
const removeAllRule = () => {
  config.filterParams.forEach((cat, i) => {
    cat.elements.forEach((el, j) => {
      customLayout!.filter.removeAllRules(el.props.group)
      if (el.component === 'range') {
        customLayout!.filter.removeAllRules(`auto-${i}-${j}-min`)
        customLayout!.filter.removeAllRules(`auto-${i}-${j}-max`)
      }
    })
  })
}
</script>

<template>
  <div id="filters-buttons" class="flex">
    <button v-if="config.filterParamsButtonEraseStyle" :style="config.filterParamsButtonEraseStyle" @click="removeAllRule">
      {{ $t('filterEraseText') }}
    </button>
    <button v-if="config.filterParamsButtonValidateStyle" :style="config.filterParamsButtonValidateStyle" @click="customLayout?.toggleFiltersSlideover">
      {{ $t('filterValidateText') }}
    </button>
  </div>
</template>