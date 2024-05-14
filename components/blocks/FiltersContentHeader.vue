<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const defaultUI = {
  wrapper: 'flex lg:flex-row flex-col justify-between items-center',
  title: 'font-bold lg:text-2xl text-xl px-4 lg:px-0 py-2',
  select: 'ml-auto border rounded focus:border-primary font-medium focus:ring-primary text-sm w-full lg:w-fit py-2 lg:py-0',
  filter: 'grid grid-cols-2 w-full lg:w-fit lg:block text-sm items-center px-4 border-t border-b border-[#E6E6E6] lg:border-none lg:divide-none',
  button: 'flex gap-2 items-center lg:hidden py-2 border-r border-[#E6E6E6] font-medium'
}

const props = withDefaults(defineProps<{
  ui: typeof defaultUI,
  /**
   * Remove select border on desktop for the selector
   */
  noBorder: boolean;
  /**
   * Options of the select
   */
  options: {
    value: string;
    label: string;
  }[]
}>(), {
  options: () => [
    { value: 'price', label: 'priceUp' },
    { value: '-price', label: 'priceDown' }
  ],
  noBorder: false
})

const customLayout = useCustomLayout()
const { ui } = useUI(defaultUI, toRef(props, 'ui'))



if (props.noBorder) {
  ui.value.select = twMerge(ui.value.select, 'border-none focus:ring-0 focus:border-none')
}


</script>

<template>
  <div :class="ui.wrapper">
    <slot name="title">
      <span :class="ui.title">
        <DynamicLabel :value="$t('discoverMore') + ' {' + $t('discoverMoreKey') + '}'" />
      </span>
    </slot>
    <slot name="append-title" />
    <div :class="ui.filter">
      <slot name="button">
        <button :class="ui.button" @click="customLayout?.toggleFiltersSlideover">
          <slot name="filterIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M10 8h10M4 16h10" /><circle cx="7" cy="8" r="3" transform="rotate(90 7 8)" /><circle cx="17" cy="16" r="3" transform="rotate(90 17 16)" /></g></svg>
          </slot>
          <span>
            {{ $t('filter') }}
          </span>
        </button>
      </slot>
      <div>
        <slot name="select">
          <select
            v-model="customLayout.filter.sort.value"
            :class="ui.select"
          >
            <option value="">
              {{ $t('sortBy') }}
            </option>
            <option
              v-for="option in options"
              :key="option.label"
              :value="option.value"
            >
              {{ $t(option.label) }}
            </option>
          </select>
        </slot>
      </div>
    </div>
  </div>
</template>