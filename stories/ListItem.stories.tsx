import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { ListItem, ListItemProps } from "../components/ListItem";
import { Product } from "../interfaces";
export default {
  title: "Example/ListItem",
  component: ListItem,
  parameters: { actions: { handles: ["mouseover", "click .btn"] } },
  argTypes: {},
} as Meta;

const Template: Story<ListItemProps & Product> = (args) => (
  <ListItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isLoading: false,
  id: 101,
  src: "https://www.chiquelle.de/pub_images/original/204-31jan2020.JPG",
  title: "Jeans",
  channel: "",
  createdAt: "10 apr. 2020",
  views: "20",
};

export const isLoading = Template.bind({});
isLoading.args = {
  ...Primary.args,
  isLoading: true,
};
