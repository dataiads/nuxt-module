<script setup lang="ts">
// @ts-ignore
import { useRuntimeConfig } from "#app"

const config = useRuntimeConfig()
/*
<template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
  <slot :name="name" v-bind="data"></slot>
</template>
*/
const layoutComponent = resolveComponent(`variations-${config.public.variation}`)
console.log("FU", layoutComponent)
console.log("FAILSOLVE", resolveComponent(`wall-du-trucWoulai`))
console.log(this)
</script>

<template>
<div>
    <h1>LAYOUT</h1>
    <component is="RecoProduct"></component>
    <component :is="layoutComponent">
        <!--
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
        </template>
        -->
    </component>
    <h1>LAYOUT OVER</h1>
</div>
</template>