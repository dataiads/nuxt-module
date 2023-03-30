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
                <div :class="s.mainProduct.imageClass">
                    <slot name="main-product-image"></slot>
                </div>
                <div :class="s.mainProduct.descriptionClass">
                    <slot name="main-product-description"></slot>
                </div>

                <div :class="s.mainProduct.verticalSlider.class" v-if="filterProducts?.length">
                    <div class="">
                        <slot name="vertical-reco-slider-header"></slot>
                    </div>
                    <div :class="s.mainProduct.verticalSlider.sliderClass">
                        <template v-for="item in recoSliderProducts" :key="item.id">
                            <slot name="vertical-reco-slider-item" :product="item"></slot>
                        </template>
                    </div>
                </div>
            </slot>
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

    <footer id="footer" :class="s.footer.class">
        <slot name="footer"></slot>
    </footer>


    <StickyFooter>
        <slot name="sticky-add-to-cart"></slot>
    </StickyFooter>

    <slot id="filters-drawer" name="filters-drawer"></slot>

    <slot id="menus-drawer" name="menus-drawer"></slot>
</template>