<script setup lang="ts">
type Breadcrumbs = {
  href?: string, title: string
}[]

const product = useProduct()
const items = getCustomAttrJSON<Breadcrumbs>(product.value, 'breadcrumbs', [])
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, i) in items">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="item.href" :href="item.href">
            {{ item.title }}
          </BreadcrumbLink>
          <BreadcrumbPage v-else>
            {{ item.title }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="i !== items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
