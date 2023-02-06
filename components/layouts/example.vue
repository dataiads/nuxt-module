<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"

const config = useRuntimeConfig()
const layoutStyle = config.public.layoutStyle
console.log("LAYOUT STYLE", layoutStyle)
</script>

<template>
<div class="lg:mx-auto">
    <header
        id="header"
        class="col-span-full w-full z-[2]"
        :class="layoutStyle.header.class"
    >
        <slot name="header"></slot>
    </header>
    <!--
    <header class="col-span-full w-full z-[2] bg-yellow-500" id="header">
        <div class="lg:container lg:mx-auto" style="height: 60px;">header</div>
    </header>
    -->

    <div class="w-full lg:container mx-auto" id="main-product">
        <div style="height: 300px; background: red; border: 1px solid black;">main product</div>
    </div>

    <div class="w-full bg-blue-500" id="reco-slider">
        <div class="lg:container mx-auto py-4">
            <div class="w-full">Title slider</div>
            <div class="bg-yellow-100 h-[150px] grid grid-cols-1 gap-2 overflow-x-scroll scrollbar-hide sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                <div class="flex flex-nowrap space-x-5 py-5 sliding-reco md:mx-0">
                    <div class="bg-white p-4 border border-black min-w-[300px]"></div>
                    <div class="bg-white p-4 border border-black min-w-[300px]"></div>
                    <div class="bg-white p-4 border border-black min-w-[300px]"></div>
                    <div class="bg-white p-4 border border-black min-w-[300px]"></div>
                    <div class="bg-white p-4 border border-black min-w-[300px]"></div> 
                </div>
            </div>
        </div>
    </div>

    <slot name="filters"></slot>
    <slot name="reco-main"></slot>

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