<script setup lang="ts">
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'radix-vue'
import { GripVertical } from 'lucide-vue-next'
import { codeToHtml } from 'shiki'

const props = withDefaults(defineProps<{
  name: string;
  responsive?: boolean;
}>(), {
  responsive: true
})

const rawString = ref('')
const codeHtml = ref('')
onMounted(async () => {
  rawString.value = await import(
    `./Docs/${props.name}.vue?raw`
  ).then((res) => res.default.trim())
  codeHtml.value = await codeToHtml(rawString.value!, {
    lang: 'vue',
    theme: 'material-theme-palenight'
  })
})

const size = ref('100')
const splitterPanel = ref()
watch(size, () => {
  splitterPanel.value?.resize(Number(size.value))
})

</script>

<template>
  <div class="not-docs group relative my-4 flex flex-col space-y-2">
    <Tabs default-value="preview">
      <div class="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            Code
          </TabsTrigger>
        </TabsList>
        <ResponsiveToggle v-if="responsive" v-model="size" />
      </div>

      <TabsContent value="preview" class="relative rounded-md border">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            ref="splitterPanel"
            :default-size="100"
            :min-size="30"
            class="bg-white rounded-xl flex items-center justify-center"
          >
            <div
              class="preview flex min-h-[350px] w-full justify-center p-4 items-center"
            >
              <iframe v-if="responsive" height="400px" class="w-full bg-background" :src="`/render/${props.name}?lpoid=random`" />
              <component :is="props.name" v-else />
            </div>
          </ResizablePanel>
          <ResizableHandle v-if="responsive" with-handle />
          <ResizablePanel class="bg-muted">
            <div />
          </ResizablePanel>
        </ResizablePanelGroup>
        <!-- 
          <SplitterGroup id="splitter-group-1" direction="horizontal">
            <SplitterPanel
              id="splitter-group-1-panel-1"
              ref="splitterPanel"
              :default-size="100"
              :min-size="30"
              class="bg-white rounded-xl flex items-center justify-center"
            />
            <SplitterResizeHandle v-if="responsive" id="splitter-group-1-resize-handle-1" class="relative right-[-24px] flex flex-col justify-center">
              <GripVertical />
            </SplitterResizeHandle>
            <SplitterPanel id="splitter-group-1-panel-2" class="bg-muted" :default-size="3" :min-size="3">
              <div />
            </SplitterPanel>
          </SplitterGroup>
         -->
      </TabsContent>
      <TabsContent value="code" class="relative">
        <BlockCopyButton class="absolute top-4 right-8" :code="rawString" />
        <div
          v-if="codeHtml"
          class="language-vue [&_pre]:rounded-md [&>pre]:p-4 font-mono text-sm [&_pre]:max-h-[350px] [&_pre]:my-0 [&_pre]:overflow-auto"
          style="flex: 1"
          v-html="codeHtml"
        />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style lang="scss">
pre code .line {
  display: inline !important;
}
</style>