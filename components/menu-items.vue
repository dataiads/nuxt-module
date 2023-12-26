<script setup lang="ts">
const lpoConfig = useLpoConfig()

interface Props {
  configKey?: 'menu' | 'subMenu' | 'footerItems'
}

const props = withDefaults(defineProps<Props>(), {
  configKey: 'menu'
})

const entries: MenuItem[] = lpoConfig[props.configKey] || []
</script>

<template>
  <li v-for="(item, index) in entries" :key="index">
    <a v-if="item.href" :href="item.href" :style="{ color: item.color || 'inherit' }">
      <slot :text="item.text" :image-link="item.imageLink">
        <span>{{ item.text }}</span>
      </slot>
    </a>
    <span v-else :style="{ color: item.color || 'inherit' }">
      <slot :text="item.text" :image-link="item.imageLink">
        <span>{{ item.text }}</span>
      </slot>
    </span>
  </li>
</template>
