<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean,
}>()

const dynamicLpoConfig = useDynamicLpoConfig()
const mainProductConfig = computed(() => dynamicLpoConfig.value.customLayout?.mainProduct)
const { images } = useProductImage()

const scrollToMainReco = () => {
  const mainReco = document.getElementById('catalog-grid')
  if (mainReco) mainReco.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <CarouselItem v-if="mainProductConfig && mainProductConfig.seeMoreEnable">
    <img :src="images[0]" class="blur-lg">
    <div class="flex flex-col absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-1/2">
      <span :style="mainProductConfig.seeMoreTitleStyle">
        {{ mainProductConfig.seeMoreTitle }}
      </span>
      <Button :variant="mainProductConfig.seeMoreBtnVariant" @click="scrollToMainReco">
        {{ mainProductConfig.seeMoreBtnTitle }}
      </Button>
    </div>
  </CarouselItem>
</template>