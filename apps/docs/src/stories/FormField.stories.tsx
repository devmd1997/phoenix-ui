import { FormField, TextArea, TextInput, type FormFieldProps } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions: Array<NonNullable<FormFieldProps["size"]>> = [
  "sm",
  "md",
  "lg",
];
const directionOptions: Array<NonNullable<FormFieldProps["direction"]>> = [
  "horizontal",
  "vertical",
];
const noop = () => undefined;

const baseArgs = {
  label: "Message",
  value: "storybook-form-field",
  description: "Use FormField to group label, help text, and validation state.",
  required: false,
  disabled: false,
  size: "md" as const,
  direction: "vertical" as const,
  responsive: { lg: { size: "md", direction: "vertical" } as const },
};

const meta = {
  title: "Forms/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    description: { control: "text" },
    error: { control: "text" },
    success: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    role: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    direction: { control: { type: "select" }, options: directionOptions },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="ui:w-full ui:max-w-xl">
        <FormField {...args}>
          <TextInput
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={noop}
            onBlur={noop}
            placeholder="Enter a message"
            width="full"
            surface="outline"
            disabled={args.disabled}
            responsive={{ lg: "md" }}
          />
        </FormField>
      </div>
    );
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-2xl">
      <FormField
        label="Email"
        value="validation-email"
        description="We will only use this for account notices."
        size="md"
        direction="vertical"
        responsive={{ lg: { size: "md", direction: "vertical" } }}
      >
        <TextInput
          value=""
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          placeholder="you@example.com"
          width="full"
          surface="outline"
          responsive={{ lg: "md" }}
        />
      </FormField>
      <FormField
        label="Project slug"
        value="validation-slug"
        description="Use lowercase letters and hyphens only."
        error="Slug is already in use."
        size="md"
        direction="vertical"
        responsive={{ lg: { size: "md", direction: "vertical" } }}
      >
        <TextInput
          value="phoenix-ui"
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          width="full"
          surface="outline"
          responsive={{ lg: "md" }}
        />
      </FormField>
      <FormField
        label="Team name"
        value="validation-team"
        success="Team name is available."
        size="md"
        direction="vertical"
        responsive={{ lg: { size: "md", direction: "vertical" } }}
      >
        <TextInput
          value="Sunrise Studio"
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          width="full"
          surface="outline"
          responsive={{ lg: "md" }}
        />
      </FormField>
      <FormField
        label="Archived notes"
        value="validation-notes"
        description="Disabled fields should pass state through to children."
        disabled
        size="md"
        direction="vertical"
        responsive={{ lg: { size: "md", direction: "vertical" } }}
      >
        <TextArea
          value="This project has been archived."
          onChange={noop}
          onFocus={noop}
          onBlur={noop}
          width="full"
          border="subtle"
          disabled
          rows={4}
          responsive={{ lg: "md" }}
        />
      </FormField>
    </div>
  ),
};

export const DirectionsAndSizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-3xl">
      {directionOptions.map((direction) => (
        <div key={direction} className="ui:grid ui:grid-cols-1 ui:gap-4">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            direction: {direction}
          </span>
          {sizeOptions.map((size) => (
            <FormField
              key={`${direction}-${size}`}
              label={`Display name (${size})`}
              value={`${direction}-${size}`}
              description="Spacing adjusts with the selected size variant."
              size={size}
              direction={direction}
              responsive={{ lg: { size, direction } }}
            >
              <TextInput
                value=""
                onChange={noop}
                onFocus={noop}
                onBlur={noop}
                placeholder={`${direction} / ${size}`}
                width="full"
                surface="outline"
                responsive={{ lg: "md" }}
              />
            </FormField>
          ))}
        </div>
      ))}
    </div>
  ),
};
