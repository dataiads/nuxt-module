// Replace vue3 with vue if you are using Storybook for Vue 2
import type {Meta, StoryObj} from '@storybook/vue3';

import ProductImage from '../components/product-image.vue';
import Image from "~/components/image.vue";

const template =
`<ProductImage :product="product" :key="product.id" :max-additional-images="4" class="flex flex-row"
            aside-class="hidden"
            main-class="flex flex-row flex-nowrap overflow-x-scroll snap-x snap-mandatory scrollbar-hide md:overflow-hidden"
            default-modal>

            <template #main-image="{ src, alt }">
              <div class="relative">
                <Image class="w-full h-auto" :src="src" :alt="alt" zoom />
                  <a href="#filters-content-header" class="absolute bottom-0 right-0 bg-white/40 p-1 text-[#646464] flex items-center"
                    @click.stop="">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8 22.2001H4.11417C3.5004 22.2001 2.91177 21.9562 2.47777 21.5222C2.04377 21.0882 1.79995 20.4996 1.79995 19.8858V16H0V19.8858C0 20.977 0.433456 22.0234 1.20501 22.795C1.97657 23.5665 3.02302 24 4.11417 24H8V22.2001ZM16 22.2001V24H19.8858C20.977 24 22.0234 23.5665 22.795 22.795C23.5665 22.0234 24 20.977 24 19.8858V16H22.2001V19.8858C22.2001 20.4996 21.9562 21.0882 21.5222 21.5222C21.0882 21.9562 20.4996 22.2001 19.8858 22.2001H16ZM22.2001 8H24V4.11417C24 3.02302 23.5665 1.97657 22.795 1.20501C22.0234 0.433456 20.977 0 19.8858 0H16V1.79995H19.8858C20.4996 1.79995 21.0882 2.04377 21.5222 2.47777C21.9562 2.91177 22.2001 3.5004 22.2001 4.11417V8ZM1.79995 8V4.11417C1.79995 3.5004 2.04377 2.91177 2.47777 2.47777C2.91177 2.04377 3.5004 1.79995 4.11417 1.79995H8V0H4.11417C3.02302 0 1.97657 0.433456 1.20501 1.20501C0.433456 1.97657 0 3.02302 0 4.11417V8H1.79995Z"
                        fill="#646464" />
                      <path
                        d="M17.5388 11.5386L16.5627 10.4811L12.6927 14.6661V5.53857H11.3081V14.6661L7.44499 10.4736L6.46191 11.5386L12.0004 17.5386L17.5388 11.5386Z"
                        fill="#646464" />
                    </svg>
                    <!-- TODO : To change -->
                    <span class="ml-3 text-xs md:text-base">VOIR DES PRODUITS SIMILAIRE</span>
                  </a>
              </div>
            </template>

            <template #previous-btn>
               <div class="w-8 h-8 bg-white rounded-full ml-2 text-black flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
            </template>

            <template #next-btn>
                <div class="w-8 h-8 bg-white rounded-full mr-2 text-black flex items-center justify-center">
                  <svg class="rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
            </template>

            <template #navigation="{ allImages, selectedIndex, clickIndex }">
                <div class="absolute bottom-2 left-2 md:bottom-4 md:left-4 flex flex-row gap-1">
                    <button
                        v-for="(_, index) in allImages"
                        @click="clickIndex(index)"
                        class="w-2 h-2 rounded-full hover:scale-125 transition-all border border-black"
                        :class="index === selectedIndex ? 'bg-black' : 'bg-transparent'"
                    ></button>
                </div>
              </template>
</ProductImage>
`
const meta: Meta<typeof ProductImage> = {
  component: ProductImage,
  decorators: [() => ({ template: '<div style="max-width: 500px;"><story/></div>' })],
  title: 'MainProduct/ProductImage',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        code: template
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ProductImage>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const NoAsideImg: Story = {
  render: (args, { argTypes }) => ({
    components: {ProductImage, Image},
    props: Object.keys(argTypes),
    setup() {
      return args
    },
    template
  }),
};
