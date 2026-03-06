import {
  SegmentControl,
  type SegmentControlGroupSize,
  type SegmentControlGroupWidth,
  type SegmentControlItem,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: SegmentControlGroupSize[] = ["sm", "md", "lg"];
const widthOptions: SegmentControlGroupWidth[] = ["auto", "full"];
const noop = () => undefined;

const baseItems: SegmentControlItem[] = [
  { label: "Overview", value: "overview" },
  { label: "Details", value: "details" },
  { label: "Activity", value: "activity" },
];

const longLabelItems: SegmentControlItem[] = [
  { label: "Overview and Summary", value: "overview" },
  { label: "Implementation Details", value: "details" },
  { label: "Activity and Changelog", value: "activity" },
];

const disabledItems: SegmentControlItem[] = [
  { label: "Overview", value: "overview" },
  { label: "Details", value: "details", disabled: true },
  { label: "Activity", value: "activity" },
];

const baseArgs = {
  size: "md" as const,
  width: "full" as const,
  disabled: false,
  defaultActiveIndex: 0,
  items: baseItems,
  responsive: { lg: "md" as const },
  onInputChange: noop,
};

const meta = {
  title: "Forms/SegmentControl",
  component: SegmentControl,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    disabled: { control: "boolean" },
    defaultActiveIndex: { control: { type: "number", min: 0, max: 2, step: 1 } },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-md">
      <SegmentControl {...args} />
    </div>
  ),
} satisfies Meta<typeof SegmentControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <SegmentControl
            size={size}
            width="full"
            items={baseItems}
            onInputChange={noop}
            responsive={{ lg: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Widths: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {widthOptions.map((width) => (
        <div key={width} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{width}</span>
          <SegmentControl
            size="md"
            width={width}
            items={baseItems}
            onInputChange={noop}
            responsive={{ lg: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const LongLabels: Story = {
  args: {
    ...baseArgs,
    items: longLabelItems,
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
};

export const DisabledItem: Story = {
  args: {
    ...baseArgs,
    items: disabledItems,
  },
};
