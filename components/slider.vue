
<script lang="ts">
export type ScrollDirection = "horizontal" | "vertical"
</script>

<script setup lang="ts">
interface Props<T> {
    items: T[] | null
    scrollBehavior: ScrollBehavior
    direction?: ScrollDirection
    class?: string[]
    scrollerClass?: string[]
    autoscroll?: boolean 
}

const props = withDefaults(defineProps<Props<any>>(), {
    direction: "horizontal",
    scrollBehavior: "smooth",
    class: () => [],
    scrollerClass: () => [],
    autoscroll: false,
})

const scrollerEl = ref<HTMLElement>()

const previous = () => {
    if (scrollerEl.value) {
        const scrollPos = props.direction === "horizontal" ? scrollerEl.value.scrollLeft : scrollerEl.value.scrollTop
        const scrollSize = props.direction === "horizontal" ? scrollerEl.value.clientWidth : scrollerEl.value.clientHeight
        const scrollMaxSize = props.direction === "horizontal" ? scrollerEl.value.scrollWidth : scrollerEl.value.scrollHeight

        if (Math.round(scrollPos) <= 0) {
            scrollerEl.value.scroll({
                left: scrollMaxSize - scrollSize,
                behavior: props.scrollBehavior
            })
        } else {
            scrollerEl.value.scrollBy({
                left: -Math.round(0.8 * scrollSize),
                behavior: props.scrollBehavior,
            })
        }
    }
}

const next = () => {
    if (scrollerEl.value) {
        const scrollPos = props.direction === "horizontal" ? scrollerEl.value.scrollLeft : scrollerEl.value.scrollTop
        const scrollSize = props.direction === "horizontal" ? scrollerEl.value.clientWidth : scrollerEl.value.clientHeight
        const scrollMaxSize = props.direction === "horizontal" ? scrollerEl.value.scrollWidth : scrollerEl.value.scrollHeight

        if (Math.round(scrollPos) >= scrollMaxSize - scrollSize) {
            scrollerEl.value.scroll({
                left: 0,
                behavior: props.scrollBehavior
            })
        } else {
            scrollerEl.value.scrollBy({
                left: Math.round(0.8 * scrollSize),
                behavior: props.scrollBehavior,
            })
        }
    }
}

const hover = ref(false)
if (props.autoscroll) {
    window.setInterval(() => {
        if (scrollerEl.value && !hover.value) {
            if (props.direction === "horizontal") {
                scrollerEl.value.scrollBy(1, 0)
            } else {
                scrollerEl.value.scrollBy(0, 1)
            }
        }
    }, 10)
}

const mainClass = [
    "relative",
    "block",
    props.direction === "horizontal" ? "w-full" : "h-full",
    ...props.class,
]

const scrollerClass = [
    "flex",
    "flex-nowrap",
    props.direction === "horizontal" ? "flex-row" : "flex-col",
    props.direction === "horizontal" ? "overflow-x-scroll" : "overflow-y-scroll",
    ...props.scrollerClass,
]

const previousClass = [
    "absolute",
    "hidden",
    "md:block",
    "top-0",
    //"left-0",
    "right-0",
    props.direction === "horizontal" ? "bottom-0" : "right-0",
]

const nextClass = [
    "absolute",
    "hidden",
    "md:block",
    "bottom-0",
    //"right-0",
    ""
    props.direction === "horizontal" ? "top-0" : "left-0",
]

const previousContentClass = [
    "flex",
    props.direction === "horizontal" ? "flex-col" : "flex-row",
    "justify-center",
    props.direction === "horizontal" ? "h-full" : "w-full",
]

const nextContentClass = previousContentClass.concat()

</script>

<template>
    <div :class="mainClass" v-if="props.items">
        <div :class="scrollerClass" ref="scrollerEl" @mouseenter="hover=true" @mouseleave="hover=false">
            <slot name="item" v-for="item in props.items" :item="item"> </slot>
        </div>
        <div :class="previousClass">
            <div :class="previousContentClass">
                <slot name="previous-btn" :click="previous">
                    <div @click="previous" class="hover:bg-slate-500/10 cursor-pointer rounded-full px-4 text-3xl">&lt;</div>
                </slot>
            </div>
        </div>
        <div :class="nextClass">
            <div :class="nextContentClass">
                <slot name="next-btn" :click="next">
                    <div @click="next" class="hover:bg-slate-500/10 cursor-pointer rounded-full px-4 text-3xl">&gt;</div>
                </slot>
            </div>
        </div>
    </div>
</template>