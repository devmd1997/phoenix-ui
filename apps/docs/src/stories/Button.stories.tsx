import { Button } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "callToAction"],
    },
    type: {
      control: { type: "select" },
      options: ["default", "ghost", "link"],
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
    variant: "primary",
  },
};
