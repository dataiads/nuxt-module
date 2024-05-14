<script setup lang="ts">
type Breadcrumbs = {
  href?: string, text: string
}[]
const props = defineProps<{
  breadcrumbs?: Breadcrumbs
  lastItemClass?: string
  separator?: string;
  appendDataKey: keyof ProductData
}>()

const product = useProduct()

const breadcrumbs = computed(() => {
  if (props.appendDataKey) {
    const data = getCustomAttrJSON<Breadcrumbs>(product.value, 'breadcrumbs', [])
    
    if (product.value.data[props.appendDataKey]) {
      data.push({ text: product.value.data[props.appendDataKey] as string })
    } else if (getCustomAttr(product.value, props.appendDataKey)) {
      data.push({ text: getCustomAttr(product.value, props.appendDataKey) as string })
    }
    return data
  }
  return props.breadcrumbs ? props.breadcrumbs : getCustomAttrJSON<Breadcrumbs>(product.value, 'breadcrumbs', [])
})

</script>

<template>
  <ul v-if="breadcrumbs.length" class="flex items-center gap-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
    <li v-for="(item, i) in breadcrumbs" :key="'breadcrumb_' + item.href">
      <component :is="item.href ? 'a' : 'span'" :href="item.href">
        <slot v-if="i !== breadcrumbs.length - 1" :text="item.text">
          {{ item.text }}
        </slot>
        <slot v-else-if="i === breadcrumbs.length - 1" name="last" :text="item.text">
          <span :class="lastItemClass">
            {{ item.text }}
          </span>
        </slot>
      </component>
      <slot v-if="i !== breadcrumbs.length - 1" name="separator">
        <span class="ml-2">
          {{ separator }}
        </span>
      </slot>
    </li>
  </ul>
</template>