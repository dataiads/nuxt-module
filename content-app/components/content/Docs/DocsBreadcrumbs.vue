<script setup lang="ts">
type Breadcrumbs = {
  href?: string;
  title: string;
}[];

const product = useProduct();
const items = getCustomAttrJSON<Breadcrumbs>(product.value, "breadcrumbs", []);
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, i) in items" :key="'breadcrumb_' + i">
        <BreadcrumbItem>
          <BreadcrumbLink
            v-if="item.href"
            :href="item.href"
            :class="{ 'hidden md:block': i !== items.length - 1 && i !== 0 }"
          >
            {{ item.title }}
          </BreadcrumbLink>
          <BreadcrumbPage
            v-else
            :class="{ 'hidden md:block': i !== items.length - 1 && i !== 0 }"
          >
            {{ item.title }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="i !== items.length - 1" />
        <BreadcrumbEllipsis v-if="i === 0" class="md:hidden" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
