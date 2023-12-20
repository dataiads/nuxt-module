<script setup lang="ts">
const redirecting = useState<boolean>("redirect.redirecting", () => false);
const message = useState<string>("redirect.message", () => "");
</script>

<template>
<transition
    enter-active-class="duration-1000 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-500 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div v-if="redirecting" class="fixed inset-0 w-screen h-screen z-50">
        <slot name="overlay">
            <div class="h-full w-full bg-grey1 bg-opacity-80 flex flex-col items-center justify-center">
                <slot name="loader">
                    <div class="mx-auto animate-spin ease-linear rounded-full border-4 border-t-4 border-t-primary border-gray-200 h-12 w-12 mb-4"></div>
                </slot>
                <slot name="message">
                    <h2 v-if="message" class="text-center text-xl font-semibold">{{ message }}</h2>
                </slot>
            </div>
        </slot>
    </div>
</transition>
</template>