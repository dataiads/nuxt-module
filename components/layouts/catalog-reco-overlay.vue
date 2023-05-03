<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"


const props = defineProps<{
    recoSliderProducts: Product[] | null
    filter: Filter,
    extraProducts?: Product[]
}>()

let { data: filterProducts } = props.filter.results;

const config = useRuntimeConfig()
const lpoConfig = useLpoConfig()
const s = config.public.layoutStyle

const overlayOpen = useState('recoSlider.overlay.open', () => false)
const overlayClosed = computed(() => !overlayOpen.value)

// Hide when user scrolls.
const { y } = useWindowScroll()
watch(y, () => {
    if (overlayOpen.value) {
        overlayOpen.value = false
    }
})


// Class for the overlay congtaining the slider.
let overlayClass = reactive(["fixed", "bottom-0", "left-0", "z-[12]", s.recoSlider.class])
switch (s.recoSlider.openFrom) {
    case 'top':
         overlayClass.push({"translate-y-0": overlayOpen}, {"-translate-y-full": overlayClosed})
        break
    case 'bottom':
         overlayClass.push({"translate-y-0": overlayOpen}, {"translate-y-full": overlayClosed})
        break
    case 'left':
         overlayClass.push({"translate-x-0": overlayOpen}, {"-translate-x-full": overlayClosed})
        break
    case 'right':
         overlayClass.push({"translate-x-0": overlayOpen}, {"translate-x-full": overlayClosed})
        break
}

// Class for the backgound which occupies the entire page.
const backgroundClass = reactive(["transition-opacity", ...s.recoSlider.overlayBackgroundClass, {"open": overlayOpen, "closed": overlayClosed}])

// Auto-open after delay
if (s.recoSlider.openDelay > 0) {
    setTimeout(() => {
        if (y.value < 10) {
            overlayOpen.value = true
        }
    }, s.recoSlider.openDelay)
}
</script>

<template>
    <div class="lg:mx-auto">
        <header id="header" :class="s.header.class">
            <slot name="header"></slot>
        </header>

        <div id="breadcrumb" :class="s.breadcrumb.class">
            <slot name="breadcrumb"></slot>
        </div>

        <div id="main-product" v-if="lpoConfig.useLightMainProduct" :class="s.mainProduct.class">
            <slot name="main-product-light">
                <slot name="main-product-light-header"></slot>

                <slot name="main-product-light-aside"></slot>

                <div :class="s.mainProduct.imageClass">
                    <slot name="main-product-light-image"></slot>
                </div>
                <div :class="s.mainProduct.descriptionClass">
                    <slot name="main-product-light-description"></slot>
                </div>

                <slot name="main-product-light-footer"></slot>
            </slot>
        </div>
        <div id="main-product" v-else :class="s.mainProduct.class">
            <slot name="main-product">
                <slot name="main-product-header"></slot>

                <slot name="main-product-aside"></slot>
                
                <div :class="s.mainProduct.imageClass">
                    <slot name="main-product-image"></slot>
                </div>
                <div :class="s.mainProduct.descriptionClass">
                    <slot name="main-product-description"></slot>
                </div>

                <slot name="main-product-footer"></slot>
            </slot>
        </div>

        <div id="overlay-background" @click="overlayOpen = false" :class="backgroundClass"></div>
        <div id="reco-slider" :class="overlayClass" v-if="recoSliderProducts?.length">
            <div :class="s.recoSlider.containerClass">
                <slot name="reco-slider-header"></slot>
                <Slider :items="props.recoSliderProducts" :scroller-class="s.recoSlider.sliderClass" :autoscroll="s.recoSlider.autoscroll">
                    <template #item="{ item }">
                        <slot name="reco-slider-item" :key="item.id" :item="item"></slot>
                    </template>
                    <template #previous-btn="scope">
                        <slot name="reco-slider-previous-btn" v-bind="scope"></slot>
                    </template>
                    <template #next-btn="scope">
                        <slot name="reco-slider-next-btn" v-bind="scope"></slot>
                    </template>
                </Slider>
            </div>
        </div>

        <div id="filters" :class="s.filters.class">
            <div id="filters-aside" :class="s.filters.asideClass">
                <slot name="filters-aside"></slot>
            </div>
            <div id="filters-content" :class="s.filters.contentClass">
                <div id="filters-content-header" :class="s.filters.contentHeaderClass">
                    <slot name="filters-content-header"></slot>
                </div>
                <div :class="s.filters.contentGridClass">
                    <slot name="filters-content-grid-item" v-for="item in filterProducts"
                        :key="item.id ? item.id : JSON.stringify(item)" :item="item"></slot>
                </div>
                <div id="filters-pagination" :class="s.filters.paginationClass">
                    <slot name="filters-pagination"></slot>
                </div>
            </div>
        </div>
    </div>
    <div id="cross-sell" :class="s.crossSell.class">
        <slot name="cross-sell"></slot>
    </div>

    <div id="extra-reco" v-if="lpoConfig.extraReco" :class="s.extraReco.class">
        <div id="extra-reco-content" :class="s.extraReco.contentClass">
            <div id="extra-reco-content-header" :class="s.extraReco.contentHeaderClass">
                <slot name="extra-reco-content-header"></slot>
            </div>
            <div :class="s.extraReco.contentGridClass">
                <slot name="extra-reco-content-grid-item" v-for="item in extraProducts"
                    :key="item.id ? item.id : JSON.stringify(item)" :item="item"></slot>
            </div>
        </div>
    </div>

    <footer id="footer" :class="s.footer.class">
        <slot name="footer"></slot>
    </footer>

    <StickyFooter>
        <slot name="sticky-add-to-cart"></slot>
    </StickyFooter>

    <slot id="filters-drawer" name="filters-drawer"></slot>

    <slot id="menus-drawer" name="menus-drawer"></slot>
</template>

<style lang="scss" scoped>
#overlay-background.open {
    opacity: 0.6;
}

#overlay-background.closed {
    pointer-events: none;
    opacity: 0;
}
</style>