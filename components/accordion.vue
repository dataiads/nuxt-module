<script setup lang="ts">
/**
 * This component is highly inspired from nuxt ui accordion component
 */
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

interface Props {
  class: string;
  columns: {
    title: string;
    items: {
      href: string;
      text: string;
    }[];
  }[];
}

withDefaults(defineProps<Props>(), {
  class: "w-full flex flex-col border-b border-grey3",
});

const onEnter = (el: HTMLElement, done) => {
  el.style.height = "0";
  el.offsetHeight; // Trigger a reflow, flushing the CSS changes
  el.style.height = el.scrollHeight + "px";

  el.addEventListener("transitionend", done, { once: true });
};

const onBeforeLeave = (el: HTMLElement) => {
  el.style.height = el.scrollHeight + "px";
  el.offsetHeight; // Trigger a reflow, flushing the CSS changes
};

const onAfterEnter = (el: HTMLElement) => {
  el.style.height = "auto";
};

const onLeave = (el: HTMLElement, done) => {
  el.style.height = "0";

  el.addEventListener("transitionend", done, { once: true });
};
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    v-for="column in columns"
    as="div"
    :class="class"
  >
    <DisclosureButton
      class="flex items-center justify-between gap-2 cursor-pointer outline-none p-4"
    >
      <slot name="title" :value="column.title">
        <span class="font-bold text-lg">
          {{ column.title }}
        </span>
      </slot>
      <slot name="append" :open="open" />
    </DisclosureButton>
    <Transition
      enter-active-class="overflow-hidden transition-all duration-150 ease-out"
      leave-active-class="overflow-hidden transition-all duration-150 ease-out"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <DisclosurePanel class="px-4 pb-4">
        <slot name="panel" :item="column.items">
          <ul class="flex flex-col gap-2">
            <li
              v-for="(item, itemIndex) in column.items"
              :key="'panel_' + itemIndex"
            >
              <a :href="item.href">{{ item.text }}</a>
            </li>
          </ul>
        </slot>
      </DisclosurePanel>
    </Transition>
  </Disclosure>
</template>
