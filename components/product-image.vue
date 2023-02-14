
<script lang="ts">
export type ProductImageAsideBehaviour = "none" | "left-justify" |  "left-scroll" |  "bottom-justify" |  "bottom-scroll"
</script>

<script setup lang="ts">

interface Props {
    product: Product

    // customize images alt attribute
    alt?: string

    // customize how additional images are displayed
    aside?: ProductImageAsideBehaviour

    // display additional images on the side
    maxAdditionalImages?: number

    // custom layout instead of using "aside" parameter
    class?: string[]
    asideClass?: string[]

}
const props = withDefaults(defineProps<Props>(), {
    class: () => [], 
    asideClass: () => [], 
    alt: ({ product }) => product.data?.title || "product image",
    aside: "left-scroll",
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

const hoveredImage = ref<string>("")
const mouseenter = (link: string) => {
    hoveredImage.value = link
}

const mouseleave = () => {
    hoveredImage.value = ""
}

const activeImage = computed(() => hoveredImage.value || selectedImage.value)


let mainClass: string[]
let asideClass: string[]
switch (props.aside) {
    case "none":
        mainClass = ["flex"]
        asideClass = ["hidden"]
        break
    case "left-justify":
        mainClass = ["flex", "flex-row"]
        asideClass = ["flex", "flex-col", "flex-nowrap", "justify-between"]
        break
    case "left-scroll":
        mainClass = ["flex", "flex-row"]
        asideClass = ["flex", "flex-col", "flex-nowrap", "overflow-y-scroll"]
        break
    case "bottom-justify":
        mainClass = ["flex", "flex-col"]
        asideClass = ["flex", "flex-row", "flex-nowrap", "justify-between"]
        break
    case "bottom-scroll":
        mainClass = ["flex", "flex-col"]
        asideClass = ["flex", "flex-row", "flex-nowrap", "overflow-x-scroll"]
        break
    default:
        mainClass = props.class.concat()
        asideClass = props.asideClass.concat()
        break
}



</script>

<template>
    <div :class="mainClass">
        <div :class="asideClass">
            <template v-for="additionalImage in allImages">
                <div
                    @click="selectedImage = additionalImage"
                    @mouseenter="mouseenter(additionalImage)"
                    @mouseleave="mouseleave"
                >
                    <slot name="aside-image" :alt="props.alt" :src="additionalImage" :active="additionalImage === activeImage">
                        <!-- default content for slot additional-image -->
                        <Image :src="additionalImage" :alt="props.alt" height="80" width="80" class="cursor-pointer"/>
                    </slot>
                </div>
            </template>
        </div>

        <div class="flex-1">
            <div>
                <slot name="main-image" :src="activeImage" :alt="props.alt">
                    <!-- default content for slot additional-image -->
                    <Image height="400" width="400" :src="activeImage" :alt="props.alt"/>
                </slot>
            </div>
        </div>
    </div>
</template>