
<script setup lang="ts">
interface Props {
  filter: Recommender
  maxVisibleButtons?: number
  class?: string | string[]
  previousHandler?: (filter: Recommender, pageCount: number) => void
  nextHandler?: (filter: Recommender, pageCount: number) => void
  loadMoreHandler?: (filter: Recommender, nb: number) => void
}

const props = withDefaults(defineProps<Props>(), {
  maxVisibleButtons: 4,
  class: 'flex items-center',
  previousHandler: previousPaginationHandler,
  nextHandler: nextPaginationHandler,
  loadMoreHandler: loadMorePaginationHandler
})

const totalResults = props.filter.count
const staticLimit = props.filter.limit.value
const pageCount = computed(() => Math.ceil(totalResults.value / props.filter.limit.value))

const minVisiblePage = computed(() => Math.max(1, Math.ceil(props.filter.page.value - (props.maxVisibleButtons / 2))))
const maxVisiblePage = computed(() => Math.min(pageCount.value, minVisiblePage.value + props.maxVisibleButtons - 1))

const range = (min: number, max: number): number[] => {
  const items: number[] = []
  for (let i = min; i <= Math.max(min, max); i++) {
    items.push(i)
  }
  return items
}
</script>

<template>
  <nav :class="props.class">
    <div v-if="props.filter.page.value > 1" alt="go to previous page" @click="() => previousHandler(filter, pageCount)">
      <slot name="previous-button">
        <button type="button">
          &lt;
        </button>
      </slot>
    </div>

    <template v-for="index in range(minVisiblePage, maxVisiblePage)" :key="index">
      <div :alt="`go to page ${index}`" @click="props.filter.page.value = index">
        <slot name="page-button" :number="index" :active="index == props.filter.page.value">
          <button type="button">
            {{ index }}
          </button>
        </slot>
      </div>
    </template>

    <div v-if="props.filter.page.value < pageCount" alt="go to next page" @click="() => nextHandler(filter, pageCount)">
      <slot name="next-button">
        <button type="button">
          &gt;
        </button>
      </slot>
    </div>

    <div v-if="props.filter.page.value < pageCount" alt="load more results" @click="() => loadMoreHandler(filter, staticLimit)">
      <slot name="load-more-button" :current="props.filter.limit" :total="totalResults" />
    </div>
  </nav>
</template>