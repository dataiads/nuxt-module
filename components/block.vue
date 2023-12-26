
<script setup lang="ts">
/*
 * Render scrapped "block" elements
 */
import type {BlockConfig} from "~/types"

const props = defineProps<{
    config?: BlockConfig;
    isolateStyle?: boolean;
}>();

const shadowHost = ref<HTMLElement>()

if (props.config) {
    onMounted(() => {
        if (shadowHost.value && props.config) {
            const shadowRoot = shadowHost.value.attachShadow( { mode: 'open'} )

            const styleEl = document.createElement('style');
            if (props.isolateStyle) {
                styleEl.innerHTML = ':host { all: initial };';
            }
            styleEl.innerHTML += props.config.style;
            shadowRoot.appendChild(styleEl);

            const contentEl = document.createElement("div");
            contentEl.innerHTML = props.config.html;
            shadowRoot.appendChild(contentEl);

        }
    });
}
</script>

<template>
    <div ref="shadowHost"></div>
</template>