import {
  Button,
  Group,
  IconButton,
  Input,
  type GroupProps,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const gapOptions = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
] satisfies NonNullable<GroupProps["gap"]>[];

const baseArgs = {
  gap: "sm" as const,
  attached: false,
  grow: false,
};

function renderGroupPlayground(args: GroupProps) {
  return (
    <div className="ui:w-full ui:p-12 ui:bg-ui-bg">
      <Group {...args}>
        <Button label="Back" intent="secondary" variant="outline" size="md" />
        <Button
          label="Save draft"
          intent="secondary"
          variant="surface"
          size="md"
        />
        <Button label="Publish" intent="primary" variant="solid" size="md" />
      </Group>
    </div>
  );
}

const meta = {
  title: "Layout/Group",
  component: Group,
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: { type: "select" },
      options: gapOptions,
    },
    attached: { control: "boolean" },
    grow: { control: "boolean" },
    children: { control: false },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: baseArgs,
  render: renderGroupPlayground,
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AttachedButtons: Story = {
  render: () => (
    <div className="ui:w-full ui:p-12 ui:bg-ui-bg">
      <Group attached>
        <Button label="Day" intent="secondary" variant="outline" size="md" />
        <Button label="Week" intent="secondary" variant="outline" size="md" />
        <Button label="Month" intent="secondary" variant="outline" size="md" />
      </Group>
    </div>
  ),
};

export const Grow: Story = {
  render: () => (
    <div className="ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
      <Group grow>
        <Button
          label="Secondary"
          intent="secondary"
          variant="outline"
          size="md"
        />
        <Button
          label="Primary action"
          intent="primary"
          variant="solid"
          size="md"
        />
      </Group>
    </div>
  ),
};

export const AttachedGrow: Story = {
  render: () => (
    <div className="ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
      <Group attached grow>
        <IconButton
          icon="minus"
          intent="secondary"
          variant="outline"
          size="md"
        />
        <Button label="24" intent="secondary" variant="outline" size="md" />
        <IconButton
          icon="plus"
          intent="secondary"
          variant="outline"
          size="md"
        />
      </Group>
    </div>
  ),
};

export const InputWithActions: Story = {
  args: {
    attached: true,
    gap: "none",
  },

  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
        <Group gap="sm">
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => undefined}
            onBlur={() => undefined}
            placeholder="Search projects"
            size="md"
            width="auto"
            surface="outline"
          />
          <Button label="Search" intent="primary" variant="solid" size="md" />
          <IconButton
            icon="plus"
            intent="secondary"
            variant="outline"
            size="md"
          />
        </Group>
      </div>
    );
  },
};

export const AttachedInputToolbar: Story = {
  args: {
    gap: "none",
    attached: true,
  },

  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="ui:w-full ui:max-w-4xl ui:p-12 ui:bg-ui-bg">
        <Group attached>
          <IconButton
            icon="search"
            intent="secondary"
            variant="outline"
            size="md"
          />
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => undefined}
            onBlur={() => undefined}
            placeholder="Search all content"
            size="md"
            width="full"
            surface="outline"
          />
          <Button label="Submit" intent="primary" variant="subtle" size="md" />
        </Group>
      </div>
    );
  },
};

export const GapScale: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-3xl ui:p-12 ui:bg-ui-bg">
      {gapOptions.map((gap) => (
        <div
          key={gap}
          className="ui:flex ui:flex-col ui:gap-2 ui:bg-ui-surface ui:rounded-sm ui:p-4"
        >
          <span className="ui:text-label-xs ui:text-ui-fg-muted">{gap}</span>
          <Group gap={gap}>
            <Button
              label="One"
              intent="secondary"
              variant="surface"
              size="sm"
            />
            <Button
              label="Two"
              intent="secondary"
              variant="surface"
              size="sm"
            />
            <Button
              label="Three"
              intent="secondary"
              variant="surface"
              size="sm"
            />
          </Group>
        </div>
      ))}
    </div>
  ),
};
