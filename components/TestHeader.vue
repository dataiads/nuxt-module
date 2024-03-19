<script setup lang="ts">
const lpoConfig = useLpoConfig();
const headerMenu = lpoConfig?.menu ? lpoConfig?.menu : [];

const defaultUI = {
    container: 'lg:container mx-auto flex items-center justify-between gap-3',
    left: "flex items-center justify-between lg:flex-1 gap-2",
    item: "duration-200 hover:text-secondary",
    logo: "flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-2",
    center: "hidden lg:flex lg:flex-1 justify-between gap-x-8",
    right: "flex items-center justify-end lg:flex-1 gap-2"
}

const props = defineProps<{
    ui: typeof defaultUI
}>();

const { ui } = useUI(defaultUI, toRefs(props.ui));
</script>

<template>
    <div :class="ui.container">
        <div :class="ui.left" v-if="$slots.left || $slots.logo">

            <div v-if="$slots.logo" :class="ui.logo">
                <slot name="logo" />
            </div>
            <slot name="left" />
        </div>
        <ul :class="ui.center">
            <slot name="center">
                <li class="relative" v-for="menu in headerMenu">
                    <ul>
                        <a :href="menu.href" v-html="menu.text" :class="ui.item">
                        </a>
                    </ul>
                </li>
            </slot>
        </ul>
        <div v-if="$slots.right" :class="ui.right">
            <slot name="right" />
        </div>
    </div>
</template>

<style>
#header {
    @apply bg-white backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50;
}
</style>