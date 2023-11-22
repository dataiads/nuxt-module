<script setup lang="ts">
const props = defineProps(layoutProps);

const config = {
    prependHeader: [
      {
        type: "banner",
        options: {},
      },
    ],
    postHeader:[
      {
        type: "breadcrumb",
        options: {
          enable: true,
        },
      },
    ]
}
</script>

<template>
  <div class="lg:mx-auto">
    <!-- Prepend Header-->
    <div>
      <slot name="sticky-reco-overlay" />
    </div>

    <header id="header">
      <slot name="header" />
    </header>

    <div v-for="(element, i) in config.postHeader" :id="element.type" :key="'postheader_' + i" >
      <slot v-if="element.options.enable" :name="element.type">
    </slot>
    </div>

    <main id="main-product"></main>
  </div>
</template>
