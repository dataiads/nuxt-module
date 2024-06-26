<script setup lang="ts">
import { Dialog as HDialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

const lpoConfig = useLpoConfig()

function setIsOpen (value: boolean) {
  isOpen.value = value
}
const defaultUI = {
  overlay: 'fixed inset-0 bg-black/30',
  panel: 'w-full max-w-sm bg-white overflow-y-auto relative',
  buttonClose: 'flex flex-col ml-auto p-4',
  wrapper: 'flex flex-col divide-y border-t border-grey1/20',
  base: 'flex p-4 items-center',
  trailingIcon: 'ml-auto h-[20px]'
}

const props = withDefaults(defineProps<{
  ui: Partial<typeof defaultUI>,
  modelValue: boolean,
  initialFocus: any,
  menu?: MenuItem[],
  side: 'left' | 'right'
}>(), { side: 'left' })

const headerMenu = computed(() => props.menu ? props.menu : lpoConfig.menu ? lpoConfig.menu : [])

const emits = defineEmits(['close', 'update:modelValue'])

const isOpen = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})
const { ui } = useUI(defaultUI, toRef(props, 'ui'))

const transitionClass = computed(() => {
  return {
    enter: 'ease-in-out duration-500',
    leave: 'ease-in-out duration-500',
    enterFrom: props.side === 'left' ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full',
    enterTo: 'opacity-100 translate-x-0',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: props.side === 'left' ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
  }
})
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <HDialog as="div" class="fixed inset-0 flex z-50" :class="{ 'justify-end': side === 'right' }" @close="isOpen = false">
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

      <TransitionChild
        v-bind="transitionClass"
        as="template"
      >
        <DialogPanel :class="ui.panel">
          <slot name="top" />
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
                <img v-if="item.imageLink" :src="item.imageLink">
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
    </HDialog>
  </TransitionRoot>
</template>
