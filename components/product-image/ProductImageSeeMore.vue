<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean,
}>()

const dynamicLpoConfig = useDynamicLpoConfig()
const mainProductConfig = computed(() => dynamicLpoConfig.value.customLayout?.mainProduct)
const { images, dialog } = useProductImage()

const scrollToMainReco = async () => {
  if (dialog.value) dialog.value = false
  await nextTick()
  const mainReco = document.getElementById('catalog-grid')
  if (mainReco) mainReco.scrollIntoView({ behavior: 'smooth' })
}
</script>


<template>
  <CarouselItem v-if="mainProductConfig && mainProductConfig.seeMoreEnable && mainProductConfig.seeMoreBtnTitle">
    <img :src="images[0]" class="opacity-50" :class="{ 'w-full max-h-[calc(100vh-48px)] object-contain': dialog }">
    <div class="flex flex-col absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-1/2 max-w-full overflow-hidden px-14">
      <span :style="mainProductConfig.seeMoreTitleStyle">
        {{ mainProductConfig.seeMoreTitle }}
      </span>
      <Button :variant="mainProductConfig.seeMoreBtnVariant" class="line-clamp-1" @click="scrollToMainReco">
        {{ mainProductConfig.seeMoreBtnTitle }}
      </Button>
    </div>
  </CarouselItem>
</template>