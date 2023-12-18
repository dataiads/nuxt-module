<script setup lang="ts">
const config = useRuntimeConfig();

const props = defineProps<{
  src: string;
  hoverSrc?: string;
  width: string;
  height: string;
  class?: string;
  loading?: "eager" | "lazy" | undefined;
  format?: string;
  alt?: string;
  srcset?: string;
  picture?: boolean;
  zoom?: boolean;
  // optional: remove elements from the DOM when link is broken
  removeOnError?: boolean;
}>();

const format = props.format ?? "webp";
const loading = props.loading ?? "eager";
const picture = props.picture ?? false;

const fallbackToUncompressed = (event: Event) => {
  if (!event.target) {
    return;
  }

  const target = event.target as HTMLImageElement;

  // User defined type guard
  if (!target.src) {
    return;
  }

  if (target.src != props.src) {
    target.src = props.src;
  } else if (props.removeOnError) {
    target.remove();
  }
};

const hover = ref(false);
const src = computed(() => {
  if (hover.value && props.hoverSrc) {
    return props.hoverSrc;
  }
  return props.src;
});
const imageRef = ref();
const translate = ref();
const scale = ref(1);
const handleMouseMove = (event: MouseEvent) => {
  if (props.zoom) {
    const bounds = imageRef.value.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    translate.value = `${x}% ${y}%`;
    scale.value = 3;
  }
};
const handleMouseLeave = () => {
  hover.value = false;
  if (props.zoom) {
    scale.value = 1;
    translate.value = `${0}px ${0}px`;
  }
};

const translateStyle = computed(() => {
  if (props.zoom) {
    return `transform: scale(${scale.value}); transform-origin: ${translate.value}; cursor: zoom-in;`;
  }
});
</script>

<template>
  <div @mouseover="hover = true" @mouseleave="handleMouseLeave">
    <nuxt-img
      v-if="config.public.optimizeImageLoad && !picture && !props.srcset"
      :src="src"
      :srcset="props.srcset"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      :class="props.class"
      :format="format"
      :loading="loading"
      @error="fallbackToUncompressed"
    />
    <picture v-else-if="config.public.optimizeImageLoad && picture && !props.srcset">
      <slot :translateStyle="translateStyle"></slot>
      <nuxt-img
        :src="src"
        :srcset="props.srcset"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
        :class="props.class"
        :format="format"
        :loading="loading"
        @error="fallbackToUncompressed"
      />
    </picture>
    <img
      v-else
      @mousemove="handleMouseMove"
      ref="imageRef"
      :src="src"
      :srcset="props.srcset"
      :alt="props.alt"
      :class="props.class"
      :width="props.width"
      :height="props.height"
      :loading="loading"
      :style="translateStyle"
    />
  </div>
</template>
