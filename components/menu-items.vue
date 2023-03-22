<script setup lang="ts">
const lpoConfig = useLpoConfig()

interface Props {
    configKey?: "menu" | "subMenu" | "footerItems"
}

const props = withDefaults(defineProps<Props>(), {
    configKey: "menu"
})

let entries = lpoConfig[props.configKey] || []
</script>

<template>
    <template v-for="(item, index) in entries">
        <a v-if="item.href" :href="item.href" :style="{ color: item.color || 'inherit'}">
            <slot :text="item.text"></slot>
        </a>
        <span v-else :style="{ color: item.color || 'inherit'}">

            <slot :text="item.text"></slot>
        </span>
    </template>

</template>
