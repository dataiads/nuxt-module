<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app";

defineProps<{
    element: LayoutElement
}>()

const config = useRuntimeConfig();
const lpoConfig = useLpoConfig();
const s = config.public.layoutStyle;
</script>

<template>

    <header v-if="element.params.name === 'header'" id="header" :class="s.header.class">
        <slot :name="element.params.name"></slot>
    </header>

    <div v-else-if="element.params.name === 'breadcrumb'" :id="element.params.name" :class="s.breadcrumb.class">
      <slot :name="element.params.name"></slot>
    </div>
    
    <main v-else-if="element.params.name === 'main-product'" :id="element.params.name" :class="s.mainProduct.class">
        <slot v-if="lpoConfig.useLightMainProduct" name="main-product-light">
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
        <slot v-else name="main-product">
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
    </main>

    <footer v-else-if="element.params.name === 'footer'" :id="element.params.name" :class="s.footer.class">
        <slot name="footer"></slot>
    </footer>
    
    <div v-else :id="element.params.name">
      <slot :name="element.params.name"></slot>
    </div>

</template>