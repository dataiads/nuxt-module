
<script setup lang="ts">
import type { CrossSellParams } from '~/types';

const props = defineProps<{
    config: CrossSellParams;
}>();

const product = useProduct();

// only one algorithm for now
const keyMatcher = (productKey: string, dataKey: string) => productKey.startsWith(dataKey);


let items: CrossSellItem[] = [];
if (props.config.data) {
  let key = getAttr(product.value, props.config.key.key) || "";
  if (props.config.key.caseInsensitive) {
    key = key.toLowerCase();
  }

  for (let [dataKey, value] of Object.entries(props.config.data)) {
    if (props.config.key.caseInsensitive) {
        dataKey = dataKey.toLowerCase();
    }
    if (keyMatcher(key, dataKey)) {
        items = value
        break
    }
  }
}

</script>

<template>
<div :style="config.style" v-if="items.length">
    <div :style="config.titleStyle" v-if="config.title">{{ config.title }}</div>
    <div
        class="flex flex-row"
        :class="{'flex-wrap': !config.scroll, 'overflow-x-scroll': config.scroll}"
        :style="{'column-gap': config.columnGap}"
    >
        <div v-for="item in items" :style="config.itemStyle">
            <a v-if="item.link">
                <img v-if="item.image" :style="config.imageStyle" :src="item.image">
                <div>{{ item.text }}</div>
            </a>
            <template v-else>
                <img v-if="item.image" :style="config.imageStyle" :src="item.image">
                <div>{{ item.text }}</div>
            </template>
        </div>
    </div>
</div>
</template>