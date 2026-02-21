import { TextInput } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

type TextInputType = "text" | "email" | "password" | "search" | "url" | "tel";
type TextInputSize = "sm" | "md" | "lg" | "full";
type TextInputPrefixPreset = "searchIcon" | "atSign" | "dollar";
type TextInputSuffixPreset = "domainDotCom" | "shortcutSlash" | "goButton";

const sizeOptions: TextInputSize[] = ["sm", "md", "lg", "full"];
const typeOptions: TextInputType[] = [
  "text",
  "email",
  "password",
  "search",
  "url",
  "tel",
];
const prefixPresetOptions: Array<TextInputPrefixPreset | undefined> = [
  undefined,
  "searchIcon",
  "atSign",
  "dollar",
];
const suffixPresetOptions: Array<TextInputSuffixPreset | undefined> = [
  undefined,
  "domainDotCom",
  "shortcutSlash",
  "goButton",
];

const noop = () => undefined;
const baseArgs = {
  value: "",
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Forms/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    type: { control: { type: "select" }, options: typeOptions },
    prefixPreset: { control: { type: "select" }, options: prefixPresetOptions },
    suffixPreset: { control: { type: "select" }, options: suffixPresetOptions },
    suffixButtonLabel: { control: "text" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
    placeholder: "Enter text...",
    size: "md",
    type: "text",
    prefixPreset: undefined,
    suffixPreset: undefined,
    suffixButtonLabel: "Go",
  },
  render: ({ onBlur, onFocus, ...args }) => {
    const [value, setValue] = useState("");

    return (
      <div className="ui:w-full ui:max-w-md">
        <TextInput
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={onFocus ?? noop}
          onBlur={onBlur ?? noop}
        />
      </div>
    );
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
    value: "Hello",
  },
};

export const Sizes: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <TextInput
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Size: ${size}`}
            size={size}
            responsive={{ md: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Types: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {typeOptions.map((type) => (
        <div key={type} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{type}</span>
          <TextInput
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Type: ${type}`}
            type={type}
            size="md"
            responsive={{ md: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const PrefixesAndSuffixes: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      <div className="ui:flex ui:flex-col ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">
          Currency prefix
        </span>
        <TextInput
          value=""
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          placeholder="0.00"
          size="md"
          prefixPreset="dollar"
          responsive={{ md: "md" }}
        />
      </div>

      <div className="ui:flex ui:flex-col ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">
          Domain suffix
        </span>
        <TextInput
          value=""
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          placeholder="my-site"
          size="md"
          suffixPreset="domainDotCom"
          responsive={{ md: "md" }}
        />
      </div>

      <div className="ui:flex ui:flex-col ui:gap-2">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">
          Both prefix and suffix
        </span>
        <TextInput
          value=""
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          placeholder="Search docs"
          type="search"
          size="md"
          prefixPreset="searchIcon"
          suffixPreset="shortcutSlash"
          responsive={{ md: "md" }}
        />
      </div>
    </div>
  ),
};

export const SearchWithIconAndAction: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:w-full ui:max-w-md">
      <TextInput
        value=""
        onChange={noop}
        onFocus={noop}
        onBlur={noop}
        placeholder="Search components"
        type="search"
        size="full"
        prefixPreset="searchIcon"
        suffixPreset="goButton"
        suffixButtonLabel="Go"
        responsive={{ md: "full" }}
      />
    </div>
  ),
};
