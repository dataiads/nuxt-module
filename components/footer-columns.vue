<script setup lang="ts">
const lpoConfig = useLpoConfig()

let columns = lpoConfig.footerColumns || []
</script>

<template>
    <div class="flex flex-col" v-for="(column, index) in columns" :key="index">
    <slot name="column-title" :text="column.title"></slot>
    <ul>
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