
<script lang="ts">
export type ScrollDirection = "horizontal" | "vertical"

export class ScrollController {
    #el: HTMLElement;
    #direction: ScrollDirection;

    constructor(element: HTMLElement, direction: ScrollDirection) {
        this.#el = element
        this.#direction = direction
    }

    // current scroll position
    get position(): number {
        return this.#direction === "horizontal" ? this.#el.scrollLeft : this.#el.scrollTop
    }

    // scroll area size = front
    get size(): number {
        return this.#direction === "horizontal" ? this.#el.clientWidth : this.#el.clientHeight
    }

    // scroll area real size = back
    get max(): number {
        return this.#direction === "horizontal" ? this.#el.scrollWidth : this.#el.scrollHeight
    }

    reachedStart(): boolean {
        return Math.round(this.position) <= 0
    }

    reachedEnd(): boolean {
        return Math.round(this.position) >= this.max - this.size
    }

    scroll(value: number, behavior: ScrollBehavior) {
        value = Math.round(value)
        if (this.#direction === "horizontal") {
            this.#el.scroll({ left: value, behavior })
        } else {
            this.#el.scroll({ top: value, behavior })
        }
    }

    scrollBy(value: number, behavior: ScrollBehavior) {
        value = Math.round(value)
        if (this.#direction === "horizontal") {
            this.#el.scrollBy({ left: value, behavior })
        } else {
            this.#el.scrollBy({ top: value, behavior })
        }
    }
}
</script>

<script setup lang="ts">
interface Props<T> {
    items: T[] | null
    scrollBehavior?: ScrollBehavior
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

let scrollController: ScrollController
const hover = ref(false)
const scrollerEl = ref<HTMLElement>()

const previous = () => {
    if (scrollController) {
        if (scrollController.reachedStart()) {
            scrollController.scroll(scrollController.max - scrollController.size, props.scrollBehavior)
        } else {
            scrollController.scrollBy(-0.8 * scrollController.size, props.scrollBehavior)
        }
    }
}

const next = () => {
    if (scrollController) {
        if (scrollController.reachedEnd()) {
            scrollController.scroll(0, props.scrollBehavior)
        } else {
            scrollController.scrollBy(0.8 * scrollController.size, props.scrollBehavior)
        }
    }
}

if (props.autoscroll) {
    window.setInterval(() => {
        if (scrollController && !hover.value) {
            if (scrollController.reachedEnd()) {
                scrollController.scroll(0, "auto")
            } else {
                scrollController.scrollBy(1, "auto")
            }
        }
    }, 10)
}

onMounted(() => {
    if (scrollerEl.value) {
        scrollController = new ScrollController(scrollerEl.value, props.direction)
    }
})

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
    "left-0",
    props.direction === "horizontal" ? "bottom-0" : "right-0",
]

const nextClass = [
    "absolute",
    "hidden",
    "md:block",
    "bottom-0",
    "right-0",
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
    <div :class="mainClass" v-if="props.items" @mouseenter="hover = true" @mouseleave="hover = false">
        <div :class="scrollerClass" ref="scrollerEl">
            <slot name="item" v-for="item in props.items" :item="item"> </slot>
        </div>
        <div :class="previousClass">
            <div :class="previousContentClass">
                <slot name="previous-btn" :click="previous">
                    <div @click="previous" class="hover:bg-slate-500/10 cursor-pointer rounded-full px-4 text-3xl">&lt;
                    </div>
                </slot>
            </div>
        </div>
        <div :class="nextClass">
            <div :class="nextContentClass">
                <slot name="next-btn" :click="next">
                    <div @click="next" class="hover:bg-slate-500/10 cursor-pointer rounded-full px-4 text-3xl">&gt;
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>