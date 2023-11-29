

<script setup lang="ts">
import { BannerElement, BannerParams } from '~/types';
import Elements from '../filters/elements.vue';

const props = defineProps<{
    config: BannerParams;
}>();

const listClass = computed(() => ({
    background: props.config.background,
}))

const messageClass = (element: BannerElement) => ({
    background: element.background,
    color: element.color,
    paddingTop: element.yPadding,
    paddingBottom: element.yPadding,
    fontSize: element.fontSize,
})
</script>

<template>
    <ul class="flex flex-col flex-nowrap snap-y scrollbar-hide list-none items-justify" :class="listClass">
        <template v-for="element in config.elements">
            <li v-if="element.type === 'html'" v-html="element.html" class="snap-center"></li>

            <li v-else-if="element.type === 'message'" class="snap-center flex flex-row justify-center items-center" :class="messageClass(element)">
                <a :href="element.link" v-if="element.link">
                    <span>{{ element.text }}</span>
                </a>
                <span v-else>{{ element.text }}</span>
            </li>
        </template>
    </ul>
</template>