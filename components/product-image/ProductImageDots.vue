<script setup lang="ts">
const { images, setIndex, index } = useProductImage()
</script>

<template>
    <div class="absolute bottom-4 left-4 flex gap-2 dots-container">
        <button v-for="(_, i) in images" :key="'dot_' + index"
            class="basis-full w-2 h-2 rounded-full cursor-pointer dots-btn" :class="{
                'bg-[#E9E5E5]': index !== i,
                'bg-[#565353] hover:[#565353]': index === i,
            }" @click.prevent="setIndex(i)" />
    </div>
</template>

<style lang="scss"></style>