<script setup lang="ts">
import type { MainRecoParams, StructuredRecommender } from '~/types'

const props = defineProps<{
    filter: StructuredRecommender;
    config: MainRecoParams;
}>()

const pageCount = computed(() =>
    Math.ceil(props.filter.count / props.filter.limit)
)
const minVisiblePage = computed(() => Math.max(1, Math.ceil(props.filter.page - (props.config.paginationMaxVisibleButtons / 2))))
const maxVisiblePage = computed(() => Math.min(pageCount.value, minVisiblePage.value + props.config.paginationMaxVisibleButtons - 1))

const range = (min: number, max: number): number[] => {
    console.log('min', min, 'mas', max)
    const items: number[] = []
    for (let i = min; i <= Math.max(min, max); i++) {
        items.push(i)
    }
    return items
}

const previousHandler = () => {
    if (props.filter.page > 1) {
        props.filter.page -= 1
    }
}
const nextHandler = () => {
    if (props.filter.page < (props.filter.count / props.filter.limit)) {
        props.filter.page += 1
    }
}

const loadMoreHandler = () => {
    props.filter.limit += props.filter.limit
}
</script>

<template>
    <nav class="w-full" :style="config.paginationContainerStyle">
        <template v-if="config.paginationLoadMoreMode">
            <button v-if="filter.page < pageCount" :style="config.paginationButtonStyle" alt="load more results"
                @click="loadMoreHandler">
                {{ config.paginationLoadMoreText }}
            </button>
        </template>

        <template v-else>
            <button v-if="filter.page > 1" :style="config.paginationButtonStyle" alt="go to previous page"
                @click="previousHandler">
                <img v-if="config.paginationPreviousImage" :src="config.paginationPreviousImage"
                    :style="config.paginationImageStyle">
                <template v-else>
                    {{ config.paginationPreviousText }}
                </template>
            </button>

            <template v-for="index in range(minVisiblePage, maxVisiblePage)" :key="index">
                <button v-if="index === filter.page" :alt="`go to page ${index}`"
                    :style="[config.paginationButtonStyle, config.paginationActiveButtonStyle]">
                    {{ index }}
                </button>
                <button v-else :alt="`go to page ${index}`" :style="config.paginationButtonStyle"
                    @click="filter.page = index">
                    {{ index }}
                </button>
            </template>

            <button v-if="filter.page < pageCount" :style="config.paginationButtonStyle" alt="go to previous page"
                @click="nextHandler">
                <img v-if="config.paginationNextImage" :src="config.paginationNextImage"
                    :style="config.paginationImageStyle">
                <template v-else>
                    {{ config.paginationNextText }}
                </template>
            </button>
        </template>
    </nav>
</template>