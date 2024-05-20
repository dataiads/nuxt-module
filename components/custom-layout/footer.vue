
<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import type { FooterParams, BlockConfig } from '~/types'

const props = defineProps<{config: FooterParams}>()

const product = useProduct()

let html = ''
if (props.config.source === 'scrapped-html') {
  html = getCustomAttr(product.value, props.config.sourceCustomAttribute) || html
}

let blockConfig = { html: '', style: '' }
if (props.config.source === 'scrapped-block') {
  blockConfig = getCustomAttrJSON<BlockConfig>(product.value, props.config.sourceCustomAttribute, blockConfig)
}

</script>

<template>
  <footer v-if="config.source === 'slot'" id="footer" :style="config.style">
    <slot name="footer" />
  </footer>
  <footer v-else-if="config.source === 'scrapped-html'" id="footer" :style="config.style" v-html="html" />
  <footer v-else-if="config.source === 'scrapped-block'" id="footer" :style="config.style">
    <Block :config="blockConfig" />
  </footer>
</template>