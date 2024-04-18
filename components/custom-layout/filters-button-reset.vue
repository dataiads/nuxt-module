<script setup lang="ts">
const customLayout = useCustomLayout()
const config = useLpoConfig().customLayout.mainReco

</script>

<template>
    <div v-if="config.filtersTitle">
        {{ config.filtersTitle }}
    </div>
    <button @click="customLayout?.filter.reset()" :style="config.filterParamsButtonEraseStyle"
        v-if="config.filterParamsButtonEraseEnable">
        {{ config.filterParamsButtonEraseText }}
    </button>
</template>