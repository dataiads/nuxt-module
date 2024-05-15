<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean];
}>()

const localVModel = useVModel(props, 'modelValue', emits, { passive: true })

const { navigation } = useContent()
</script>

<template>
  <CommandDialog v-model:open="localVModel">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">
          Calendar
        </CommandItem>
        <CommandItem value="search-emoji">
          Search Emoji
        </CommandItem>
        <CommandItem value="calculator">
          Calculator
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem value="profile">
          Profile
        </CommandItem>
        <CommandItem value="billing">
          Billing
        </CommandItem>
        <CommandItem value="settings">
          Settings
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>