<script setup lang="ts">
const { images, setIndex, index } = useProductImage()
</script>

<template>
    <div class="absolute bottom-4 left-4 flex gap-2 dots-container">
        <button v-for="(_, i) in images" :key="'dot_' + index"
            class="basis-full w-2 h-2 rounded-full cursor-pointer dots-btn" :class="{
                'dots-btn': index !== i,
                'dots-btn-current': index === i,
            }" @click.prevent="setIndex(i)" />
    </div>
</template>

<style lang="scss">


.dots-btn {
    @apply bg-secondary;
}

.dots-btn-current {
    @apply bg-primary;
}

</style>