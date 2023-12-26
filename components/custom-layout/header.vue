
<script setup lang="ts">
import type {HeaderParams, BlockConfig} from "~/types"

const props = defineProps<{config: HeaderParams}>()

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
<header id="header" v-if="config.source==='slot'" :style="config.style"><slot name=header></slot></header>
<header id="header" v-else-if="config.source==='scrapped-html'" :style="config.style" v-html="html"></header>
<header id="header" v-else-if="config.source==='scrapped-block'" :style="config.style"><Block :config="blockConfig"></Block></header>
</template>