<script setup lang="ts">
import type { StructuredRecommender } from '~/types'
import type { StyleValue } from 'vue'

const AsideItem = resolveComponent('AccessibleAsideItem')

const props = withDefaults(
  defineProps<{
    open: boolean;
    filter: StructuredRecommender;
    filterParams: FilterElement[];
    headerClass?: string;
    headerButtonClass?: string;
    asideItemClass?: string;
    groupStyle?: StyleValue;
    headerStyle?: StyleValue;
    headerTitleStyle?: StyleValue;
    openedIcon?: string;
    closedIcon?: string;
    headerIconStyle?: StyleValue;
    checkboxStyle?: StyleValue;
    activeCheckboxStyle?: StyleValue;
    colors?: {
      name: string;
      value: string;
    }[];
  }>(),
  {
    asideItemClass: '!h-auto',
    headerClass: 'cursor-pointer lg:py-4 flex items-center',
    headerButtonClass: 'w-full',
    rangeInputClass: 'grid grid-cols-2 gap-2',
    inputClass: 'border-[#9E9E9E]',
    groupStyle: null,
    headerStyle: null,
    openedIcon: '',
    closedIcon: '',
    headerTitleStyle: null,
    headerIconStyle: null,
    checkboxStyle: null,
    activeCheckboxStyle: null,
    colors: () => ([])
  }
)

const lpoConfig = useLpoConfig()
const filterParams = props.filterParams || lpoConfig?.filterParams

// Add the group key to props
filterParams.forEach((f, groupIndex) => {
  f.elements.forEach((el, elementIndex) => {
    el.props.group = `auto-${groupIndex}-${elementIndex}`  // name convention is reused in ~/composables/custom-layout.ts
  })
})

// Return the group from filterParam
const getGroups = (filterParam: FilterElement) => {
  return filterParam.elements.map((el) => el.props.group)
}

const removeAllRulesFromGroups = (groups: string[]) => {
  groups.forEach((g) => props.filter.removeAllRules(g))
}
</script>

<template>
  <div>
    <AsideItem
      v-for="filterParam in filterParams"
      :key="filterParam.title"
      :header-class="headerButtonClass"
      :display="open"
      :class="asideItemClass"
      :style="groupStyle"
      content-class=""
    >
      <template #header="{ displayed }">
        <slot name="header" :displayed="displayed" :title="filterParam.title">
          <div :class="[{ headerClass: !headerStyle }, { '': displayed }]" :style="headerStyle">
            <slot name="title" :value="filterParam.title">
              <span :style="headerTitleStyle" class="">
                <DynamicLabel :value="filterParam.title" />
              </span>
            </slot>
            <slot name="append" :displayed="displayed">
              <img v-if="displayed && openedIcon" :style="headerIconStyle" :src="openedIcon">
              <img v-else-if="!displayed && closedIcon" :style="headerIconStyle" :src="closedIcon">
            </slot>
          </div>
        </slot>
      </template>

      <template #content>
        <slot name="prepend-content" :remove-all-filter="removeAllRulesFromGroups" :groups="getGroups(filterParam)" />
        <slot
          name="content"
          :elements="filterParam.elements"
          :parameters="filterParam"
          :remove-all-filter="() => removeAllRulesFromGroups(getGroups(filterParam))"
        >
          <FiltersElements
            :filter="filter"
            :elements="filterParam.elements"
            :parameters="filterParam"
            :colors="colors"
          >
            <template #checkbox="{ get, set, info }">
              <input
                v-bind="info"
                type="checkbox"
                :checked="get()"
                :style="get() ? [checkboxStyle, activeCheckboxStyle] : [checkboxStyle]"
                class="appearance-none focus:ring-0"
                @change="set(($event.target as HTMLInputElement)?.checked)"
              >
            </template>
          </FiltersElements>
        </slot>
      </template>
    </AsideItem>
  </div>
</template>
