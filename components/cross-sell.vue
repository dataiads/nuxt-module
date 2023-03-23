<script setup lang="ts">

interface Props {
    // tags data key
    dataKey: string

    // override tags data from lpo config
    data?: CrossSellData

    // override key matching algorithm
    keyMatcher?: (productKey: string, dataKey: string) => boolean

    class?: string|string[]
}

const props = withDefaults(defineProps<Props>(), {
    class: () => [],

    // default key matcher: match by prefix
    keyMatcher: (productKey: string, dataKey: string) => productKey.indexOf(dataKey) == 0
})

const lpoConfig = useLpoConfig()

let data: CrossSellData = {}
let items: CrossSellItem[] = []

if (props.data) {
    data = props.data
} else if (lpoConfig.crossSellData) {
    data = lpoConfig.crossSellData
}

if (data) {
    for (const [dataKey, value] of Object.entries(data)) {
        if (props.keyMatcher(props.dataKey, dataKey)) {
            items = value
            break
        }
    }
}
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