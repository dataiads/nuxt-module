
<script setup lang="ts">

interface Props {
    product: Product

    // customize images alt attribute
    alt?: string

    // display additional images on the side
    maxAdditionalImages?: number

    // customize element classes
    class?: string | string[]
    mainClass?: string | string[]
    asideClass?: string | string[]

}
const props = withDefaults(defineProps<Props>(), {
    class: () => ["flex", "flex-row"],
    asideClass: () => ["flex", "flex-col", "flex-nowrap", "overflow-y-scroll", "scrollbar-hide"],
    mainClass: () => ["flex", "flex-row", "flex-nowrap", "overflow-x-scroll", "snap-x", "snap-mandatory", "scrollbar-hide", "md:overflow-hidden"],
    alt: ({ product }) => product.data?.title || "product image",
    maxAdditionalImages: Infinity,
})

// use all available images, ordered by priority
let allImages: string[] = []
if (props.product?.extraData?.additionalImageLinks?.length) {
    // use collected images in priority
    allImages = allImages.concat(props.product.extraData.additionalImageLinks)
} else {
    // fallback on feed images otherwise
    if (props.product?.data?.imageLink) {
        allImages.push(props.product.data.imageLink)
    }
    if (props.product?.data?.additionalImageLinks) {
        allImages = allImages.concat(props.product.data.additionalImageLinks)
    }
}

// remove falsy links and deduplicate
allImages = allImages.reduce<string[]>((acc, item) => {
    if (item && !acc.includes(item) && (acc.length < props.maxAdditionalImages)) {
        acc.push(item)
    }
    return acc
}, [])

// pointer to current image
const selectedImage = ref<string>("")
if (allImages.length > 0) {
    selectedImage.value = allImages[0]
}

const selectImage = (imageIndex: number) => {
    if (imageIndex > -1 && imageIndex < allImages.length) {
        selectedImage.value = allImages[imageIndex]
        scrollIntoView(imageIndex)
    }
}

const selectedIndex = computed(() => allImages.indexOf(selectedImage.value))

const clickPrevious = () => {
    if (selectedIndex.value > 0) {
        selectImage((selectedIndex.value - 1))
    }
}

const clickNext = () => {
    if (selectedIndex.value < (allImages.length - 1)) {
        selectImage((selectedIndex.value + 1))
    }
}

const mouseenter = (imageIndex: number) => {
    scrollIntoView(imageIndex)
}

const mouseleave = () => {
    scrollIntoView(selectedIndex.value)
}

const scrollerRef = ref<HTMLElement>()
const mainImagesRef = ref<HTMLElement[]>([])
let ignoreNextScrollEvent = false

// update selected image on scroll
const onScroll = () => {
    if (ignoreNextScrollEvent) {
        ignoreNextScrollEvent = false
        return
    }
    if (scrollerRef.value) {
        const parentLeft = scrollerRef.value.getBoundingClientRect().left
        const [visibleIndex, _] = mainImagesRef.value.reduce(([minIndex, minValue], ref, index) => {
            const value = Math.abs(parentLeft - ref.getBoundingClientRect().left)
            if (minIndex == -1 || value < minValue) {
                return [index, value]
            }
            return [minIndex, minValue]
        }, [-1, 0])
        if (visibleIndex > -1) {
            selectedImage.value = allImages[visibleIndex]
        }
    }
}

// scroll an image into view
const scrollIntoView = (index: number) => {
    if (scrollerRef.value && index > -1 && index < mainImagesRef.value.length) {
        const pos = mainImagesRef.value[index].offsetLeft
        ignoreNextScrollEvent = true
        scrollerRef.value.scroll({ left: pos, behavior: "auto"})
    }
}
</script>

<template>
    <div :class="props.class">
        <div :class="props.asideClass">
            <template v-for="(additionalImage, index) in allImages">
                <div @click="selectImage(index)" @mouseenter="mouseenter(index)"
                    @mouseleave="mouseleave">
                    <slot name="aside-image" :alt="props.alt" :src="additionalImage"
                        :active="additionalImage === selectedImage">
                        <!-- default content for slot additional-image -->
                        <Image :src="additionalImage" :alt="props.alt" height="80" width="80" class="cursor-pointer" />
                    </slot>
                </div>
            </template>
        </div>

        <div class="flex-1 relative">
            <div :class="mainClass" @scroll="onScroll" ref="scrollerRef">
                <div v-for="additionalImage in allImages" class="flex-none snap-center max-w-fit min-w-full" ref="mainImagesRef">
                    <slot name="main-image"  :src="additionalImage" :alt="props.alt">
                        <!-- default content for slot for main image -->
                        <Image height="400" width="400" :src="additionalImage" :alt="props.alt"/>
                    </slot>
                </div>
            </div>

            <div class="absolute bottom-0 top-0 left-0 pointer-events-none flex-col justify-center h-full flex">
                <div class="pointer-events-auto cursor-pointer" @click="clickPrevious">
                    <slot name="previous-btn"></slot>
                </div>
            </div>

            <div class="absolute bottom-0 top-0 right-0 pointer-events-none flex-col justify-center h-full flex">
                <div class="pointer-events-auto cursor-pointer" @click="clickNext">
                    <slot name="next-btn"></slot>
                </div>
            </div>
        </div>

    </div>
</template>