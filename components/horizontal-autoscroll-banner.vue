<script setup lang="ts">
interface Props {
    class?: string
    autoscroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    autoscroll: true,
})

const lpoConfig = useLpoConfig()

const backgroundColor = lpoConfig.bannerBackground || "#000000"
const textColor = lpoConfig.bannerColor || "#ffffff"


let banners = lpoConfig.banners || []


const container = ref<HTMLElement | null>(null)

onBeforeMount(() => {
    if (banners.length > 1 && props.autoscroll) {
        window.setInterval(() => {
            if (container.value) {
                if (Math.round(container.value.scrollLeft) >= container.value.scrollWidth - container.value.clientWidth) {
                    container.value.scroll({
                        left: 0,
                        behavior: "auto",
                    })
                }
                container.value.scrollBy({
                    left: 1,
                    behavior: "auto",
                })

            }
        }, 20)
    }
})

for (let i = 0; i < 8; i++) {
    banners = banners.concat(banners)
}

</script>


<template>
    <div :class="props.class" class="flex flex-nowrap overflow-x-scroll scrollbar-hide" ref="container"
        v-if="banners.length" :style="{ color: textColor, backgroundColor: backgroundColor }">
        <div v-for="banner in banners">
            <a :href="banner.href" v-if="banner.href && $isSafeLink(banner.href)">
                <slot v-bind="banner"></slot>
            </a>
            <slot v-else v-bind="banner"></slot>
        </div>
    </div>
</template>