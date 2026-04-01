import {
  ToolTip,
  type ToolTipProps,
  type PopoverPosition,
  type PopoverSize,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: PopoverSize[] = ["sm", "md", "lg"];
const positionOptions: PopoverPosition[] = ["top", "bottom", "left", "right"];
const variantOptions: NonNullable<ToolTipProps["variant"]>[] = [
  "secondary",
  "info",
  "success",
  "danger",
];

const baseArgs = {
  variant: "secondary" as const,
  size: "md" as const,
  position: "top" as const,
  title: "Helpful context",
  description: "Use this tooltip to add lightweight guidance near an action.",
  content: "Tooltips should stay concise and immediately relevant to the trigger.",
  manualClose: false,
};

const meta = {
  title: "Overlay/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: variantOptions },
    size: { control: { type: "select" }, options: sizeOptions },
    position: { control: { type: "select" }, options: positionOptions },
    title: { control: "text" },
    description: { control: "text" },
    content: { control: "text" },
    manualClose: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:flex ui:justify-center ui:items-center ui:min-h-72 ui:w-full ui:p-12 ui:bg-ui-bg">
      <ToolTip {...args} />
    </div>
  ),
} satisfies Meta<typeof ToolTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:justify-center ui:gap-6 ui:w-full ui:max-w-3xl ui:p-12">
      {variantOptions.map((variant) => (
        <ToolTip
          key={variant}
          variant={variant}
          size="md"
          position="top"
          title={`${variant} tooltip`}
          description="Trigger styling maps to the selected semantic variant."
          content="Click the icon button to reveal the tooltip content."
        />
      ))}
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-2 ui:gap-10 ui:w-full ui:max-w-4xl ui:p-12">
      {positionOptions.map((position) => (
        <div
          key={position}
          className="ui:flex ui:justify-center ui:items-center ui:min-h-40"
        >
          <ToolTip
            variant="info"
            size="md"
            position={position}
            title={`Position: ${position}`}
            description="Placement should anchor the tooltip around the trigger."
            content="Use position to control where the tooltip appears."
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-10 ui:w-full ui:max-w-xl ui:p-12">
      {sizeOptions.map((size) => (
        <div
          key={size}
          className="ui:flex ui:justify-center ui:items-center ui:min-h-32"
        >
          <ToolTip
            variant="secondary"
            size={size}
            position="right"
            title={`Size: ${size}`}
            description="Sizing should affect padding and readable content width."
            content="This story helps verify tooltip rhythm across size variants."
          />
        </div>
      ))}
    </div>
  ),
};
