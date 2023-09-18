<script setup lang="ts">
import { Dialog } from "@headlessui/vue";

const props = defineProps<{
    element: DrawerLayoutElement
    context: CustomLayoutContext
}>()

const open = useState<boolean>(`${props.element.params?.name}.open`, () => false);
</script>

<template>
  <Dialog :open="open" @close="open = false">
    <div :class="element.params.outsideClass" class="fixed inset-0 z-50 bg-black/30 cursor-pointer" aria-hidden="true" @click="open = false" />
    <nav v-show="open" class="bg-white self-start overflow-x-scroll fixed h-full w-[80%] top-0 right-0 z-[51]" :class="element.class">
      <!-- Allow inside of the drawer to be filled using slot. -->
      <slot :name="element.params.name" :context="context">
        <!-- Or, if nothing in slot, allow inside of the drawer to be filled using children elements. -->
        <CustomLayoutNode v-for="(child, index) of element.children" :key="index" :element="child" :context="context">
          <template v-for="(_, name) of $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps ?? {}" :context="context"></slot>
          </template>
        </CustomLayoutNode>
      </slot>
    </nav>
  </Dialog>
</template>
