<script setup lang="ts">
defineProps<{
  images: string[];
  selectedIndex: number;
  iconNext?: string;
  iconPrevious?: string;
}>()

defineEmits(['previous', 'next'])
</script>

<template>
  <div class="absolute left-0 top-[50%] m-2 z-100">
    <button
      class="w-[28px] h-[46px] bg-white/20 hover:bg-white/60 hover:cursor-pointer"
      @click="$emit('previous')"
    >
      <slot name="previous">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </slot>
    </button>
  </div>
  <div class="absolute right-0 top-[50%] m-2">
    <button
      class="w-[28px] h-[46px] flex justify-center bg-white/20 hover:bg-white/60 hover:cursor-pointer"
      @click="$emit('next')"
    >
      <slot name="next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m8.25 4.5l7.5 7.5l-7.5 7.5"
          />
        </svg>
      </slot>
    </button>
  </div>
  <div class="h-screen flex items-center justify-center">
    <slot name="image" :image="images[selectedIndex]">
      <Image
        class="object-contain h-screen w-auto"
        height="800"
        width="800"
        format="webp"
        :src="images[selectedIndex]"
      />
    </slot>
  </div>
</template>
