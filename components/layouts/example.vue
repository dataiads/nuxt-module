
<template>

    <header class="w-screen">
        <slot name="header"></slot>
    </header>

    <div class="">
        <slot name="main-product"></slot>
    </div>

    <div class="">
        <slot name="reco-slider"></slot>
    </div>

    <slot name="filters"></slot>
    <slot name="reco-main"></slot>
    <slot name="footer"></slot>
</template>