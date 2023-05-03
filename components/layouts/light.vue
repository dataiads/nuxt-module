<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"


const props = defineProps<{
    recoSliderProducts: Product[] | null
    filter: Filter
    extraProducts?: Product[]
}>()

let { data: filterProducts } = props.filter.results;

const config = useRuntimeConfig()
const lpoConfig = useLpoConfig()
const s = config.public.layoutStyle
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

        <div id="reco-slider" :class="s.recoSlider.class" v-if="recoSliderProducts?.length">
            <div :class="s.recoSlider.containerClass">
                <slot name="reco-slider-header"></slot>
                <Slider :items="props.recoSliderProducts" :scroller-class="s.recoSlider.sliderClass"
                    :autoscroll="s.recoSlider.autoscroll">
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