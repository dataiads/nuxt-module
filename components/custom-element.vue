<script setup lang="ts">
const props = defineProps<{
  element?: CustomLayout;
}>();
</script>

<template>
  <template v-if="props.element.el === 'slot'">
    <slot :name="props.element.name">
      <template v-if="props.element.children?.length">
        <CustomElement
          v-for="(child, index) in props.element.children"
          :key="index"
          :element="child"
        >
          <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
          </template>
        </CustomElement>
      </template>
    </slot>
  </template>
  <component
    v-else-if="props.element"
    :is="props.element.el"
    :name="props.element.name"
    :class="props.element.class"
    :style="props.element.style"
  >
    <template v-if="props.element.children?.length">
      <CustomElement
        v-for="(child, index) in props.element.children"
        :key="index"
        :element="child"
      >
        <template v-for="(_, name) in $slots" #[name]="scope">
          <slot :name="name" v-bind="scope"></slot>
        </template>
      </CustomElement>
    </template>
  </component>
</template>
