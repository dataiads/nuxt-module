
<script setup lang="ts">

interface Props {
    // mirrored site search url
    redirectUrl: string,

    // mirrored site search value query param on search url
    redirectSearchParam?: string,
}

const props = withDefaults(defineProps<Props>(), {
    redirectSearchParam: "q",
})

const value = useState('search.value', () => "")

// parse url at load time to make sure its valid
new URL(props.redirectUrl)

// on submit, redirect to mirrored domain search url
const submit = () => {
    if (value.value) {
        let url = new URL(props.redirectUrl)
        url.searchParams.set(props.redirectSearchParam, value.value)
        window.location.href = url.toString()
    }
}

// inpout event handler for slot input
const input = (event: Event) => {
    value.value = (event.target as HTMLInputElement).value
}


</script>

<template>
    <form @submit.prevent="submit">
        <slot :value="value" :input="input">
            <input :value="value" @input="input" placeholder="search...">
        </slot>
    </form>
</template>