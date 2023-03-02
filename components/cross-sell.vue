<script lang="ts">
export type CrossSellData = Record<string, CrossSellItem[]>

export interface CrossSellItem {
    text: string
    link: string
}
</script>

<script setup lang="ts">
interface Props {
    data: CrossSellData
    dataKey: string
    class?: string|string[]
}

const props = withDefaults(defineProps<Props>(), {
    class: () => [],
})

const items = props.data[props.dataKey]

</script>

<template>
<template v-if="items">
    <slot name="title"></slot>

    <div :class="props.class">
        <template v-for="item in items">
            <a :href="item.link" v-if="$isSafeLink(item.link)">
                <slot name="item" :text="item.text"></slot>
            </a>
        </template>
   </div> 
</template>

</template>