import { IconButton } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions = ["sm", "md", "lg"] as const;
const intentOptions = [
  "primary",
  "secondary",
  "callToAction",
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
const iconOptions = [
  "home",
  "user",
  "search",
  "bell",
  "plus",
  "minus",
  "close",
] as const;

const meta = {
  title: "Base/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "select" },
      options: iconOptions,
    },
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
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
    onHover: { action: "hovered" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    icon: "plus",
    size: "md",
    intent: "primary",
    variant: "solid",
    corners: "rounded",
    disabled: false,
  },
  render: (args) => (
    <div className="ui:min-h-60 ui:w-full ui:flex ui:items-center ui:justify-center ui:p-12 ui:bg-ui-bg">
      <IconButton {...args} />
    </div>
  ),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-2 ui:gap-6 ui:w-full ui:max-w-3xl ui:p-12">
      {variantOptions.map((variant) => (
        <div
          key={variant}
          className="ui:flex ui:items-center ui:justify-center ui:min-h-24 ui:bg-ui-surface ui:rounded-sm"
        >
          <IconButton
            icon="plus"
            size="md"
            intent="primary"
            variant={variant}
            corners="rounded"
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:justify-center ui:gap-6 ui:w-full ui:p-12">
      {sizeOptions.map((size) => (
        <IconButton
          key={size}
          icon="search"
          size={size}
          intent="secondary"
          variant="outline"
          corners="rounded"
        />
      ))}
    </div>
  ),
};

export const IntentMatrix: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-3 ui:gap-6 ui:w-full ui:max-w-4xl ui:p-12">
      {intentOptions.map((intent) => (
        <div
          key={intent}
          className="ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:min-h-32 ui:bg-ui-surface ui:rounded-sm"
        >
          <IconButton
            icon="bell"
            size="md"
            intent={intent}
            variant={intent === "callToAction" ? "solid" : "subtle"}
            corners="rounded"
          />
          <span className="ui:text-label-xs ui:text-ui-fg-muted">{intent}</span>
        </div>
      ))}
    </div>
  ),
};
