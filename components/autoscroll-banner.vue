<script setup lang="ts">
interface Props {
    // banners can also be injected using the lpo config
    banners?: Banner[]

    interval?: number

    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    interval: 4000,
    class: "",
})

const lpoConfig = useLpoConfig()
const container = ref<HTMLElement | null>(null)

const banners = props.banners || lpoConfig.banners || []

onBeforeMount(() => {
    if (banners.length > 1) {
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
    }
})

const repeatedBanners = ref(banners.length > 1 ? [...banners, banners[0]] : banners)
const backgroundColor = lpoConfig.bannerBackground;

</script>


<template>
<div :class="props.class" class="flex flex-col flex-nowrap overflow-scroll snap-y scrollbar-hide" :style="{ backgroundColor: backgroundColor }" ref="container" v-if="repeatedBanners.length">
    <div class="min-h-full max-h-full w-full flex justify-center items-center snap-center" v-for="banner in repeatedBanners">
        <a :href="banner.href" v-if="banner.href && $isSafeLink(banner.href)">
            <slot v-bind="banner"></slot>
        </a>
        <slot v-else v-bind="banner"></slot>
    </div>
</div>
</template>