<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app";

defineProps<{
    element: SlotLayoutElement
}>()

const config = useRuntimeConfig();
const lpoConfig = useLpoConfig();
const s = config.public.layoutStyle;
</script>

<template>

    <header v-if="element.params.name === 'header'" id="header" :class="element.class ?? s.header.class ">
        <slot :name="element.params.name"></slot>
    </header>

    <div v-else-if="element.params.name === 'breadcrumb'" :id="element.params.name" :class="element.class ?? s.breadcrumb.class">
      <slot :name="element.params.name"></slot>
    </div>
    
    <main v-else-if="element.params.name === 'main-product'" :id="element.params.name" :class="element.class ?? s.mainProduct.class">
        <slot v-if="lpoConfig.useLightMainProduct" name="main-product-light"></slot>
        <slot v-else name="main-product"></slot>
    </main>

    <footer v-else-if="element.params.name === 'footer'" :id="element.params.name" :class="element.class ?? s.footer.class">
        <slot name="footer"></slot>
    </footer>
    
    <div v-else :id="element.params.name" :class="element.class">
      <slot :name="element.params.name"></slot>
    </div>

</template>