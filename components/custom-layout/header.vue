
<script setup lang="ts">
import type { HeaderParams, BlockConfig } from '~/types'

const props = defineProps<{config: HeaderParams}>()

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
  <header v-if="config.source === 'slot'" id="header" :style="config.style">
    <slot name="header" />
  </header>
  <header v-else-if="config.source === 'scrapped-html'" id="header" :style="config.style" v-html="html" />
  <header v-else-if="config.source === 'scrapped-block'" id="header" :style="config.style">
    <Block :config="blockConfig" />
  </header>
</template>