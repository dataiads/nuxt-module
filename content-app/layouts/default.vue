<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <div>
    <Button @click="open = !open">
      Open
    </Button>
    <CommandSearch v-model="open" />
  </div>
  <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
    <div>
      <nav>
        <ContentNavigation v-slot="{ navigation }">
          <DocsNavLink class="flex flex-col gap-4" :links="navigation" />
        </ContentNavigation>
      </nav>
    </div>
    <div class="xl:grid xl:grid-cols-[1fr,250px] xl:gap-5">
      <slot />
    </div>
  </div>
</template>