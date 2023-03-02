<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"
import { Filter } from "~~/composables/filter";


const props = defineProps<{
    recoSliderProducts: Product[] | null
    filter: Filter
}>()

let { data: filterProducts } = props.filter.results;

const config = useRuntimeConfig()
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

        <div id="main-product" :class="s.mainProduct.class">
            <slot name="main-product"></slot>
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

    <div id="sticky-add-to-cart" :class="s.stickyAddToCart.class">
        <StickyFooter>
            <slot name="sticky-add-to-cart"></slot>
        </StickyFooter>
    </div>

    <slot id="filters-drawer" name="filters-drawer"></slot>
</template>