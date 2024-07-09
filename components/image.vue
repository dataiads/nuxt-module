<script setup lang="ts">
const config = useRuntimeConfig()

const props = defineProps<{
  src: string;
  hoverSrc?: string;
  width: string;
  height: string;
  class?: string;
  loading?: 'eager' | 'lazy';
  format?: string;
  alt?: string;
  srcset?: string;
  hoverSrcset?: string;
  sizes?: string;
  picture?: boolean;
  zoom?: boolean;
  provider?: string;
  // optional: remove elements from the DOM when link is broken
  removeOnError?: boolean;
}>()

const format = props.format ?? 'avif,webp'
const loading = props.loading ?? 'eager'
const picture = props.picture ?? false

const fallbackToUncompressed = (event: Event) => {
  if (!event.target) {
    return
  }

  const target = event.target as HTMLImageElement

  // User defined type guard
  if (!target.src) {
    return
  }

  if (target.src != props.src) {
    target.src = props.src
  } else if (props.removeOnError) {
    target.remove()
  }
}

const hover = ref(false)
const src = computed(() => {
  if (hover.value && props.hoverSrc) {
    return props.hoverSrc
  }
  return props.src
})
const srcset = computed(() => {
  if (hover.value && props.hoverSrcset) {
    return props.hoverSrcset
  }
  return props.srcset
})

const imageRef = ref()
const translate = ref()
const scale = ref(1)
const handleMouseMove = (event: MouseEvent) => {
  if (props.zoom) {
    const bounds = imageRef.value.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    translate.value = `${x}% ${y}%`
    scale.value = 3
  }
}
const handleMouseLeave = () => {
  hover.value = false
  if (props.zoom) {
    scale.value = 1
    translate.value = `${0}px ${0}px`
  }
}

const translateStyle = computed(() => {
  if (props.zoom) {
    return `transform: scale(${scale.value}); transform-origin: ${translate.value}; cursor: zoom-in;`
  }
})
</script>

<template>
  <div @mouseover="hover = true" @mouseleave="handleMouseLeave">
    <NuxtPicture
      v-if="config.public.optimizeImageLoad && !picture && !props.srcset"
      :src="src"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      :class="props.class"
      :format="format"
      :loading="loading"
      :sizes="sizes"
      :provider="provider"
      :style="translateStyle"
      @error="fallbackToUncompressed"
    />
    <picture v-else-if="config.public.optimizeImageLoad && picture && !props.srcset">
      <slot :translate-style="translateStyle" />
      <NuxtPicture
        :src="src"
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
      ref="imageRef"
      :src="src"
      :srcset="srcset"
      :sizes="props.sizes"
      :alt="props.alt"
      :class="props.class"
      :width="props.width"
      :height="props.height"
      :loading="loading"
      :style="translateStyle"
      @mousemove="handleMouseMove"
    >
  </div>
</template>
