<script setup lang="ts">
const lpoConfig = useLpoConfig()

interface Props {
    columnClass?: string|string[]
    columnListClass?: string|string[]
}
const props = withDefaults(defineProps<Props>(), {
    columnClass: "",
    columnListClass: "",
})

let columns = lpoConfig.footerColumns || []



</script>

<template>
    <div class="flex flex-col" :class="props.columnClass" v-for="(column, index) in columns" :key="index">
        <slot name="column-title" :text="column.title"></slot>
        <ul :class="props.columnListClass">
            <li v-for="(item, itemIndex) in column.items" :key="itemIndex">
                <a v-if="item.href" :href="item.href">
                    <slot name="column-item" :text="item.text"></slot>
                </a>
                <span v-else>
                    <slot name="column-item" :text="item.text"></slot>
                </span>
            </li>
        </ul>
    </div>
</template>