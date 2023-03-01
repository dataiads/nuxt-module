<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();

const openDrawer = toRef(props, "open");
console.log(openDrawer.value, "TATATATATA")
</script>

<template>
  <nav
  class="bg-grey1 py-3 self-start sticky top-0 z-50 max-w-screen overflow-x-scroll scrollbar-hide shadow-lg md:hidden">
  <!-- <div class="container flex flex-wrap px-3 py-2 gap-4">
      <div class="flex grow"><button
          class="w-full bg-white p-2 rounded-xs focus:ring-1 hover:border-secondary focus:border-black focus:ring-black"
          @click="openDrawer = !openDrawer">
              <div class="flex flex-row gap-2 space-between p-1">FILTRER<img
                    src="~/assets/icons/generics/icon-filter-black.svg" width="15" height="17" loading="lazy" alt="" /></div>
              </button></div>
            <div class="flex grow"><select
                class="w-full border-0 rounded-xs bg-white focus:ring-1 hover:border-secondary focus:border-black focus:ring-black ring-inset"
                v-model="filter.sort.value">
                <option value="" selected="selected">Trier par</option>
                <option v-for="option in config.public.filter.sortOptions" :value="option.value">{{ option.label }}</option>
              </select></div>
          </div> -->
    <transition name="slide">
      <section
        class="text-black fixed bottom-0 right-0 left-unset bg-[#f7f7f5] h-[100%] w-[80%] max-w-[48rem] overflow-hidden z-[1001]"
        v-if="openDrawer">
        <div class="drop-shadow-md bg-grey1 flex items-center justify-between px-2 py-1">
          <div class="flex flex-row gap-2">Filtres<img src="~/assets/icons/generics/icon-filter-black.svg" width="12"
              height="15" loading="lazy" alt="" /></div><button class="m-1" @click="openDrawer = false">Fermer X</button>
        </div>
        <slot name="drawerContent"></slot>
      </section>
    </transition>
    <transition name="fade">
      <section
        class="bg-black opacity-50 overscroll-none fixed bottom-0 left-0 right-unset h-[100%] w-[20%] max-w-[48rem] overflow-auto z-[1001]"
        v-if="openDrawer" @click="openDrawer = false">
      </section>
    </transition>
  </nav>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>