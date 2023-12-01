<script setup lang="ts">
type Element = {
    type: string;
    enable: boolean;
    autoScroll?: boolean;
    scrollSpeed?: number;
    algo: any
}
interface Props {
    elements: Element[]
}
defineProps<Props>()
</script>

<template>
  <div
    v-for="(element, i) in elements"
    :id="element.type"
    :key="'el_' + i"
  >
    <slot v-if="element.enable" :name="element.type" :options="element" />
    <RecoSlider
      v-if="element.type === 'reco-slider' && element.enable"
      :slider-props="{
        autoscroll: element.autoScroll,
        scrollSpeed: element.scrollSpeed,
      }"
      :algo="element.algo"
    >
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope"></slot>
      </template>
    </RecoSlider>
  </div>
</template>
