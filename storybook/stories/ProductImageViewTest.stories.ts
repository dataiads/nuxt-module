// Replace vue3 with vue if you are using Storybook for Vue 2
import type {Meta, StoryObj} from '@storybook/vue3';

import Button from '../components/product-image.vue';
import PriceDisplay from '../components/price-display.vue';
import Image from "~/components/image.vue";

const template =
    `
                <Button
              :product="product"
              :key="product.id"
              :max-additional-images="maxAdditionalImages"
              default-modal
              class="product-image flex flex-col-reverse md:flex-row md:mx-auto lg:mx-0"
              aside-class="aside-image hidden lg:grid grid-rows-3 mr-4 gap-4 flex-col min-w-[130px] max-w-[130px]"
            >
              <template #aside-image="{ src, alt, active }">
                <Image
                  class="h-full w-full border-2 border-transparent md:ml-4 lg:ml-0 object-cover object-top"
                  :class="{ 'border-2 !border-secondary': active }"
                  :src="src"
                  :alt="alt"
                />
              </template>
              <template #main-image="{ src }">
                <div class="relative">
                  <Image
                    :src="src"
                    class="lg:max-h-max md:max-h-[380px] w-full lg:h-full lg:w-full object-contain md:w-fit md:mx-auto"
                  >
                  </Image>
                </div>
              </template>

              <template #previous-btn>
                <div
                  class="hidden w-8 h-8 bg-secondary rounded-full ml-2 text-white md:hidden flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </template>

              <template #next-btn>
                <div
                  class="hidden w-8 h-8 bg-secondary rounded-full mr-2 text-white md:hidden flex items-center justify-center"
                >
                  <svg
                    class="rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </template>
            </Button>`
const meta: Meta<typeof Button> = {
    component: Button,
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
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    maxAdditionnalImages: 2
  },
  render: (args) => ({
      components: {Button, Image, PriceDisplay},
      setup() {
          return args
      },
      template
  }),
};
