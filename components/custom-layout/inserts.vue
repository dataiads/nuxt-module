<script setup lang="ts">
import type { InsertParams } from "~/types";

defineProps<{
  config: InsertParams[];
}>();
</script>

<template>
  <template v-for="(insert, index) in config.filter((i) => i.enabled)">
    <CustomLayoutRecoSlider
      v-if="insert.type === 'reco-slider'"
      :key="'slider-' + index"
      :config="insert"
    >
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutRecoSlider>

    <CustomLayoutCrossSell
      v-else-if="insert.type === 'cross-sell'"
      :key="'crosssell-' + index"
      :config="insert"
    >
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutCrossSell>

    <CustomLayoutBanner
      v-else-if="insert.type === 'banner'"
      :key="'banner-' + index"
      :config="insert"
    >
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </CustomLayoutBanner>
  </template>
</template>
