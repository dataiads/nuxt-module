
<script setup lang="ts">

interface Props {
  class?: String,
  headerClass?: String,
  contentClass?: String,
  displayDesktop?: Boolean,
  displayMobile?: Boolean
}

const props = defineProps<Props>()

const displayDesktop = ref(props.displayDesktop ?? true)
const displayMobile = ref(props.displayMobile ?? false)

// global singleton to ensure only a single dropdown is open on mobile
const singleton = useState<(() => void) | null>('responsiveAsideItemSingleton', () => null)

const toggleDisplayDesktop = () => displayDesktop.value = !displayDesktop.value

const toggleDisplayMobile = () => {
  if (displayMobile.value) {
    singleton.value = null
    displayMobile.value = false
  } else {
    if (singleton.value != null) {
      singleton.value()
    }
    singleton.value = () => displayMobile.value = false
    displayMobile.value = true
  }
}
</script>

<template>
  <div class="h-full md:h-auto flex-none" :class="props.class">
    <!-- desktop -->
    <div class="hidden md:block" :class="props.headerClass" @click="toggleDisplayDesktop">
      <slot name="header" :displayed="displayDesktop" />
    </div>
    <div v-if="displayDesktop" class="hidden md:block w-full" :class="props.contentClass">
      <slot name="content" />
    </div>

    <!-- mobile -->
    <div class="block md:hidden" :class="props.headerClass" @click="toggleDisplayMobile">
      <slot name="header" :displayed="displayMobile" />
    </div>
    <div v-if="displayMobile" class="fixed inset-0 md:hidden" :class="props.contentClass">
      <slot name="content" :close="toggleDisplayMobile" />
    </div>
  </div>
</template>