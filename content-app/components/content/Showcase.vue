<script setup lang="ts">
import { codeToHtml } from 'shiki'
const props = defineProps<{
  name: string;
}>()
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
</script>

<template>
  <div class="not-docs group relative my-4 flex flex-col space-y-2">
    <Tabs default-value="preview">
      <TabsList>
        <TabsTrigger value="preview">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" class="relative rounded-md border">
        <div
          class="preview flex min-h-[350px] w-full justify-center p-10 items-center"
        >
          <component :is="props.name" />
        </div>
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