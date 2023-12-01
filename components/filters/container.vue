<script setup lang="ts">
const AsideItem = resolveComponent("AsideItem");

const props = withDefaults(
  defineProps<{
    open: boolean;
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
const filter = useFilterState();
const filterParams = lpoConfig.mainReco.filterParams as FilterElement[] || lpoConfig?.filterParams;

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
  groups.forEach((g) => filter.removeAllRules(g));
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
        />
      </template>
    </component>
  </div>
</template>
