<script setup lang="ts">
import type { RecoSliderItemParams } from '~/types';

defineProps<{ config: RecoSliderItemParams }>()
</script>

<template>
  <div class="text-center" :style="config.style">
    <div :style="config.titleStyle">
      <a :href="$oriUrl(config.item.data.link)">
        {{ config.item.extraData?.title ?? config.item.data.title }}
      </a>
    </div>
    <ProductImage :product="config.item" :key="config.item.id" :max-additional-images="1">
      <template #main-image="{ src, alt }">
        <Image height="150" width="150" :src="src" :alt="alt" :style="config.imageStyle" />
      </template>
      <template #aside-image>
        <div class="hidden"></div>
      </template>
    </ProductImage>
    <div>
      <PriceDisplay :product="config.item" :key="config.item.id">
        <template #price="{ localPrice }">
          <span :style="config.priceStyle">{{ localPrice }}</span>
        </template>
        <template #sale-price="{ localPrice, localSalePrice }">
          <p class="flex items-center">
            <span :style="config.priceStyle">{{ localSalePrice }}</span>
            <span class="line-through" :style="config.priceStyle">{{ localPrice }}</span>
          </p>
        </template>
      </PriceDisplay>
    </div>
  </div>
</template>