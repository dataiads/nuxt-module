<script setup lang="ts">
import { debounce } from "lodash";

const uuid = Math.floor(Math.random() * 10 ** 16).toString();

const props = defineProps<{
  label: string
  filter: Filter
  criteria: string
  operator: string
  placeholder: string
  group: string
  type: string
  min: string
}>();

let value = computed(() => props.filter.getFirstRuleValue(props.group) || "");
let change = debounce((evt: Event) => {
  let val = (evt.target as HTMLInputElement).value;
  if (val != "") {
    props.filter.setOnlyRule(props.group, props.criteria, props.operator, val);
  } else {
    props.filter.removeAllRules(props.group);
  }
}, 200);
</script>

<template>
<div class="flex items-center my-4">
	<input
		class="focus:border-secondary text-black focus:ring-black focus:ring-1 w-full text-black border-black font-normal"
      :id="uuid"
      :value="value"
      @change="change"
      @keyup="change"
      :placeholder="props.placeholder"
      :type="type"
      :min="props.min"
	/>
	<label class="ml-3 font-normal text-black leading-[15px]" :for="uuid">
		<span v-if="props.label">{{ props.label }}</span>
		<slot v-else></slot>
  </label>
</div>
</template>
