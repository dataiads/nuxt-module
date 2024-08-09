<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Props {
  src: string;
  zoomFactor?: number;
  zoom: boolean;
  getZoomedSrc?: (src: string) => string;
  width?: string;
  height?: string;
  sizes?: string;
}

const props = withDefaults(defineProps<Props>(), {
  zoomFactor: 2,
  getZoomedSrc: (src: string) => src, // Default to returning the same src
  width: '500',
  height: '500',
  sizes: '50vw lg:700px'
})

const containerRef = ref<HTMLDivElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const isZoomed = ref(false)
const currentSrc = ref(props.src)

const imageStyle = reactive({
  transition: 'transform 0.3s ease-out',
  transformOrigin: '50% 50%',
  transform: 'scale(1)'
})

const cursorStyle = computed(() => {
  if (!props.zoom) return 'cursor-default'
  return isZoomed.value ? 'cursor-zoom-out' : 'cursor-zoom-in'
})

const handleClick = (event: MouseEvent) => {
  if (!props.zoom || !containerRef.value || !imageRef.value) return
  
  if (!isZoomed.value) {
    zoomIn(event)
    currentSrc.value = props.getZoomedSrc(props.src)
  } else {
    zoomOut()
    currentSrc.value = props.src
  }
  
  isZoomed.value = !isZoomed.value
}

const zoomIn = (event: MouseEvent) => {
  const rect = containerRef.value!.getBoundingClientRect()
  
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  
  imageStyle.transform = `scale(${props.zoomFactor})`
  imageStyle.transformOrigin = `${x * 100}% ${y * 100}%`
}

const zoomOut = () => {
  imageStyle.transform = 'scale(1)'
  imageStyle.transformOrigin = '50% 50%'
}

const handleMouseMove = (event: MouseEvent) => {
  if (!props.zoom || !isZoomed.value || !containerRef.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  
  imageStyle.transformOrigin = `${x * 100}% ${y * 100}%`
}

const { optimize, provider } = useProductImage()
</script>

<template>
  <div 
    ref="containerRef"
    :class="[cursorStyle]"
    @click="handleClick"
    @mousemove="handleMouseMove"
  >
    <NuxtImg
      v-if="optimize" 
      ref="imageRef"
      :provider="provider"
      :sizes="sizes"
      :style="imageStyle"
      :width="width"
      :height="height"
      :src="currentSrc"
      loading="lazy"
    />
    <img
      v-else
      ref="imageRef" 
      :src="currentSrc" 
      :style="imageStyle"
    >
  </div>
</template>