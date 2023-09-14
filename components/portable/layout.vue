<script setup lang="ts">
defineProps<{
  element: LayoutElement;
}>();
</script>

<template>
  <PortableSlot v-if="element.element === 'slot'" :element="(element as SlotLayoutElement)">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}"></slot>
    </template>
  </PortableSlot>

  <!-- Banner -->
  <AutoscrollBanner
    v-else-if="element.element === 'banner'"
    :class="element.class ?? ''"
    :banners="element.params?.banners"
    :background-color="element.params?.background"
    :color="element.params?.color"
    v-slot="banner"
  >
    <div :class="banner.class">{{ banner.text }}</div>
  </AutoscrollBanner>

  <!-- Slider -->
  <PortableSlider
    v-else-if="element.element === 'recoSlider'"
    :element="(element as RecoSliderLayoutElement)"
  >
    <template #reco-slider-header="scope">
      <slot name="reco-slider-header" v-bind="scope"></slot>
    </template>
    <template #reco-slider-item="{ item }">
      <slot name="reco-slider-item" :key="item.id" :item="item"></slot>
    </template>
    <template #reco-slider-previous-btn="scope">
      <slot name="reco-slider-previous-btn" v-bind="scope"></slot>
    </template>
    <template #reco-slider-next-btn="scope">
      <slot name="reco-slider-next-btn" v-bind="scope"></slot>
    </template>
  </PortableSlider>

  <!-- filters -->
  <PortableFilters v-else-if="element.element === 'filters'">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}"></slot>
    </template>
  </PortableFilters>

  <component v-else-if="element.element === 'dom' || element.element === 'root'" :is="element.params.tag ?? 'div'" :class="element.class ?? ''">
    <PortableLayout
      v-for="(child, index) in element.children"
      :key="index"
      :element="child"
    >
      <template v-for="(_, name) of $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}"></slot>
      </template>
    </PortableLayout>
  </component>
</template>
