<script setup lang="ts">
const customLayout = useCustomLayout()
const config = useLpoConfig().customLayout.mainReco

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
      @click="customLayout?.toggleFiltersSlideover"
    >
      {{ config.filterParamsButtonValidateText }}
    </button>
  </div>
</template>