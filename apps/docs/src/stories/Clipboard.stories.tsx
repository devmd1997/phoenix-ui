import { Clipboard, Text, type ClipboardVariant } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const variantOptions: ClipboardVariant[] = ["default", "link"];

const baseArgs = {
  label: "Copy",
  value: "npm install @phoenix-ui/ui",
  timeout: 3000,
  variant: "default" as const,
  disabled: false,
};

const meta = {
  title: "Utilities/Clipboard",
  component: Clipboard,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    defaultValue: { control: "text" },
    timeout: { control: "number" },
    variant: { control: { type: "select" }, options: variantOptions },
    disabled: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-xl ui:flex ui:items-center ui:justify-center ui:p-8 ui:bg-ui-bg">
      <Clipboard {...args} />
    </div>
  ),
} satisfies Meta<typeof Clipboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-4 ui:w-full ui:max-w-xl ui:p-8">
      {variantOptions.map((variant) => (
        <Clipboard
          key={variant}
          label={`Copy ${variant}`}
          value={`clipboard-${variant}`}
          timeout={3000}
          variant={variant}
        />
      ))}
    </div>
  ),
};

export const CopyExamples: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      <div className="ui:flex ui:items-center ui:justify-between ui:gap-4 ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <div className="ui:flex ui:flex-col ui:gap-1">
          <Text variant="label-sm">Package install command</Text>
          <Text variant="body-sm" tone="muted">
            npm install @phoenix-ui/ui
          </Text>
        </div>
        <Clipboard
          label="Copy"
          value="npm install @phoenix-ui/ui"
          timeout={2000}
          variant="default"
        />
      </div>

      <div className="ui:flex ui:items-center ui:justify-between ui:gap-4 ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <div className="ui:flex ui:flex-col ui:gap-1">
          <Text variant="label-sm">Invite token</Text>
          <Text variant="body-sm" tone="muted">
            phx_invite_live_29381
          </Text>
        </div>
        <Clipboard
          label="Copy token"
          value="phx_invite_live_29381"
          timeout={2000}
          variant="default"
        />
      </div>

      <div className="ui:flex ui:items-center ui:justify-between ui:gap-4 ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <div className="ui:flex ui:flex-col ui:gap-1">
          <Text variant="label-sm">Support email</Text>
          <Text variant="body-sm" tone="muted">
            support@phoenix-ui.dev
          </Text>
        </div>
        <Clipboard
          label="Copy email"
          value="support@phoenix-ui.dev"
          timeout={2000}
          variant="link"
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    label: "Copy disabled",
  },
};
