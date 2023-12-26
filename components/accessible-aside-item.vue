
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

interface Props {
  class?: String,
  headerClass?: String,
  contentClass?: String,
  display?: boolean,
  label?: string;
}

const props = withDefaults(defineProps<Props>(), { display: true })
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    :aria-label="label"
    :default-open="display"
    as="fieldset"
    class="h-full md:h-auto flex-none"
    :class="props.class"
  >
    <DisclosureButton :class="props.headerClass">
      <slot name="header" :displayed="open" />
    </DisclosureButton>
    <DisclosurePanel as="div" class="w-full" :class="props.contentClass">
      <slot name="content" />
    </DisclosurePanel>
  </Disclosure>
</template>