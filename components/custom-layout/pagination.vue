<script setup lang="ts">
import type { MainRecoParams, StructuredRecommender } from '~/types'

const props = defineProps<{
  filter: StructuredRecommender,
  config: MainRecoParams;
}>()

const { page, limit, count } = props.filter

const pageCount = computed(() => Math.ceil(count.value / limit.value))
const minVisiblePage = computed(() => Math.max(1, Math.ceil(page.value - (props.config.paginationMaxVisibleButtons / 2))))
const maxVisiblePage = computed(() => Math.min(pageCount.value, minVisiblePage.value + props.config.paginationMaxVisibleButtons - 1))

const range = (min: number, max: number): number[] => {
  const items: number[] = []
  for (let i = min; i <= Math.max(min, max); i++) {
    items.push(i)
  }
  return items
}

const previousHandler = () => {
  if (page.value > 1) {
    page.value -= 1
  }
}
const nextHandler = () => {
  if (page.value < (count.value / limit.value)) {
    page.value += 1
  }
}

// store initial limit for stable inscreases using loadMore
const initialLimit = limit.value

const loadMoreHandler = () => {
  limit.value += initialLimit
}

// handle deprecated load more parameter
let paginationType = props.config.paginationType
if (!paginationType) {
  paginationType = props.config.paginationLoadMoreMode ? 'more' : 'page'
}
</script>

<template>
  <nav class="w-full" :style="config.paginationContainerStyle">
    <template v-if="paginationType === 'more'">
      <button
        v-if="page < pageCount"
        :style="config.paginationButtonStyle"
        alt="load more results"
        @click="filter.loadMore"
      >
        <DynamicLabel :value="config.paginationLoadMoreText" />
      </button>
    </template>

    <template v-else-if="paginationType === 'page'">
      <button v-if="page > 1" :style="config.paginationButtonStyle" alt="go to previous page" @click="previousHandler">
        <img
          v-if="config.paginationPreviousImage"
          :src="config.paginationPreviousImage"
          :style="config.paginationImageStyle"
        >
        <template v-else>
          {{ config.paginationPreviousText }}
        </template>
      </button>

      <template v-for="index in range(minVisiblePage, maxVisiblePage)" :key="index">
        <button
          v-if="index === page"
          :alt="`go to page ${index}`"
          :style="[config.paginationButtonStyle, config.paginationActiveButtonStyle]"
        >
          {{ index }}
        </button>
        <button v-else :alt="`go to page ${index}`" :style="config.paginationButtonStyle" @click="page = index">
          {{ index }}
        </button>
      </template>

      <button
        v-if="page < pageCount"
        :style="config.paginationButtonStyle"
        alt="go to previous page"
        @click="nextHandler"
      >
        <img v-if="config.paginationNextImage" :src="config.paginationNextImage" :style="config.paginationImageStyle">
        <template v-else>
          {{ config.paginationNextText }}
        </template>
      </button>
    </template>
  </nav>
</template>