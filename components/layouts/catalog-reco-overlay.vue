<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"


const props = defineProps<{
    recoSliderProducts: Product[] | null
    filter: Filter
}>()

let { data: filterProducts } = props.filter.results;

const config = useRuntimeConfig()
const s = config.public.layoutStyle

const overlayOpen = useState('recoSlider.overlay.open', () => false)
const recoOverlay: Ref<HTMLDivElement> = ref(null)
const showBackground = ref(true)

watch(overlayOpen, () => {
    const overlayBackgroundClass = [...s.recoSlider.overlayBackgroundClass, (overlayOpen.value ? 'open' : 'closed')]
    if (overlayOpen.value) {
        showBackground.value = true
        setTimeout(() => recoOverlay.value.classList.value = overlayBackgroundClass.join(' ') , 20)
    } else {
        setTimeout(() => recoOverlay.value.style.opacity = 0, 20)
        setTimeout(() => showBackground.value = false, 500)
    }
})

// Hide when user scrolls.
const { y } = useWindowScroll()
watch(y, () => {
    if (overlayOpen.value) {
        overlayOpen.value = false
    }
})

const overlayClass = computed(() => {
    let classList = structuredClone(toRaw(s.recoSlider.class));

    if (overlayOpen.value) {
        // open
        if (s.recoSlider.openFrom === 'top' || s.recoSlider.openFrom === 'bottom') {
            classList.push('translate-y-0')
        } else if (s.recoSlider.openFrom === 'left' || s.recoSlider.openFrom === 'right') {
            classList.push('translate-x-0')
        }
    } else {
        // close
        if (s.recoSlider.openFrom === 'top') {
            classList.push('-translate-y-full');
        } else if (s.recoSlider.openFrom === 'bottom') {
            classList.push('translate-y-full');
        } else if (s.recoSlider.openFrom === 'left') {
            classList.push('-translate-x-full');
        } else if (s.recoSlider.openFrom === 'right') {
            classList.push('translate-x-full');
        }
    }
    return classList;
})

// Auto-open after delay
if (s.recoSlider.openDelay > 0) {
    setTimeout(() => overlayOpen.value = true, s.recoSlider.openDelay)
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

        <div id="main-product" :class="s.mainProduct.class">
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

        <div id="overlay-background" v-if="showBackground" ref="recoOverlay" @click="overlayOpen = false" class="transition-opacity"></div>
        <div id="reco-slider" class="fixed bottom-0 left-0 z-[12]" @click.stop="() => null" :class="overlayClass" v-if="recoSliderProducts?.length">
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

    <footer id="footer" :class="s.footer.class">
        <slot name="footer"></slot>
    </footer>

    <StickyFooter>
        <slot name="sticky-add-to-cart"></slot>
    </StickyFooter>

    <slot id="filters-drawer" name="filters-drawer"></slot>

    <slot id="menus-drawer" name="menus-drawer"></slot>
</template>