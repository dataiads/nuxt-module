<script setup lang="ts">
const lpoConfig = useLpoConfig()

interface Props {
  columnClass?: string|string[]
  columnListClass?: string|string[]
}
const props = withDefaults(defineProps<Props>(), {
  columnClass: '',
  columnListClass: ''
})

const columns = lpoConfig.footerColumns || []



</script>

<template>
  <div v-for="(column, index) in columns" :key="index" class="flex flex-col" :class="props.columnClass">
    <slot name="column-title" :text="column.title" />
    <ul :class="props.columnListClass">
      <li v-for="(item, itemIndex) in column.items" :key="itemIndex">
        <a v-if="item.href" :href="item.href">
          <slot name="column-item" :text="item.text" />
        </a>
        <span v-else>
          <slot name="column-item" :text="item.text" />
        </span>
      </li>
    </ul>
  </div>
</template>