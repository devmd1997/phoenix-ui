import { Button, Input, type InputSize, type InputSurface, type InputWidth } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

type InputType = "text" | "email" | "password" | "search" | "url" | "tel";

const sizeOptions: InputSize[] = ["sm", "md", "lg"];
const widthOptions: InputWidth[] = ["auto", "full"];
const surfaceOptions: InputSurface[] = ["outline", "subtle", "underline"];
const typeOptions: InputType[] = ["text", "email", "password", "search", "url", "tel"];

const noop = () => undefined;
const baseArgs = {
  value: "",
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    surface: { control: { type: "select" }, options: surfaceOptions },
    type: { control: { type: "select" }, options: typeOptions },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
    placeholder: "Enter text...",
    size: "md",
    width: "auto",
    surface: "outline",
    type: "text",
  },
  render: ({ onBlur, onFocus, ...args }) => {
    const [value, setValue] = useState("");

    return (
      <div className="ui:w-full ui:max-w-md">
        <Input
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={onFocus ?? noop}
          onBlur={onBlur ?? noop}
        />
      </div>
    );
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
    value: "Hello",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <Input
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Size: ${size}`}
            size={size}
            width="full"
            responsive={{ md: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {typeOptions.map((type) => (
        <div key={type} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{type}</span>
          <Input
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Type: ${type}`}
            type={type}
            size="md"
            width="full"
            responsive={{ md: "md" }}
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
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{surface}</span>
          <Input
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

export const Widths: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {widthOptions.map((width) => (
        <div key={width} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{width}</span>
          <Input
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Width: ${width}`}
            size="md"
            width={width}
            surface="outline"
            responsive={{ md: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const PrefixAndSuffix: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      <Input
        value=""
        onChange={noop}
        onFocus={noop}
        onBlur={noop}
        placeholder="Price"
        size="md"
        width="full"
        prefix="$"
      />
      <Input
        value=""
        onChange={noop}
        onFocus={noop}
        onBlur={noop}
        placeholder="Search"
        type="search"
        size="md"
        width="full"
        suffix="⌘K"
      />
      <Input
        value=""
        onChange={noop}
        onFocus={noop}
        onBlur={noop}
        placeholder="Search components"
        type="search"
        size="md"
        width="full"
        prefix="search"
        suffix={<Button label="Go" size="sm" variant="primary" onClick={noop} />}
      />
    </div>
  ),
};
