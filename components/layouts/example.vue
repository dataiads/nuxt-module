<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"
import { FilterProperty } from "csstype";


const props = defineProps<{
    recoSliderProducts: Product[] | null;
    filter: Filter;
}>()

const { data: filterProducts } = await props.filter.results;


const config = useRuntimeConfig()
const s = config.public.layoutStyle
</script>

<template>
    <div class="lg:mx-auto">
        <header id="header" :class="s.header.class">
            <slot name="header"></slot>
        </header>

        <div id="main-product" :class="s.mainProduct.class">
            <slot name="main-product"></slot>
        </div>

        <div id="reco-slider" :class="s.recoSlider.class" v-if="recoSliderProducts?.length">
            <div :class="s.recoSlider.containerClass">
                <slot name="reco-slider-header"></slot>
                <div :class="s.recoSlider.sliderClass">
                    <slot
                        name="reco-slider-item"
                        v-for="item in filterProducts"
                        :key="item.id"
                        :item="item"
                    ></slot>
                </div>
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
                    <slot name="filters-content-grid-item"
                        v-for="item in filterProducts"
                        :key="item.id"
                        :item="item"
                    ></slot>
                </div>
            </div>
        </div>
    </div>

    <slot name="footer"></slot>
    <footer class="w-full mt-auto bg-green-500" id="footer">
        <div class="lg:container mx-auto">
            <div style="height: 140px;">footer</div>
        </div>
    </footer>
</template>