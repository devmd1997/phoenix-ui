import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import { Text } from "@phoenix-ui/ui";
import type { TextTone, TextVariant } from "@phoenix-ui/ui";

type StoryArgs = Parameters<typeof Text>[0] & {
  text?: string;
};

const variants: TextVariant[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "label-md",
  "label-sm",
  "label-xs",
];

const toneVariants: TextTone[] = ["default", "muted", "primary", "secondary"];

const meta: Meta<StoryArgs> = {
  title: "Text/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    text: { type: "string" },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    tone: {
      control: { type: "select" },
      options: toneVariants,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;
const PlaygroundTemplate: StoryFn<StoryArgs> = ({ text, ...args }) => (
  <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-2 ui:gap-4">
    <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
      <Text {...args}>{text}</Text>
    </div>
  </div>
);
export const Playground = PlaygroundTemplate.bind({});

Playground.args = {
  variant: "body-md",
  tone: "default",
  truncate: false,
  uppercase: false,
  text: "Phoenix UI Text",
};

export const Variants: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-2 ui:gap-4">
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">h1</div>
        <Text variant="h1" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">h2</div>
        <Text variant="h2" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">h3</div>
        <Text variant="h3" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">h4</div>
        <Text variant="h4" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">h5</div>
        <Text variant="h5" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">h6</div>
        <Text variant="h6" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">body-lg</div>
        <Text variant="body-lg" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">body-md</div>
        <Text variant="body-md" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">body-sm</div>
        <Text variant="body-sm" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">caption</div>
        <Text variant="caption" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">label-md</div>
        <Text variant="label-md" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">label-sm</div>
        <Text variant="label-sm" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">label-xs</div>
        <Text variant="label-xs" tone="default">
          Phoenix UI Text
        </Text>
      </div>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 md:ui:grid-cols-2 ui:gap-4">
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">default</div>
        <Text variant="body-md" tone="default">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">muted</div>
        <Text variant="body-md" tone="muted">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">primary</div>
        <Text variant="body-md" tone="primary">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">secondary</div>
        <Text variant="body-md" tone="secondary">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">success</div>
        <Text variant="body-md" tone="success">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">accent</div>
        <Text variant="body-md" tone="accent">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">warning</div>
        <Text variant="body-md" tone="warning">
          Phoenix UI Text
        </Text>
      </div>
      <div className="ui:flex ui:flex-col ui:gap-2 ui:p-4 ui:border ui:border-ui-border ui:rounded-md">
        <div className="ui:text-body-sm ui:text-ui-fg-muted">inverse</div>
        <Text variant="body-md" tone="inverse">
          Phoenix UI Text
        </Text>
      </div>
    </div>
  ),
};

export const WithLongText: Story = {
  render: () => (
    <div className="ui:w-[240px] ui:border ui:border-ui-border ui:p-3 ui:rounded-md">
      <Text variant="body-sm" truncate>
        This is a very long line of text that should truncate with an ellipsis
        in a narrow container.
      </Text>
    </div>
  ),
};
