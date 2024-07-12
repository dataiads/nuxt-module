<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits
} from 'radix-vue'
import { cn } from '@/lib/utils'
import { type SwitchVariants, switchVariants } from '.'

const props = withDefaults(defineProps<SwitchRootProps & {
  class?: HTMLAttributes['class'],
  variant?: SwitchVariants['variant'],
  size?: SwitchVariants['size']
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false
})

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <div class="flex flex-col">
    <slot />
    <SwitchRoot
      v-bind="forwarded"
      :class="cn(switchVariants({ variant, size }), props.class)"
    >
      <SwitchThumb
        :class="cn('pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0')"
      />
    </SwitchRoot>
  </div>
</template>