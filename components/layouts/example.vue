<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"

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

    <div id="reco-slider" :class="s.recoSlider.class">
        <div :class="s.recoSlider.containerClass">
            <slot name="reco-slider-header"></slot>
            <div :class="s.recoSlider.sliderClass">
                <slot v-for="_ in 5" name="reco-slider-item">
                </slot>
            </div>
        </div>
    </div>

    <div class="col-span-full bg-white">
        <div class="grid md:grid-flow-col md:auto-cols-auto lg:container mx-auto h-full">
            <aside class="w-full overflow-x-scroll scrollbar-hide bg-indigo-100 self-start sticky top-0 min-h-[50px] md:min-h-screen md:block md:w-[256px] z-50 ">
                filtre/filtre mobile
            </aside>
            <div class="p-0">
                <div class="col-span-full">
                    <div class="flex justify-between items-center px-5 py-3 flex-wrap md:px-10 md:pb-0 md:pt-10 bg-yellow-500">
                        title
                    </div>
                    <div class="grid grid-cols-2 gap-4 mx-5 md:p-5 md:px-10 md:mx-0 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div class="bg-neutral-100 border border-black p-10">
                            <img src="" width="300" height="300" alt="">
                        </div>
                        <div class="bg-neutral-100 border border-black p-10">
                            <img src="" width="300" height="300" alt="">
                        </div>
                        <div class="bg-neutral-100 border border-black p-10">
                            <img src="" width="300" height="300" alt="">
                        </div>
                        <div class="bg-neutral-100 border border-black p-10">
                            <img src="" width="300" height="300" alt="">
                        </div>
                    </div>
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
</div>
</template>