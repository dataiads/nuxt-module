<script setup lang="ts">
import type { StructuredRecommender } from "~/types";

const AsideItem = resolveComponent("AsideItem");

const props = withDefaults(
  defineProps<{
    open: boolean;
    filter: StructuredRecommender;
    filterParams?: FilterElement[];
    headerClass?: string;
    asideItemClass?: string;
    rootComponent?: Component;
  }>(),
  {
    asideItemClass: "!h-auto px-4 py-2",
    headerClass: "cursor-pointer lg:py-4 flex items-center",
    rangeInputClass: "grid grid-cols-2 gap-2",
    inputClass: "border-[#9E9E9E]",
  }
);

const lpoConfig = useLpoConfig();
const filterParams = props.filterParams || lpoConfig?.filterParams;

// Add the group key to props
filterParams.forEach((f) => {
  f.elements.forEach((el) => {
    el.props.group = `${f.title}-${el.component}-filter`;
  });
});

// Return the group from filterParam
const getGroups = (filterParam: FilterElement) => {
  return filterParam.elements.map((el) => el.props.group);
};

const removeAllRulesFromGroups = (groups: string[]) => {
  groups.forEach((g) => props.filter.removeAllRules(g));
};
</script>

<template>
  <div>
    <component
      :is="rootComponent ? rootComponent : AsideItem"
      :display="open"
      :class="asideItemClass"
      v-for="filterParam in filterParams"
      :key="filterParam.title"
      contentClass=""
    >
      <template #header="{ displayed }">
        <slot name="header" :displayed="displayed" :title="filterParam.title">
          <div :class="headerClass" v-bind:class="{ '': displayed }">
            <slot name="title" :value="filterParam.title">
              <span
                class="grow whitespace-nowrap py-2 md:p-[0] font-bold md:text-[16px]"
                >{{ filterParam.title }}</span
              >
            </slot>
            <slot name="append" :displayed="displayed" />
          </div>
        </slot>
      </template>

      <template #content>
        <slot
          name="prepend-content"
          :removeAllFilter="removeAllRulesFromGroups"
          :groups="getGroups(filterParam)"
        >
        </slot>
        <slot
          name="content"
          :elements="filterParam.elements"
          :parameters="filterParam"
          :removeAllFilter="removeAllRulesFromGroups(getGroups(filterParam))"
        >
          <FiltersElements
            class="flex flex-col max-h-[300px] overflow-y-auto gap-3 mb-3"
            :filter="filter"
            :elements="filterParam.elements"
            :parameters="filterParam"
          >
            <template #checkbox="{ get, set, info}">
              <input
                v-bind="info"
                type="checkbox"
                :checked="get()"
                @change="set(($event.target as HTMLInputElement)?.checked)"
                class="text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer"
              />
            </template>
          </FiltersElements>
        </slot>
      </template>
    </component>
  </div>
</template>
