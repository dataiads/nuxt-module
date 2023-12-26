<script setup lang="ts">
/**
 * This component is highly inspired from nuxt ui accordion component
 */
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

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
  class: 'w-full flex flex-col border-b border-grey3'
})

const onEnter = (el: Element, done: any) => {
  const hel = el as HTMLElement
  hel.style.height = '0'
  hel.offsetHeight // Trigger a reflow, flushing the CSS changes
  hel.style.height = el.scrollHeight + 'px'

  hel.addEventListener('transitionend', done, { once: true })
}

const onBeforeLeave = (el: Element) => {
  const hel = el as HTMLElement
  hel.style.height = el.scrollHeight + 'px'
  hel.offsetHeight // Trigger a reflow, flushing the CSS changes
}

const onAfterEnter = (el: Element) => {
  const hel = el as HTMLElement
  hel.style.height = 'auto'
}

const onLeave = (el: any, done: any) => {
  const hel = el as HTMLElement
  hel.style.height = '0'

  hel.addEventListener('transitionend', done, { once: true })
}
</script>

<template>
  <Disclosure
    v-for="column in columns"
    v-slot="{ open }"
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
    <transition
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
    </transition>
  </Disclosure>
</template>
