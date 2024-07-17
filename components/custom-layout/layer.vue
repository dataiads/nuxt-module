<script setup lang="ts">
import type { LayerParams } from '~/types'

const props = defineProps<{
    config: LayerParams,
}>()

const config = computed(() => props.config)

</script>

<template>
    <LayerWrapper :config="config" :style="config.style">
        <Sheet>
            <SheetTrigger as-child>
                <div class="fixed bottom-0 left-0 z-[10] w-full bg-white">
                    <Button variant="ghost" class="hover:bg-transparent">
                        <DynamicLabel :value="config.title" />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent :side="config.position" :backdrop-style="config.backdropStyle">
                <SheetHeader v-if="config.title">
                    <SheetTitle>
                        <DynamicLabel :value="config.title" />
                    </SheetTitle>
                </SheetHeader>
                <Carousel class="relative w-full" :opts="{
                    align: 'start',
                    loop: true,
                    slidesToScroll: 'auto',
                }">
                    <CarouselPrevious class="left-4 z-[20] mt-5" />
                    <CarouselNext class="right-4 z-[20] mt-5" />
                    <CarouselContent>
                        <LayerItems v-slot="{ item }">
                            <slot name="reco-slider-item" :item="item" />
                        </LayerItems>
                    </CarouselContent>
                </Carousel>
            </SheetContent>
        </Sheet>
    </LayerWrapper>
</template>
