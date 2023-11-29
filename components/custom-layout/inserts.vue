
<script setup lang="ts">
import { InsertParams } from '~/types';

defineProps<{
    config: InsertParams[];
}>();
</script>

<template>
    <template v-for="insert in config.filter(i => i.enabled)">
        <CustomLayoutRecoSlider v-if="insert.type === 'reco-slider'"  :config="insert">
            <template v-for="(_, name) in $slots" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </CustomLayoutRecoSlider>

        <CustomLayoutCrossSell v-else-if="insert.type === 'cross-sell'" :config="insert">
            <template v-for="(_, name) in $slots" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </CustomLayoutCrossSell>

        <CustomLayoutBanner v-else-if="insert.type === 'banner'" :config="insert">
            <template v-for="(_, name) in $slots" #[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
        </CustomLayoutBanner>
    </template>
</template>