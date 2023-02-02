import React from "react";
import { Button } from "@chakra-ui/react";

export default {
  title: "Chakra/Button",
  component: Button,
  argTypes: {
    colorScheme: { control: "text" },
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <Button {...args} />;

export const Success = Template.bind();
Success.args = {
  colorScheme: "green",
  children: "Success",
};

export const Danger = Template.bind();
Danger.args = {
  colorScheme: "red",
  children: "Danger",
};
