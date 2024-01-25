<script setup lang="ts">

interface Props {
    class : string
    containerClass : string
}

const props = withDefaults(defineProps<Props>(), {
    class: 'mx-auto animate-spin ease-linear rounded-full border-4 border-t-4 border-t-primary border-gray-200 h-12 w-12 mb-4',
    containerClass: ''
} )

</script>

<template>
  <div :class="props.containerClass">
    <div :class="props.class" />    
    </div>

</template>