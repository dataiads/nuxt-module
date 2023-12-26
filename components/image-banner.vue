<script setup lang="ts">
interface Props {
  // banners can also be injected using the lpo config
  banner?: ImageBanner;

  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: ''
})

const lpoConfig = useLpoConfig()

const banner = props.banner ?? lpoConfig.imageBanner ?? { href: '#', imageLink: '', desktopImageLink: '', mobileImageLink: '' }
</script>

<template>
  <a v-if="banner" :class="class" :href="banner.href ?? '#'">
    <picture>
      <source v-if="banner.desktopImageLink" :srcset="banner.desktopImageLink" media="(min-width: 768px)">
      <source v-if="banner.mobileImageLink" :srcset="banner.mobileImageLink" media="(max-width: 767px)">
      <img :src="banner.imageLink" style="width: 100%; height: auto;" alt="">
    </picture>
  </a>
</template>
