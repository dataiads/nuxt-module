
<script setup lang="ts">
import { CrossSellParams } from '~/types';

defineProps<{
    config: CrossSellParams;
}>();
</script>

<template>
<!--
Pouvoir switcher entre:
- comportement legacy via slot existant
- rendu configurable par config (images vs tags, choix couleurs)
-->
</template>