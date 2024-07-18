<script setup lang="ts">
type DataClass = {
  class: string;
  desc?: string;
}
const props = defineProps<{data: DataClass[]}>()

</script>

<template>
  <div class="max-h-[25rem] overflow-y-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-3/12">
            Class Name
          </TableHead>
          <TableHead class="w-8/12">
            Description
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in data" :key="item.class">
          <TableCell class="font-mono">
            {{ item.class }}
          </TableCell>
          <TableCell>{{ item.desc }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>