import {
  PasswordInput,
  type InputSize,
  type InputSurface,
  type InputWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions: InputSize[] = ["sm", "md", "lg"];
const widthOptions: InputWidth[] = ["auto", "full"];
const surfaceOptions: InputSurface[] = ["outline", "subtle", "underline"];

const noop = () => undefined;
const baseArgs = {
  value: "",
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  responsive: { lg: "md" as const },
  placeholder: "Enter password",
  size: "md" as const,
  width: "full" as const,
  surface: "outline" as const,
  visible: false,
};

const meta = {
  title: "Forms/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    surface: { control: { type: "select" }, options: surfaceOptions },
    visible: { control: "boolean" },
    onVisibleChange: { action: "visibility changed" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: baseArgs,
  render: ({ onBlur, onFocus, onChange, onVisibleChange, ...args }) => {
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(args.visible ?? false);

    return (
      <div className="ui:w-full ui:max-w-md">
        <PasswordInput
          {...args}
          visible={visible}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onChange(event);
          }}
          onVisibleChange={(nextVisible) => {
            setVisible(nextVisible);
          }}
          onFocus={onFocus ?? noop}
          onBlur={onBlur ?? noop}
        />
      </div>
    );
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <PasswordInput
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Password size: ${size}`}
            size={size}
            width="full"
            responsive={{ md: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {surfaceOptions.map((surface) => (
        <div key={surface} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            {surface}
          </span>
          <PasswordInput
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Surface: ${surface}`}
            size="md"
            width="full"
            surface={surface}
            responsive={{ md: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const ControlledVisibility: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(true);

    return (
      <div className="ui:w-full ui:max-w-md">
        <PasswordInput
          value={value}
          visible={visible}
          onVisibleChange={setVisible}
          onChange={(event) => setValue(event.target.value)}
          onFocus={noop}
          onBlur={noop}
          placeholder="Controlled visibility"
          size="md"
          width="full"
          surface="outline"
        />
      </div>
    );
  },
};
