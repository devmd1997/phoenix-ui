import { CheckBox, type CheckBoxSize } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions: CheckBoxSize[] = ["sm", "md", "lg"];
const positionOptions: Array<"left" | "right"> = ["left", "right"];
const noop = () => undefined;

const baseArgs = {
  checked: false,
  onChange: noop,
  checkboxPosition: "left" as const,
  size: "md" as const,
  label: "Accept terms",
  description: "You can update this later in account settings.",
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Forms/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    size: { control: { type: "select" }, options: sizeOptions },
    checkboxPosition: {
      control: { type: "select" },
      options: positionOptions,
    },
    label: { control: "text" },
    description: { control: "text" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: ({ checked, onChange, ...args }) => {
    const [isChecked, setIsChecked] = useState(!!checked);

    return (
      <div className="ui:w-full ui:max-w-md">
        <CheckBox
          {...args}
          checked={isChecked}
          onChange={(nextChecked) => {
            setIsChecked(nextChecked);
            onChange?.(nextChecked);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof CheckBox>;

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
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {sizeOptions.map((size) => (
        <CheckBox
          key={size}
          checked={false}
          onChange={noop}
          checkboxPosition="left"
          size={size}
          label={`Checkbox ${size}`}
          description={`Size variant: ${size}`}
          responsive={{ lg: size }}
        />
      ))}
    </div>
  ),
};

export const Positions: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {positionOptions.map((position) => (
        <CheckBox
          key={position}
          checked={false}
          onChange={noop}
          checkboxPosition={position}
          size="md"
          label={`Checkbox on ${position}`}
          description="Label/content alignment example"
          responsive={{ lg: "md" }}
        />
      ))}
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    ...baseArgs,
    checked: false,
    indeterminate: true,
    label: "Partially selected",
    description:
      "Use this for parent selection when only some children are selected.",
  },
};
