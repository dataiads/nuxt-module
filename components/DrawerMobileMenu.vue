<script setup lang="ts">
import { Dialog as HDialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'

const lpoConfig = useLpoConfig()
const headerMenu = lpoConfig?.menu ? lpoConfig?.menu : []

function setIsOpen (value: boolean) {
  isOpen.value = value
}

const props = defineProps(['modelValue', 'initialFocus', 'ui'])

const emits = defineEmits(['close', 'update:modelValue'])

const isOpen = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})
const defaultUI = {
  overlay: 'fixed inset-0 bg-black/30',
  panel: 'w-full max-w-sm bg-white overflow-y-auto',
  buttonClose: 'flex flex-col ml-auto p-4',
  wrapper: 'flex flex-col divide-y border-t border-grey1/20',
  base: 'flex p-4 items-center',
  trailingIcon: 'ml-auto h-[20px]'
}
const { ui } = useUI(defaultUI, toRefs(props.ui))
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <HDialog as="div" class="relative z-10" @close="isOpen = false">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div :class="ui.overlay" />
      </TransitionChild>

      <div class="fixed inset-0 flex w-3/4">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0 -translate-x-full"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0 -translate-x-full"
        >
          <DialogPanel :class="ui.panel">
            <button :class="ui.buttonClose" @click="setIsOpen(false)">
              <slot name="close" :close="() => setIsOpen(false)">
                <svg
                  class=""
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  width="16"
                  height="16"
                >
                  
                  <path
                    d="M16 14.586L28.293 2.293a1 1 0 011.414 1.414L17.414 16l12.293 12.293a1 1 0 01-1.414 1.414L16 17.414 3.707 29.707a1 1 0 11-1.414-1.414L14.586 16 2.293 3.707a1 1 0 011.414-1.414L16 14.586z"
                    fill="#1A2A34"
                  />
                </svg>
              </slot>
            </button>
            <ul :class="ui.wrapper">
              <li v-for="(item, itemIndex) in headerMenu" :key="itemIndex">
                <a :href="item.href" :style="{ color: item.color }" :class="ui.base">
                  {{ item.text }}
                  <div :class="ui.trailingIcon">
                    <slot name="trailingIcon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24">
                        <path
                          fill="none"
                          stroke="#888888"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="m8.25 4.5l7.5 7.5l-7.5 7.5"
                        />
                      </svg>
                    </slot>
                  </div>
                </a>
              </li>
            </ul>
          </DialogPanel>
        </TransitionChild>
      </div>
    </HDialog>
  </TransitionRoot>
</template>
