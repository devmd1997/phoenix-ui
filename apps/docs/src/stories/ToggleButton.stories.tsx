import { ToggleButton, type ToggleButtonSize } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: ToggleButtonSize[] = ["sm", "md", "lg"];
const noop = () => undefined;

const baseArgs = {
  toggled: false,
  onToggled: noop,
  disabled: false,
  size: "md" as const,
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Base/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  argTypes: {
    toggled: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: { type: "select" }, options: sizeOptions },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-md">
      <ToggleButton {...args} />
    </div>
  ),
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Sizes: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-4 ui:w-full ui:max-w-xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:items-center ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <ToggleButton
            toggled={size === "md"}
            onToggled={noop}
            size={size}
            responsive={{ lg: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const States: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-4 ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">Off</span>
        <ToggleButton toggled={false} onToggled={noop} size="md" />
      </div>
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">On</span>
        <ToggleButton toggled={true} onToggled={noop} size="md" />
      </div>
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">Disabled</span>
        <ToggleButton toggled={false} onToggled={noop} size="md" disabled />
      </div>
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">
          Disabled On
        </span>
        <ToggleButton toggled={true} onToggled={noop} size="md" disabled />
      </div>
    </div>
  ),
};
