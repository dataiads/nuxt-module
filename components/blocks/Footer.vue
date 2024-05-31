<script setup lang="ts">
/* eslint-disable vue/no-v-html */
const lpoConfig = useLpoConfig()
const footerColumns = lpoConfig?.footerColumns ? lpoConfig?.footerColumns : []
const defaultUI = {
  wrapper: 'xl:grid xl:grid-cols-3 xl:gap-8 lg:container p-4',
  left: 'mb-10 xl:mb-0',
  center: 'flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-3',
  label: 'font-medium',
  list: 'mt-6 space-y-2',
  item: 'text-sm',
  right: 'mt-10 xl:mt-0'
}
const props = defineProps<{
  ui: typeof defaultUI
}>()

const { ui } = useUI(defaultUI, toRef(props, 'ui'))
</script>

<template>
  <div :class="ui.wrapper">
    <div v-if="$slots.left" :class="ui.left">
      <slot name="left" />
    </div>
    <div :class="ui.center">
      <slot name="center">
        <div v-for="(footer, index) in footerColumns" :key="index">
          <div :class="ui.label">
            <slot name="label" :label="footer.title">
              {{ footer.title }}
            </slot>
          </div>
          <ul :class="ui.list">
            <li v-for="(column, i) in footer.items" :key="i" class="relative">
              <slot name="column" :column="column">
                <a :key="i" :href="column.href" :class="ui.item" v-html="column.text" />
              </slot>
            </li>
          </ul>
        </div>
      </slot>
    </div>
    <div v-if="$slots.right" :class="ui.right">
      <slot name="right" />
    </div>
  </div>
</template>
