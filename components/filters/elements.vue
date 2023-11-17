<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    parameters: { title: string };
    elements: { component: 'autolist-checkbox' | 'checkbox' | 'range'; props: any}[];
    filter: Recommender;
    inputClass?: string;
    checkboxClass?: string;
    labelClass?: string;
    autoListClass?: string;
    rangeClass?: string;
    checkboxContainerClass?: string;
  }>(),
  {
    inputClass: "border-[#9E9E9E]",
    checkboxClass:
      "text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer",
    labelClass: "leading-[15px] text-sm",
    autoListClass: "flex items-center gap-3",
    rangeClass: "grid grid-cols-2 gap-2",
    checkboxContainerClass: "flex items-center gap-3",
  }
);

const hasCheckboxSlot = computed(() => {
  const instance = getCurrentInstance();
  return !!instance!.slots.checkbox;
});

const hasLabelSlot = computed(() => {
  const instance = getCurrentInstance();
  return !!instance!.slots.checkbox_label;
});
</script>

<template>
  <div>
    <template v-for="{ component, props } in elements">
      <FiltersAutolistCheckbox
        v-if="component === 'autolist-checkbox'"
        v-bind="props"
        :filter="filter"
        :class="autoListClass"
        :input-class="hasCheckboxSlot ? checkboxClass : ''"
        :label-class="hasLabelSlot ? labelClass : ''"
      >
        <template #checkbox="scope">
          <slot
            name="checkbox"
            :info="{ id: scope.info.id, type: scope.info.type }"
            :get="scope.get"
            :set="scope.set"
          >
            <slot
              name="auto_checkbox"
              :info="{ id: scope.info.id, type: scope.info.type }"
              :get="scope.get"
              :set="scope.set"
            />
          </slot>
        </template>
        <template #label="{ value, count }">
          <slot name="checkbox_label" :value="value" :count="count">
            <slot name="auto_list_label" :value="value" :count="count">
              <slot :name="`auto_list_label_${parameters.title}`">
                <template v-if="value">{{ value }} ({{ count }})</template>
              </slot>
            </slot>
          </slot>
        </template>
      </FiltersAutolistCheckbox>
      <FiltersRangeInputs
        v-else-if="component === 'range'"
        :filter="filter"
        v-bind="props"
        :class="rangeClass"
        :input-class="inputClass"
        :label-class="labelClass"
      />
      <FiltersCheckbox
        v-else-if="component === 'checkbox'"
        :filter="filter"
        :input-class="hasCheckboxSlot ? checkboxClass : ''"
        :label-class="hasLabelSlot ? labelClass : ''"
        :class="checkboxContainerClass"
        v-bind="props"
      >
        <template #checkbox="scope">
          <slot
            name="checkbox"
            :info="{ id: scope.info.id, type: scope.info.type }"
            :get="scope.get"
            :set="scope.set"
          >
          </slot>
        </template>
        <template #label="{ value }">
          <slot name="checkbox_label" :value="value">
            <template v-if="value">{{ value }}</template>
          </slot>
        </template>
      </FiltersCheckbox>
      <slot v-else :name="`filter_${parameters.title}`" />
    </template>
  </div>
</template>
