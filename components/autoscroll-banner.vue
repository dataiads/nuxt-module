<script setup lang="ts">
interface Props {
    banners: Banner[]
    interval?: number
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    interval: 4000,
    class: "",
})

const container = ref<HTMLElement | null>(null)

onBeforeMount(() => {
    window.setInterval(() => {
        if (container.value) {
            if (Math.round(container.value.scrollTop) >= container.value.scrollHeight - container.value.clientHeight) {
                container.value.scroll({
                    top: 0,
                    behavior: "auto",
                })
            }
            container.value.scrollBy({
                top: container.value.clientHeight,
                behavior: "smooth",
            })
                
        }
    }, props.interval)
})

const repeatedBanners = ref(props.banners.length ? [...props.banners, props.banners[0]] : [])
</script>

<script lang="ts">
export interface Banner {
    text: string
    class?: string
    href?: string
}
</script>

<template>
<div :class="props.class" class="flex flex-col flex-nowrap overflow-scroll snap-y scrollbar-hide" ref="container" v-if="props.banners.length">
    <div class="min-h-full max-h-full w-full flex justify-center items-center snap-center" v-for="banner in repeatedBanners">
        <slot v-bind="banner"></slot>
    </div>
</div>
</template>


<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>