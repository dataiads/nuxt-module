<template>
<div class="md:container md:mx-auto md:pt-4 md:mt-4 md:text-center">
    <header class="w-full lg:container" id="header">
        <div style="height: 60px; background: yellow; border: 1px solid black;">header</div>
    </header>

    <div class="w-full" id="main-product">
        <div style="height: 300px; background: red; border: 1px solid black;">main product</div>
    </div>

    <div class="w-full" id="reco-slider">
        <div style="height: 180px; background: blue; border: 1px solid black;">reco slider</div>
    </div>


    <slot name="filters"></slot>
    <slot name="reco-main"></slot>
    <slot name="footer"></slot>
    <footer class="w-full mt-auto" id="footer">
        <div style="height: 140px; background: green; border: 1px solid black;">footer</div>
    </footer>
</div>
</template>