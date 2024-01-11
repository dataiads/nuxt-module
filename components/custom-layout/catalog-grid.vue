

<script setup lang="ts">
import type { MainRecoParams } from '~/types';
import { vIntersectionObserver } from '@vueuse/components';

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
    <div v-if="customLayout?.filter.results?.data?.value?.length" :style="config.gridStyle" id="catalog-grid">
        <template v-for="(item, index) in customLayout.filter.results.data.value"
            :key="item.id ? item.id : JSON.stringify(item)">
            <slot name="filters-content-grid-item" :item="item" :index="index" />
        </template>
    </div>
    <slot v-else name="filters-no-results" />
    <!-- intersection observer for infinite scroll pagination type -->
    <div v-intersection-observer="onIntersect" v-if="config.paginationType === 'scroll'"></div>
</template>
