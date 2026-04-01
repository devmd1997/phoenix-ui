import {
  Collapsible,
  Text,
  type CollapsibleHeight,
  type CollapsibleVariant,
  type CollapsibleWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const heightOptions: CollapsibleHeight[] = ["sm", "md", "lg", "auto", "full"];
const widthOptions: CollapsibleWidth[] = ["sm", "md", "lg", "auto", "full"];
const variantOptions: CollapsibleVariant[] = ["default", "container"];

const baseArgs = {
  title: "Release Notes",
  defaultOpen: false,
  disabled: false,
  height: "auto" as const,
  width: "full" as const,
  variant: "container" as const,
};

function renderContent() {
  return (
    <div className="ui:flex ui:flex-col ui:gap-3 ui:w-full">
      <Text variant="body-sm" tone="default">
        Phoenix UI now includes richer form primitives, better overlay docs,
        and stronger token alignment across interactive states.
      </Text>
      <Text variant="body-sm" tone="muted">
        Use collapsible sections to progressively disclose longer supporting
        content without overwhelming the surrounding layout.
      </Text>
    </div>
  );
}

const meta = {
  title: "Disclosure/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    defaultOpen: { control: "boolean" },
    disabled: { control: "boolean" },
    height: { control: { type: "select" }, options: heightOptions },
    width: { control: { type: "select" }, options: widthOptions },
    variant: { control: { type: "select" }, options: variantOptions },
    onOpenChange: { action: "openChanged" },
    children: { control: false },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
      <Collapsible {...args}>{renderContent()}</Collapsible>
    </div>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
      {variantOptions.map((variant) => (
        <Collapsible
          key={variant}
          title={`Variant: ${variant}`}
          defaultOpen={variant === "container"}
          width="full"
          height="auto"
          variant={variant}
        >
          {renderContent()}
        </Collapsible>
      ))}
    </div>
  ),
};

export const Heights: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
      {heightOptions.map((height) => (
        <Collapsible
          key={height}
          title={`Height: ${height}`}
          defaultOpen
          width="full"
          height={height}
          variant="container"
        >
          <div className="ui:flex ui:flex-col ui:gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Text key={index} variant="body-sm" tone="default">
                Collapsible height preview line {index + 1}. This helps verify
                scroll behavior when the content exceeds the available space.
              </Text>
            ))}
          </div>
        </Collapsible>
      ))}
    </div>
  ),
};

export const Widths: Story = {
  render: () => (
    <div className="ui:flex ui:flex-col ui:items-start ui:gap-6 ui:w-full ui:p-12 ui:bg-ui-bg">
      {widthOptions.map((width) => (
        <Collapsible
          key={width}
          title={`Width: ${width}`}
          defaultOpen
          width={width}
          height="auto"
          variant="container"
        >
          {renderContent()}
        </Collapsible>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    title: "Disabled section",
  },
};
