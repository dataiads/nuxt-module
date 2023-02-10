<script setup lang="ts">
const config = useRuntimeConfig()

const props = defineProps<{
    recoSliderProducts: Product[] | null
    filter: Filter
}>()

const { data: filterProducts } = await props.filter.results;

const p = config.public.layoutParams


let headerClass = [
    "col-span-full",
    "w-full",
    "z-[2]",
    "mx-auto",
    {"lg:container": p.header.container},
    ...p.header.class
]

let mainProductClass = [
    "w-full",
    "mx-auto",
    {"lg:container": p.mainProduct.container},
    ...p.mainProduct.class,
]

let recoSliderClass =  [
    "w-full",
    "mx-auto",
    {"lg:container": p.recoSlider.container},
    ...p.recoSlider.class
]

let recoSliderContentClass =  [
    "w-full",
    "mx-auto",
    {"lg:container": p.recoSlider.contentContainer},
    ...p.recoSlider.contentClass,
]

let recoSliderSliderClass = [
    "flex",
    "flex-nowrap",
    "overflow-x-scroll",
    ...p.recoSlider.sliderClass,
]

</script>

<template>
    <div class="lg:mx-auto">
        <header id="header" :class="headerClass">
            <slot name="header"></slot>
        </header>

        <div id="main-product" :class="mainProductClass">
            <slot name="main-product"></slot>
        </div>

        <div id="reco-slider" :class="recoSliderClass" v-if="recoSliderProducts?.length">
            <div :class="recoSliderContentClass">
                <slot name="reco-slider-header"></slot>
                <div :class="recoSliderSliderClass">
                    <slot
                        name="reco-slider-item"
                        v-for="item in props.recoSliderProducts"
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

    <footer id="footer" :class="s.footer.class">
        <slot name="footer"></slot>
    </footer>
</template>