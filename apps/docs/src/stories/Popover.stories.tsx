import {
  Button,
  Popover,
  type PopoverPosition,
  type PopoverSize,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions = ["sm", "md", "lg"] satisfies PopoverSize[];
const positionOptions = ["top", "bottom", "left", "right"] satisfies PopoverPosition[];

const baseArgs = {
  size: "md" as const,
  position: "top" as const,
  title: "Popover title",
  description: "Helpful context for the action below.",
  content: "Popover content stays concise and contextual.",
  visible: false,
  manualClose: false,
};

const meta = {
  title: "Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: sizeOptions },
    position: { control: { type: "select" }, options: positionOptions },
    title: { control: "text" },
    description: { control: "text" },
    content: { control: "text" },
    visible: { control: "boolean" },
    manualClose: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:flex ui:justify-center ui:items-center ui:min-h-60 ui:p-12">
      <Popover {...args}>
        <Button
          label="Hover trigger"
          intent="primary"
          variant="solid"
          size="md"
          onClick={() => undefined}
        />
      </Popover>
    </div>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
    position: "right",
    title: "",
    description: ""
  },
};

export const Positions: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-2 ui:gap-10 ui:w-full ui:max-w-4xl ui:p-12">
      {positionOptions.map((position) => (
        <div
          key={position}
          className="ui:flex ui:justify-center ui:items-center ui:min-h-40"
        >
          <Popover
            size="md"
            position={position}
            title={`Position: ${position}`}
            description="Hover the button to preview placement."
            content="Use position to anchor the popover around its trigger."
          >
            <Button
              label={position}
              intent="secondary"
              variant="outline"
              size="md"
              onClick={() => undefined}
            />
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-10 ui:w-full ui:max-w-xl ui:p-12">
      {sizeOptions.map((size) => (
        <div
          key={size}
          className="ui:flex ui:justify-center ui:items-center ui:min-h-32"
        >
          <Popover
            size={size}
            position="right"
            title={`Size: ${size}`}
            description="Sizing should affect padding and readable width."
            content="This story helps verify the popover rhythm across size variants."
          >
            <Button
              label={`Open ${size}`}
              intent="primary"
              variant="subtle"
              size="md"
              onClick={() => undefined}
            />
          </Popover>
        </div>
      ))}
    </div>
  ),
};

export const ControlledVisibility: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-6 ui:min-h-72 ui:p-12">
        <Button
          label={visible ? "Hide popover" : "Show popover"}
          intent="primary"
          variant="solid"
          size="md"
          onClick={() => setVisible((current) => !current)}
        />
        <Popover
          size="md"
          position="bottom"
          title="Manual visibility"
          description="This example uses local state plus the component callback."
          content="Enable manualClose when you want the popover to stay visible until dismissed."
          visible={visible}
          onVisible={setVisible}
          manualClose
        >
          <Button
            label="Popover anchor"
            intent="secondary"
            variant="outline"
            size="md"
            onClick={() => undefined}
          />
        </Popover>
      </div>
    );
  },
};
