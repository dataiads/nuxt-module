<script setup lang="ts">
const config = useRuntimeConfig()
const props = defineProps<{
	src: string,
	width: string,
	height: string,
	loading?: string,
	format?: string,
	alt?: string,
	picture?: boolean,
	// optional: remove elements from the DOM when link is broken
	removeOnError?: boolean,
}>()

const format = props.format ?? "webp"
const loading = props.loading ?? "eager"
const picture = props.picture ?? false;

const fallbackToUncompressed = (event: Event) => {
	if (event.target.src != props.src) {
		event.target.src = props.src
	} else if (props.removeOnError) {
		event.target.remove()
	}
}

</script>

<template>
	<nuxt-img v-if="config.public.optimizeImageLoad && !picture" :src="props.src" :alt="props.alt"
		@error="fallbackToUncompressed" :width="props.width" :height="props.height" :format="format"
		:loading="loading" />
	<picture v-else-if="config.public.optimizeImageLoad && picture">
		<slot></slot>
		<nuxt-img :src="props.src" :alt="props.alt" @error="fallbackToUncompressed" :width="props.width"
			:height="props.height" :format="format" :loading="loading" />
	</picture>
	<img v-else :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" :loading="loading">
</template>