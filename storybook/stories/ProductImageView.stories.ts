import type { Meta, StoryObj } from '@storybook/vue3'

import ProductImage from "~/components/product-image.vue";

const template = `<div>
    <ProductImage>
      <template #aside-image="{ src, alt }">
        <img :src="src" :alt="alt">
      </template>
    </ProductImage>
  </div>`

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'ProductImage/Basic',
    component: ProductImage,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof ProductImage>

export default meta
type Story = StoryObj<typeof meta>

export const NuxtWelcomeStory: Story = {
}
