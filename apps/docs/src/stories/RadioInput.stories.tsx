import { RadioInput, type RadioInputSize } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";

const sizeOptions: RadioInputSize[] = ["sm", "md", "lg"];
const noop = () => undefined;

const baseArgs = {
  value: "email",
  checked: false,
  onChange: noop,
  size: "md" as const,
  label: "Email notifications",
  description: "Get product updates and account alerts.",
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Forms/RadioInput",
  component: RadioInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    checked: { control: "boolean" },
    size: { control: { type: "select" }, options: sizeOptions },
    disabled: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: ({ checked, onChange, value, ...args }) => {
    const [selected, setSelected] = useState<string>(checked ? value : "");
    useEffect(() => {
      setSelected(checked ? value : "");
    }, [checked, value]);

    return (
      <div className="ui:w-full ui:max-w-md">
        <RadioInput
          {...args}
          value={value}
          checked={selected === value}
          onChange={(nextValue) => {
            setSelected(nextValue);
            onChange?.(nextValue);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof RadioInput>;

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
        <RadioInput
          key={size}
          value={"radio"}
          checked={size === "md"}
          onChange={noop}
          size={size}
          label={`Radio ${size}`}
          description={`Size variant: ${size}`}
          responsive={{ lg: size }}
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    checked: false,
    label: "Disabled option",
    description: "This option is not selectable.",
  },
};

export const GroupSelectionExample: Story = {
  args: {
    ...baseArgs,
  },
  render: () => {
    const [selected, setSelected] = useState("email");
    const options = [
      {
        value: "email",
        label: "Email",
        description: "Receive updates via email.",
      },
      {
        value: "sms",
        label: "SMS",
        description: "Receive updates via text message.",
      },
      {
        value: "push",
        label: "Push",
        description: "Receive updates as push notifications.",
      },
    ];

    return (
      <div className="ui:grid ui:grid-cols-1 ui:gap-3 ui:w-full ui:max-w-md">
        {options.map((option) => (
          <RadioInput
            key={option.value}
            value={option.value}
            checked={selected === option.value}
            onChange={setSelected}
            label={option.label}
            description={option.description}
            size="md"
            responsive={{ lg: "md" }}
          />
        ))}
      </div>
    );
  },
};
