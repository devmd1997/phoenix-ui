import { Button } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions = ["sm", "md", "lg"] as const;
const intentOptions = [
  "primary",
  "secondary",
  "danger",
  "success",
  "info",
] as const;
const variantOptions = [
  "solid",
  "outline",
  "subtle",
  "surface",
  "ghost",
  "plain",
] as const;
const cornerOptions = ["rounded", "none"] as const;

const iconMapping = {
  undefined: undefined,
  home: "home",
  user: "user",
  search: "search",
  bell: "bell",
  plus: "plus",
  minus: "minus",
};
const meta = {
  title: "Base/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { type: "string" },
    size: {
      control: { type: "select" },
      options: sizeOptions,
    },
    intent: {
      control: { type: "select" },
      options: intentOptions,
    },
    variant: {
      control: { type: "select" },
      options: variantOptions,
    },
    corners: {
      control: { type: "select" },
      options: cornerOptions,
    },
    disabled: { type: "boolean" },
    iconLeft: {
      control: { type: "select" },
      options: Object.keys(iconMapping),
      mapping: iconMapping,
    },
    iconRight: {
      control: { type: "select" },
      options: Object.keys(iconMapping),
      mapping: iconMapping,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;
export const Playground: Story = {
  args: {
    label: "Button",
    size: "md",
    intent: "primary",
    variant: "solid",
    corners: "rounded",
  },
};
