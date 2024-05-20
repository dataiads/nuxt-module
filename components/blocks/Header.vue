<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const lpoConfig = useLpoConfig()

const defaultUI = {
  container: 'lg:container lg:mx-auto mx-4 flex items-center justify-between gap-3',
  left: 'flex items-center justify-between lg:flex-1 gap-2',
  item: 'duration-200 hover:text-secondary',
  logo: 'flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-2',
  center: 'hidden lg:flex lg:flex-1 justify-between gap-x-8',
  right: 'flex items-center justify-end lg:flex-1 gap-2',
  panel: 'absolute z-10'
}

const props = defineProps<{
  ui: typeof defaultUI,
  menu: MenuItem[]
}>()

const headerMenu = computed(() => props.menu ? props.menu : lpoConfig.menu ? lpoConfig.menu : [])

const { ui } = useUI(defaultUI, toRef(props, 'ui'))

const mirroredDomain = useMirroredDomain()

const popoverBtn = ref()
const timeOut = ref()
const handleEnter = (open: boolean, i: number) => {
  clearTimeout(timeOut.value)
  !open && popoverBtn.value[i].$el.click()
}

const handleLeave = (i: number) => {
  timeOut.value = setTimeout(() => {
    popoverBtn.value[i].$el.click()
  }, 150)
}
</script>

<template>
  <div :class="ui.container">
    <div v-if="$slots.left || $slots.logo" :class="ui.left">
      <slot name="left" />

      <div v-if="$slots.logo" :class="ui.logo">
        <a :href="mirroredDomain">
          <slot name="logo" />
        </a>
      </div>
    </div>
    <ul :class="ui.center">
      <slot name="center">
        <ul v-for="(menu, i) in headerMenu" :key="'menu' + menu.text" class="relative">
          <Popover v-slot="{ open }" class="relative" @mouseleave="menu.children ? handleLeave(i) : null">
            <component :is="menu.children ? PopoverButton : 'button'" ref="popoverBtn" @mouseover="menu.children ? handleEnter(open, i) : null">
              <slot name="item" :item="menu" :index="i">
                <a :href="menu.href" :class="ui.item" :style="{ color: menu.color }" v-html="menu.text" />
              </slot>
            </component>
            <PopoverPanel v-if="menu.children && menu.children.length" :class="ui.panel">
              <slot name="children" :children="menu.children">
                <div v-for="child in menu.children">
                  <a
                    :href="child.href"
                    :class="ui.item"
                    :style="{ color: child.color }"
                    v-html="child.text"
                  />
                </div>
              </slot>
            </PopoverPanel>
          </Popover>
        </ul>
      </slot>
    </ul>
    <div v-if="$slots.right" :class="ui.right">
      <slot name="right" />
    </div>
  </div>
</template>

