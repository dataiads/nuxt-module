
<script setup lang="ts">
interface Props {
    class?: string | string[]
    delay?: number
    yThreshold?: number
}

const props = withDefaults(defineProps<Props>(), {
    class: () => [],
    delay: 100,
    yThreshold: 500,
})

const display = ref(false)

let displayTimer: ReturnType<typeof setTimeout>|null = null
let hideTimer: ReturnType<typeof setTimeout>|null = null

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > props.yThreshold) {
        console.log("show")
        if (hideTimer) {
            clearTimeout(hideTimer)
            hideTimer = null
        }
        if (!displayTimer) {
            displayTimer = setTimeout(() => (display.value = true), props.delay)
        }
    } else {
        console.log("clear")
        if (displayTimer) {
            clearTimeout(displayTimer)
            displayTimer = null
        }
        if (!hideTimer) {
            hideTimer = setTimeout(() => (display.value = false), props.delay)
        }
    }
  });
})
</script>

<template>
    <div class="fixed bottom-0 left-0 right-0" :class="props.class" v-if="display">
        <slot></slot>
    </div>
</template>