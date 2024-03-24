<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const lpoConfig = useLpoConfig();

const defaultUI = {
    container: 'lg:container lg:mx-auto mx-4 flex items-center justify-between gap-3',
    left: "flex items-center justify-between lg:flex-1 gap-2",
    item: "duration-200 hover:text-secondary",
    logo: "flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-2",
    center: "hidden lg:flex lg:flex-1 justify-between gap-x-8",
    right: "flex items-center justify-end lg:flex-1 gap-2",
    panel: 'absolute z-10'
}

const props = defineProps<{
    ui: typeof defaultUI,
    menu: MenuItem[]
}>();

const headerMenu = computed(() => props.menu ? props.menu : lpoConfig.menu ? lpoConfig.menu : [])

const { ui } = useUI(defaultUI, toRefs(props.ui))

const mirroredDomain = useMirroredDomain()

const popoverBtn = ref();
const timeOut = ref()
const handleEnter = (isOpen: boolean, i: number) => {
    clearTimeout(timeOut.value)
    popoverBtn.value[i].$el.click()
}

const handleLeave = (i: number) => {
    timeOut.value = setTimeout(() => {
        popoverBtn.value[i].$el.click()
    }, 150)
}
</script>

<template>
    <div :class="ui.container">
        <div :class="ui.left" v-if="$slots.left || $slots.logo">
            <slot name="left" />
            <div v-if="$slots.logo" :class="ui.logo">
                <a :href="mirroredDomain">
                    <slot name="logo" />
                </a>
            </div>
        </div>
        <ul :class="ui.center">
            <slot name="center">
                    
                        <ul class="relative" v-for="(menu, i) in headerMenu">
                                            <Popover class="relative" v-slot="{ open }" @mouseleave="handleLeave(i)">
                                                <PopoverButton ref="popoverBtn" @mouseover="handleEnter(open, i)">
                                                    <slot name="item" :item="menu" :index="i">
                                                        <a :href="menu.href" v-html="menu.text" :class="ui.item" :style="{ color: menu.color }" />
                                                    </slot>
                                                </PopoverButton>
                                                <PopoverPanel v-if="menu.children && menu.children.length" :class="ui.panel">
                                                    <slot name="children" :children="menu.children">
                                                        <div v-for="(child, i) in menu.children">
                                                            <a :href="child.href" v-html="child.text" :class="ui.item"
                                                                :style="{ color: child.color }" />
                                                        </div>
                                                    </slot>
                                                </PopoverPanel>
                                            </Popover>
                                        </ul>
            </slot>
        </ul>
        <div v-if="$slots.right" :class="ui.right">
            <slot name="right" />
        </div>
    </div>
</template>

