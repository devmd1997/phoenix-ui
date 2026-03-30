import { Tag, type TagComponentSize } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions: TagComponentSize[] = ["sm", "md", "lg"];
const noop = () => undefined;

const baseArgs = {
  id: "tag-react",
  value: "React",
  size: "md" as const,
  disabled: false,
  onClick: noop,
};

const meta = {
  title: "Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    disabled: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => <Tag {...args} />,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
      {sizeOptions.map((size) => (
        <Tag
          key={size}
          id={size}
          value={`Tag ${size}`}
          size={size}
          onClick={noop}
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    value: "Disabled tag",
  },
};

export const RemovableGroup: Story = {
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "Storybook"]);

    return (
      <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
        {tags.map((tag) => (
          <Tag
            key={tag}
            id={tag}
            value={tag}
            size="md"
            onClick={() => setTags((current) => current.filter((v) => v !== tag))}
          />
        ))}
      </div>
    );
  },
};
