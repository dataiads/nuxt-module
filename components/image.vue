<script setup lang="ts">
const config = useRuntimeConfig()

interface Props {
	src: string,
	width: string,
	height: string,
	loading?: string,
	format?: string,
	alt?: string,
	picture?: boolean
	zoomable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	format: "webp",	
	loading: "eager",
	picture: false,
	zoomable: false,
})

const fallbackToUncompressed = (event: Event) => {
	const target = event.target as HTMLImageElement
	if (target.src != props.src) {
		target.src = props.src
	}
}

</script>

<template>
	<nuxt-img v-if="config.public.optimizeImageLoad && !props.picture" :src="props.src" :alt="props.alt"
		@error="fallbackToUncompressed" :width="props.width" :height="props.height" :format="props.format"
		:loading="loading" />
	<picture v-else-if="config.public.optimizeImageLoad && props.picture">
		<slot></slot>
		<nuxt-img :src="props.src" :alt="props.alt" @error="fallbackToUncompressed" :width="props.width"
			:height="props.height" :format="props.format" :loading="props.loading" />
	</picture>
	<img v-else :src="props.src" :alt="props.alt" :width="props.width" :height="props.height" :loading="props.loading">
</template>