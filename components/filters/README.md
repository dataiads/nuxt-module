# Filters

To work with filter you must use the `<FiltersContainer>` and the `<FilterElements>` it provides auto configuration from the `lpoConfig`

## Basic Example

```html
<FiltersContainer
  :open="open"
  :filter="filter"
  class="flex-1 divide-y divide-grey3 grow"
>
  <template #title="{ value }">
    <span class="grow whitespace-nowrap py-2 md:p-[0] font-bold md:text-[16px]">
      {{ value }}
    </span>
  </template>
  <template #append="{ displayed }">
    <span class="w-[10px] h-[7px]">
      <img
        v-if="displayed"
        class="m-auto w-full h-full"
        src="~/assets/icons/chevron-b.svg"
        width=""
        height=""
        loading="lazy"
        alt=""
      />
      <img
        v-else
        class="m-auto w-full h-full"
        src="~/assets/icons/chevron-t.svg"
        width=""
        height=""
        loading="lazy"
        alt=""
      />
    </span>
  </template>
  <template #prepend-content="{ removeAllFilter, groups }">
    <button class="text-sm mb-4" @click="removeAllFilter(groups)">
      Effacer
    </button>
  </template>
  <template #content="{ elements, parameters }">
    <FiltersElements
      class="flex flex-col max-h-[300px] overflow-y-auto gap-3 mb-3"
      :filter="filter"
      :elements="elements"
      :parameters="parameters"
    >
      <template #checkbox="scope">
        <input
          v-bind="scope.info"
          :checked="scope.get()"
          @change="scope.set($event.target.checked)"
          class="text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer"
        />
      </template>
    </FiltersElements>
  </template>
</FiltersContainer>
```

## Config

Elements are given from the lpoConfig. Here an example

```js
filterParams: [
  {
    title: "productType",
    elements: [
      {
        component: "autolist-checkbox",
        props: {
          criteria: "productType",
          operator: "EQUAL",
        },
      },
    ],
  },
  {
    title: "color",
    elements: [
      {
        component: "autolist-checkbox",
        props: {
          criteria: "color",
          operator: "EQUAL",
        },
      },
    ],
  },
  {
    title: "price",
    elements: [
      {
        component: "range",
        props: {
          criteria: "price",
          min: "0",
          minPlaceholder: "Min €",
          max: "10000",
          maxPlaceholder: "Max €",
        },
      },
      {
        component: "checkbox",
        props: {
          criteria: "salePrice",
          operator: "LOWER",
          "value-criteria": "price",
          label: "En promotion",
        },
      },
    ],
  },
  {
    title: "size",
    elements: [
      {
        component: "autolist-checkbox",
        props: {
          criteria: "size",
          operator: "EQUAL",
        },
      },
    ],
  },
],

```

## Other recipe

### Changing the checkbox style

You can use the props `checkboxClass` on `FilterElements` to apply global style to the checkbox

You can use the slot `checkbox` to modify all the checkbox. If you want to modify specific checkbox you can work with the slot `auto_checkbox` to modify only `FiltersAutoListCheckbox` component.

```html
<FilterElements>
  <template #checkbox="scope">
    <input
      v-bind="scope.info"
      :checked="scope.get()"
      @change="scope.set($event.target.checked)"
      class="text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer"
    />
  </template>
</FilterElements>
```

### Changing the label style

You can use the props `labelClass` on `FiltersElements` to apply global style to the label

You can use the slot `label` to modify all labels. If you want to modify specific label you can work with the slot `auto_list_label` to modify only `FiltersAutoListCheckbox` component.

### Custom elements

If in the config there is no component found in the `FiltersElements` you can use the slot `filter_${MY_TITLE}` where `MY_TITLE` should be replaced by the title config.

```html
<template #filter_color="{ item }">
  <div class="flex flex-col max-h-[300px] overflow-y-auto gap-3 mb-3">
    <FiltersCheckbox
      v-for="color in colorsList"
      :filter="filter"
      :label="color.label"
      :value="color.value"
      v-bind="item.props"
      class="flex items-center gap-3"
      input-class="text-black bg-white rounded-xs border-[#9E9E9E] rounded-sm w-[18px] h-[18px] focus:ring-primary focus:ring-0 hover:cursor-pointer"
      label-class="leading-[15px] text-sm"
    />
  </div>
</template>
```