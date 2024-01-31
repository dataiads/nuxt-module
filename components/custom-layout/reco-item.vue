<script setup lang="ts">
import type { RecoItemParams } from '~/types';

defineProps<{ config: RecoItemParams }>()
</script>

<template>
  <div :style="config.style">
    <div :style="config.titleStyle">
      <a :href="$oriUrl(config.item[0].data.link)">
        {{ config.item[0].extraData?.title ?? config.item[0].data.title }}
      </a>
    </div>
    <ProductImage :product="config.item[0]" :key="config.item[0].id" :max-additional-images="1">
      <template #main-image="{ src, alt }">
        <Image height="150" width="150" :src="src" :alt="alt" :style="config.imageStyle" />
      </template>
      <template #aside-image>
        <div class="hidden"></div>
      </template>
    </ProductImage>
    <PriceDisplay :product="config.item[0]" :key="config.item[0].id">
      <template #price="{ localPrice }">
        <span :style="config.priceStyle">{{ localPrice }}</span>
      </template>
      <template #sale-price="{ localPrice, localSalePrice }">
        <p :style="config.salePriceContainerStyle">
          <span :style="config.salePriceStyle">{{ localSalePrice }}</span>
          <span :style="config.salePriceOriginalPriceStyle">{{ localPrice }}</span>
        </p>
      </template>
    </PriceDisplay>
  </div>
</template>