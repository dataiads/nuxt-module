<script setup lang="ts">
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'radix-vue'

</script>

<template>
  <div class="w-full h-64 text-green9 font-medium text-sm">
    <SplitterGroup id="splitter-group-1" direction="horizontal">
      <SplitterPanel id="splitter-group-1-panel-1" :default-size="100" :min-size="30" class="bg-white rounded-xl flex items-center justify-center">
        <slot />
      </SplitterPanel>
      <SplitterResizeHandle id="splitter-group-1-resize-handle-1" class="w-2" />
      <SplitterPanel id="splitter-group-1-panel-2" class="bg-muted" :min-size="0">
        <div />
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>