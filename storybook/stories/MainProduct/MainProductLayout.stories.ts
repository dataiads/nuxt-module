import type {Meta, StoryObj} from '@storybook/vue3';
const template =
`<div class="xl:container xl:mx-auto lg:flex mx-4 mt-4 lg:gap-8">
  <div class="lg:w-1/2 xl:w-5/12">
  <div class="h-40 border border-dashed border-gray-500 p-4">
    PLACEHOLDER
  </div>
  </div>
  <div class="lg:flex lg:flex-col lg:w-1/2 xl:w-7/12 mt-4 lg:mt-0">
    <div class="h-40 border border-dashed border-gray-500 p-4">
    PLACEHOLDER PRODUCT ATTRIBUTES
  </div>
  </div>
</div>`

const templateBigDescription =
`<div class="xl:container xl:mx-auto lg:flex mx-4 mt-4 lg:gap-8">
  <div class="lg:w-1/2 xl:w-4/12">
  <div class="h-40 border border-dashed border-gray-500 p-4">
    PLACEHOLDER SMALL PRODUCT IMAGE
  </div>
  </div>
  <div class="lg:flex lg:flex-col lg:w-1/2 xl:w-8/12 mt-4 lg:mt-0">
    <div class="h-40 border border-dashed border-gray-500 p-4">
    PLACEHOLDER PRODUCT BIG ATTRIBUTES
  </div>
  </div>
</div>`
const meta = {
  tags: ['autodocs'],
  title: "MainProduct/Layout",
  parameters: {
    docs: {
      source: {
        code: template
      }
    }
  }
};

export default meta;
type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  render: (args) => ({
    setup() {
      return args
    },
    template
  }),
};


export const BigDescription: Story = {
  render: (args) => ({
    setup() {
      return args
    },
    template: templateBigDescription
  }),
};
