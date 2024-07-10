<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean,
}>()

const { seeMoreEnable, seeMoreTitle, seeMoreBtnTitle, seeMoreBtnVariant } = useLpoConfig().customLayout.mainProduct
const { images } = useProductImage()

const scrollToMainReco = () => {
  const mainReco = document.getElementById('catalog-grid')
  if (mainReco) mainReco.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <CarouselItem v-if="seeMoreEnable">
    <img :src="images[0]" class="blur-lg">
    <div class="flex flex-col absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-1/2">
      <span>
        {{ seeMoreTitle }}
      </span>
      <Button :variant="seeMoreBtnVariant" @click="scrollToMainReco">
        {{ seeMoreBtnTitle }}
      </Button>
    </div>
  </CarouselItem>
</template>