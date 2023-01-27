<template>
<div class="lg:container lg:mx-auto">
    <header class="w-full " id="header">
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