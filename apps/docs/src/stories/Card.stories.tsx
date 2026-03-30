import { Button, Card, Text, type CardContainerMaxWidth, type CardContainerSurface } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const surfaceOptions = ["default", "subtle"] satisfies CardContainerSurface[];
const maxWidthOptions = ["sm", "md", "lg", "xl", "full"] satisfies CardContainerMaxWidth[];

const baseArgs = {
  border: true,
  elevated: false,
  rounded: true,
  surface: "default" as const,
  maxWidth: "md" as const,
};

function renderCard(args: React.ComponentProps<typeof Card>) {
  return (
    <div className="ui:w-full ui:p-12 ui:bg-ui-bg">
      <Card
        {...args}
        content={{
          gap: "sm",
          spacing: { p: "md" },
          width: "full",
          header: { title: "Project Phoenix", size: "h4" },
          description:
            "A compact card layout for summaries, quick actions, and supporting context.",
          footer: (
            <Button
              label="View details"
              intent="primary"
              variant="solid"
              size="md"
            />
          ),
        }}
      >
        <Text variant="body-md" tone="default">
          Ship reusable UI primitives with consistent spacing, typography, and
          interaction patterns.
        </Text>
      </Card>
    </div>
  );
}

const meta = {
  title: "Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    border: { control: "boolean" },
    elevated: { control: "boolean" },
    rounded: { control: "boolean" },
    surface: { control: { type: "select" }, options: surfaceOptions },
    maxWidth: { control: { type: "select" }, options: maxWidthOptions },
    content: { control: false },
    children: { control: false },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: baseArgs,
  render: renderCard,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Surfaces: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-4xl ui:p-12 ui:bg-ui-bg">
      {surfaceOptions.map((surface) => (
        <Card
          key={surface}
          border
          rounded
          surface={surface}
          maxWidth="full"
          content={{
            gap: "sm",
            spacing: { p: "md" },
            width: "full",
            header: { title: `Surface: ${surface}`, size: "h5" },
            description: "Compare surface treatments for neutral and subtle cards.",
          }}
        >
          <Text variant="body-sm" tone="default">
            This card keeps the same structure while changing only the surface token.
          </Text>
        </Card>
      ))}
    </div>
  ),
};

export const MaxWidths: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:p-12 ui:bg-ui-bg">
      {maxWidthOptions.map((maxWidth) => (
        <Card
          key={maxWidth}
          border
          rounded
          elevated={maxWidth === "xl"}
          maxWidth={maxWidth}
          content={{
            gap: "sm",
            spacing: { p: "md" },
            width: "full",
            header: { title: `Max width: ${maxWidth}`, size: "h5" },
            description: "Use maxWidth to control the reading measure of the card.",
          }}
        >
          <Text variant="body-sm" tone="default">
            Cards should stay readable while still adapting to different layout constraints.
          </Text>
        </Card>
      ))}
    </div>
  ),
};

export const Elevated: Story = {
  render: () =>
    renderCard({
      ...baseArgs,
      elevated: true,
      maxWidth: "lg",
    }),
};
