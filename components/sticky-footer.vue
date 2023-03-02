
<script setup lang="ts">
interface Props {
    class?: string[]
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
  });
})

const class_ = computed(()=> [
    {'translate-y-full': !display.value},
    {'opacity-0': !display.value},
    ...props.class,
])

</script>

<template>
    <div class="sticky bottom-0 z-20 transition duration-700" :class="class_">
        <slot></slot>
    </div>
</template>