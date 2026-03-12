import { Button, Modal, Text, type ModalSize } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions = ["sm", "md", "lg"] satisfies ModalSize[];
const storyCanvasClass = "ui:h-[500px] ui:w-full ui:p-12 ui:bg-ui-bg";

const baseArgs = {
  title: "Archive project",
  visible: false,
  size: "md" as const,
};

const meta = {
  title: "Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    visible: { control: "boolean" },
    size: { control: { type: "select" }, options: sizeOptions },
    onDismiss: { action: "dismissed" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: baseArgs,
  render: (args) => {
    const [visible, setVisible] = useState(args.visible);

    return (
      <div className={storyCanvasClass}>
        <div className="ui:flex ui:justify-center">
          <Button
            label={visible ? "Hide modal" : "Show modal"}
            intent="primary"
            variant="solid"
            size="md"
            onClick={() => setVisible((current) => !current)}
          />
        </div>

        <Modal
          {...args}
          visible={visible}
          onDismiss={() => {
            setVisible(false);
            args.onDismiss?.();
          }}
        >
          <Text variant="body-md" tone="default">
            This modal is controlled by state in the story render function, not
            inside the component.
          </Text>
          <Text variant="body-sm" tone="muted">
            Use this pattern when you want the parent to own open and close
            behavior.
          </Text>
        </Modal>
      </div>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => {
    const [visibleSize, setVisibleSize] = useState<ModalSize | null>(null);

    return (
      <div className={storyCanvasClass}>
        <div className="ui:flex ui:flex-wrap ui:justify-center ui:gap-4">
          {sizeOptions.map((size) => (
            <Button
              key={size}
              label={`Open ${size}`}
              intent="secondary"
              variant="outline"
              size="md"
              onClick={() => setVisibleSize(size)}
            />
          ))}
        </div>

        {sizeOptions.map((size) => (
          <Modal
            key={size}
            title={`Modal size: ${size}`}
            size={size}
            visible={visibleSize === size}
            onDismiss={() => setVisibleSize(null)}
          >
            <Text variant="body-md" tone="default">
              This story verifies padding, title scale, and footer alignment for
              the {size} size.
            </Text>
          </Modal>
        ))}
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div className={storyCanvasClass}>
        <div className="ui:flex ui:justify-center">
          <Button
            label="Open confirmation modal"
            intent="primary"
            variant="solid"
            size="md"
            onClick={() => setVisible(true)}
          />
        </div>

        <Modal
          title="Publish changes"
          size="md"
          visible={visible}
          onDismiss={() => setVisible(false)}
          footer={{
            cancelButtonLabel: "Cancel",
            submitButtonLabel: "Publish",
            onSubmit: () => setVisible(false),
          }}
        >
          <Text variant="body-md" tone="default">
            Review your changes before publishing. This footer setup exercises
            both cancel and submit actions.
          </Text>
        </Modal>
      </div>
    );
  },
};
