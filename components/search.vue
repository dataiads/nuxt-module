
<script setup lang="ts">

interface Props {
    value: string,
    redirectUrl: string,
    redirectSearchParam?: string,
}


const props = withDefaults(defineProps<Props>(), {
    redirectSearchParam: "q",
})

// parse url at load time to make sure its valid
new URL(props.redirectUrl)

// on submit, redirect to mirrored domain search url
const submit = () => {
    if (props.value) {
        let url = new URL(props.redirectUrl)
        url.searchParams.set(props.redirectSearchParam, props.value)
        window.location.href = url.toString()
    }
}

</script>

<template>
    <form @submit="submit">
        <slot></slot>
    </form>
</template>