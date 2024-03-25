

<script setup lang="ts">
import type { MainRecoParams } from '~/types'
import { vIntersectionObserver } from '@vueuse/components'

defineProps<{
  config: MainRecoParams;
}>()

const customLayout = useCustomLayout()

const { y: yScroll } = useWindowScroll()

const onIntersect = () => {
  if (
    customLayout &&
    // user scrolled
    yScroll.value > 0 &&
    // initial recommendations loaded
    customLayout.filter.count.value > 0 &&
    // limit still under total count
    customLayout.filter.limit.value < customLayout.filter.count.value
  ) {
    customLayout.filter.loadMore()
  }
}

</script>


<template>
  <div v-if="customLayout?.filter.results?.data?.value?.length" id="catalog-grid" :style="config.gridStyle">
    <template v-for="(item, index) in customLayout.filter.results.data.value" :key="item.id ? item.id : JSON.stringify(item)">
      <slot v-if="(config.itemLayout ?? 'filters-content-grid-item') === 'filters-content-grid-item'" name="filters-content-grid-item" :item="item" :index="index" />
      <slot v-else-if="config.itemLayout === 'reco-slider-slot'" name="reco-slider-item" :item="item" :index="index" />
      <CustomLayoutRecoItem v-else-if="config.itemLayout === 'default'" :config="{ style: config.itemStyle, item }" />
    </template>
  </div>
  <slot v-else name="filters-no-results" />
  <!-- intersection observer for infinite scroll pagination type -->
  <div v-if="config.paginationType === 'scroll'" v-intersection-observer="onIntersect" />
</template>
