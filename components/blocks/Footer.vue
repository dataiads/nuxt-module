<script setup lang="ts">
const lpoConfig = useLpoConfig();
const footerColumns = lpoConfig?.footerColumns ? lpoConfig?.footerColumns : [];
const defaultUI = {
  wrapper: 'xl:grid xl:grid-cols-3 xl:gap-8 lg:container p-4',
  left: 'mb-10 xl:mb-0',
  center: 'flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:col-span-3',
  label: 'font-medium',
  list: 'mt-6 space-y-2',
  item: 'text-sm',
  right: 'mt-10 xl:mt-0',
}
const props = defineProps<{
  ui: typeof defaultUI
}>();

const { ui } = useUI(defaultUI, toRefs(props.ui));
</script>

<template>
  <div :class="ui.wrapper">
    <div :class="ui.left" v-if="$slots.left">
      <slot name="left" />
    </div>
    <div :class="ui.center">
      <slot name="center">
        <div v-for="footer in footerColumns">
          <div :class="ui.label">
            <slot name="label" :label="footer.title">
              {{ footer.title }}
            </slot>
          </div>
          <ul :class="ui.list">
            <li class="relative" v-for="column in footer.items">
              <slot name="column" :column="column">
                <a :href="column.href" v-html="column.text" :class="ui.item">
                </a>
              </slot>
            </li>
          </ul>
        </div>
      </slot>
    </div>
    <div :class="ui.right" v-if="$slots.right">
      <slot name="right" />
    </div>
  </div>
</template>
