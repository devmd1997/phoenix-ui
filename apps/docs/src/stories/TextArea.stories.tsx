import {
  TextArea,
  type TextAreaBorder,
  type TextAreaSize,
  type TextAreaWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { ChangeEvent } from "react";

const sizeOptions: TextAreaSize[] = ["sm", "md", "lg"];
const widthOptions: TextAreaWidth[] = ["auto", "full"];
const borderOptions: TextAreaBorder[] = ["filled", "underline"];
const noop = () => undefined;

const baseArgs = {
  value: "",
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Forms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    border: { control: { type: "select" }, options: borderOptions },
    rows: { control: { type: "number" } },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
    placeholder: "Write your message...",
    rows: 4,
    size: "md",
    width: "full",
    border: "filled",
  },
  render: ({ onBlur, onFocus, ...args }) => {
    const [value, setValue] = useState("");

    return (
      <div className="ui:w-full ui:max-w-2xl">
        <TextArea
          {...args}
          value={value}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(event.target.value)
          }
          onFocus={onFocus ?? noop}
          onBlur={onBlur ?? noop}
        />
      </div>
    );
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
    value: "Initial content",
  },
};

export const Variants: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-3xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <TextArea
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Size: ${size}`}
            size={size}
            width="auto"
            border="filled"
            rows={4}
            responsive={{ md: size }}
          />
        </div>
      ))}
      {borderOptions.map((border) => (
        <div key={border} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            border: {border}
          </span>
          <TextArea
            value=""
            onChange={noop}
            onFocus={noop}
            onBlur={noop}
            placeholder={`Border: ${border}`}
            size="md"
            width="auto"
            border={border}
            rows={4}
            responsive={{ md: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithFooterActions: Story = {
  args: {
    ...baseArgs,
  },
  render: () => (
    <div className="ui:w-full ui:max-w-2xl">
      <TextArea
        value=""
        onChange={noop}
        onFocus={noop}
        onBlur={noop}
        placeholder="Write your reply..."
        size="md"
        width="full"
        rows={5}
        border="filled"
        footer={{
          secondaryButtons: [
            { label: "Discard", size: "lg", onClick: noop },
            { label: "Save Draft", size: "lg", onClick: noop },
          ],
          primaryButton: { label: "Post", size: "lg", onClick: noop },
        }}
        responsive={{ md: "md" }}
      />
    </div>
  ),
};
