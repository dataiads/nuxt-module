
<script setup lang="ts">
import type {FooterParams, BlockConfig} from "~/types"

const props = defineProps<{config: FooterParams}>()

const product = useProduct();

let html = "";
if (props.config.source === 'scrapped-html') {
    html = getCustomAttr(product.value, props.config.sourceCustomAttribute) || html;
}

let blockConfig = { html: "", style: ""};
if (props.config.source === 'scrapped-block') {
    blockConfig = getCustomAttrJSON<BlockConfig>(product.value, props.config.sourceCustomAttribute, blockConfig);
}

</script>

<template>
<footer id="footer" v-if="config.source==='slot'" :style="config.style"><slot name=footer></slot></footer>
<footer id="footer" v-else-if="config.source==='scrapped-html'" :style="config.style" v-html="html"></footer>
<footer id="footer" v-else-if="config.source==='scrapped-block'" :style="config.style"><Block :config="blockConfig"></Block></footer>
</template>