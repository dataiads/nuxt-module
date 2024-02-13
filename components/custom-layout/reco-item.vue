<script setup lang="ts">
import type { RecoItemParams } from '~/types'

defineProps<{ config: RecoItemParams }>()
</script>

<template>
  <div :style="config.style.style">
    <div :style="config.style.titleStyle">
      <a :href="$oriUrl(config.item[0].data.link)">
        {{ config.item[0].extraData?.title ?? config.item[0].data.title }}
      </a>
    </div>
    <ProductImage :key="config.item[0].id" :product="config.item[0]" :max-additional-images="1">
      <template #main-image="{ src, alt }">
        <Image height="150" width="150" :src="src" :alt="alt" :style="config.style.imageStyle" />
      </template>
      <template #aside-image>
        <div class="hidden" />
      </template>
    </ProductImage>
    <PriceDisplay :key="config.item[0].id" :product="config.item[0]">
      <template #price="{ localPrice }">
        <span :style="config.style.priceStyle">{{ localPrice }}</span>
      </template>
      <template #sale-price="{ localPrice, localSalePrice }">
        <p :style="config.style.salePriceContainerStyle">
          <span :style="config.style.salePriceStyle">{{ localSalePrice }}</span>
          <span :style="config.style.salePriceOriginalPriceStyle">{{ localPrice }}</span>
        </p>
      </template>
    </PriceDisplay>
  </div>
</template>