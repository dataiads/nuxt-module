<script setup lang="ts">
import { Circle } from 'lucide-vue-next'
import { useMagicKeys } from '@vueuse/core'
const props = defineProps<{
  modelValue?: boolean;
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean];
}>()

const localVModel = useVModel(props, 'modelValue', emits, { passive: true })

const { navigation } = useContent()
const router = useRouter()
const goToLink = (path: string) => {
  router.push(path)
}

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired (e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  }
})

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1])
    localVModel.value = true
})

</script>

<template>
  <CommandDialog v-model:open="localVModel">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup :heading="navigation[0].title">
        <CommandItem v-for="(item, i) in navigation[0].children" :value="item.title" class="py-3" @select="goToLink(item._path)">
          <Circle class="mr-2 h-4 w-4" />
          <span>
            {{ item.title }}
          </span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>