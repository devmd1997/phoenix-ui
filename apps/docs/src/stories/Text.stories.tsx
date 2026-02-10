import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "@phoenix-ui/ui";

const meta: Meta<typeof Text> = {
  title: "Typography/Text",
  component: Text,
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Basic: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Text variant="h1">Phoenix UI</Text>
      <Text variant="body-md" tone="muted">
        Inter body text, Satoshi headings.
      </Text>
    </div>
  ),
};
