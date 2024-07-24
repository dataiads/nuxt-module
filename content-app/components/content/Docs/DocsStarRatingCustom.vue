<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const product = useProduct()

const reviewValue = getCustomAttr(product.value, 'rating-value')
const reviewCount = getCustomAttr(product.value, 'rating-count')
const style = 'flex gap-1 '

</script>

<template>
  <StarsRating :class="style" :value="reviewValue" :count="reviewCount" :max-value="4">
    <template #star-full>
      <Star color="#FF0000" fill="#FF0000" :size="20" />
    </template>
    
    <template #star-empty>
      <Star color="#FF0000" fill="none" :size="20" />
    </template>

    <template #count="{ count, value }">
      <div class="flex gap-1 ml-2 text-base font-bold ">
        <div>{{ count }} avis</div>
      </div>
    </template>
  </StarsRating>
</template>