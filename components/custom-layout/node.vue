<script setup lang="ts">
defineProps<{
  element: LayoutElement;
  context: CustomLayoutContext;
}>();
</script>

<template>
  <!-- Slot -->
  <CustomLayoutSlot v-if="element.element === 'slot'" :element="element">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" :context="context"></slot>
    </template>
  </CustomLayoutSlot>

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
  <CustomLayoutSlider
    v-else-if="element.element === 'recoSlider'"
    :element="element"
  >
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" :context="context"></slot>
    </template>
  </CustomLayoutSlider>

  <!-- Drawer -->
  <CustomLayoutDrawer v-else-if="element.element === 'drawer'" :element="element">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" :context="context"></slot>
    </template>
  </CustomLayoutDrawer>

  <!-- Filters -->
  <CustomLayoutFilter v-else-if="element.element === 'filter'" :filterKey="element.params?.key" :context="context">
    <template v-for="(_, name) of $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" :context="context"></slot>
    </template>
  </CustomLayoutFilter>

  <component v-else-if="element.element === 'dom'" :is="element.params?.tag ?? 'div'" :class="element.class ?? ''">
    {{ element.params?.innerText ?? '' }}
    <CustomLayoutNode
      v-for="(child, index) of element.children"
      :key="index"
      :element="child"
      :context="context"
    >
      <template v-for="(_, name) of $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}" :context="context"></slot>
      </template>
    </CustomLayoutNode>
  </component>
</template>
