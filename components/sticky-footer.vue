
<script setup lang="ts">
interface Props {
  class?: string[]
  yThreshold?: number
  delay?: number
  displayOnScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: () => [],
  delay: 100,
  yThreshold: 100,
  displayOnScroll: false
})


let displayTimer: ReturnType<typeof setTimeout>|null = null
let hideTimer: ReturnType<typeof setTimeout>|null = null

const display = useState('addToCart.display', () => !props.displayOnScroll)

onMounted(() => {
  if (props.displayOnScroll) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= props.yThreshold) {
        if (hideTimer) {
          clearTimeout(hideTimer)
          hideTimer = null
        }
        if (!displayTimer) {
          displayTimer = setTimeout(() => (display.value = true), props.delay)
        }
      } else {
        if (displayTimer) {
          clearTimeout(displayTimer)
          displayTimer = null
        }
        if (!hideTimer) {
          hideTimer = setTimeout(() => (display.value = false), props.delay)
        }
      }
    })
  }
})

const class_ = computed(() => [
  { 'translate-y-full': !display.value },
  { 'opacity-0': !display.value },
  { 'pointer-events-none': !display.value },
  props.class
])

</script>

<template>
  <div class="sticky bottom-0 z-20 transition duration-700" :class="class_">
    <slot />
  </div>
</template>
