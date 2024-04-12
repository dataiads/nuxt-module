<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>()
</script>

<template>
  <div class="w-full [&>form]:w-full">
    <Search :redirect-url="$t('redirectSearchUrl')" :redirect-search-param="$t('redirectSearchParam')" :lpo-search-reccomendations="false">
      <template
        #default="{ value, input, loading }"
      >
        <slot 
          :value="value"
          :input="input"
          :loading="loading"
        >
          <input
            :placeholder="$t('searchPlaceholder')"
            :value="value"
            :class="class"
            @input="input"
          >
        </slot>
      </template>
    </Search>
  </div>
</template>