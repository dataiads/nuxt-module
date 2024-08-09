<script setup lang="ts">
const customLayout = useCustomLayout()
const config = useLpoConfig().customLayout.mainReco

const validateFilter = () => {
  customLayout?.toggleFiltersSlideover()
  if(config.filtersDisplay === 'left-high') {
    nextTick(() => {
      const catalogGrid = document.getElementById('catalog-grid')
      if(catalogGrid) catalogGrid.scrollIntoView({behavior: 'smooth'})
    })
  }
}


</script>

<template>
  <div id="filters-buttons" class="flex">
    <button
      v-if="config.filterParamsButtonEraseEnable"
      :style="config.filterParamsButtonEraseStyle"
      @click="customLayout?.filter.reset()"
    >
      {{ config.filterParamsButtonEraseText }}
    </button>
    <button
      v-if="config.filterParamsButtonValidateEnable"
      :style="config.filterParamsButtonValidateStyle"
      @click="validateFilter"
    >
      {{ config.filterParamsButtonValidateText }}
    </button>
  </div>
</template>