
<script setup lang="ts">
import type { CustomLayout, StructuredRecommender } from '~/types'

defineProps<{
    config: CustomLayout;
    filter: StructuredRecommender;
}>()
</script>

<template>
    <FiltersContainer :filter="filter" :filter-params="config.mainReco.filterParams" :open="true"
        :group-style="config.mainReco.filterParamsGroupStyle" :header-style="config.mainReco.filterParamsHeaderStyle"
        :header-title-style="config.mainReco.filterParamsHeaderTitleStyle"
        :opened-icon="config.mainReco.filterParamsOpenedIcon" :closed-icon="config.mainReco.filterParamsClosedIcon"
        :header-icon-style="config.mainReco.filterParamsHeaderIconStyle"
        :checkbox-style="config.mainReco.filterParamsCheckboxStyle"
        :active-checkbox-style="config.mainReco.filterParamsActiveCheckboxStyle" />
    <div :class="config.mainReco.filterParamsButtonsGroupStyle">
        <button @click="filter.reset" type="button" :class="config.mainReco.filterParamsButtonsResetStyle"
            :disabled="filter.activeFiltersCount.value <= 0"> {{ config.mainReco.filterParamsButtonsReset }} </button>
        <button @click="filter.reset" type="button" :class="config.mainReco.filterParamsButtonsConfirmStyle"
            :disabled="filter.activeFiltersCount.value <= 0"> {{ config.mainReco.filterParamsButtonsConfirm }} </button>
    </div>
</template>