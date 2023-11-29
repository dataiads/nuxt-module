<script setup lang="ts">
import { BannerElement, BannerParams } from "~/types";

const props = defineProps<{
  config: BannerParams;
}>();

const rootStyle = computed(() => ({
  background: props.config.background,
}));

const messageStyle = (element: BannerElement) => ({
  background: element.background,
  color: element.color,
  paddingTop: element.yPadding,
  paddingBottom: element.yPadding,
  fontSize: element.fontSize,
});

const activeIndex = ref(0);
const element = computed(() => props.config.elements[activeIndex.value]);

if (props.config.interval > 0) {
  setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.config.elements.length;
  }, props.config.interval);
}
</script>

<template>
  <div :style="rootStyle">
    <div v-if="element.type === 'html'" v-html="element.html"></div>

    <div
      v-else-if="element.type === 'message'"
      class="flex flex-row justify-center items-center"
      :style="messageStyle(element)"
    >
      <a :href="element.link" v-if="element.link">
        <span>{{ element.text }}</span>
      </a>
      <span v-else>{{ element.text }}</span>
    </div>
  </div>
</template>
