import {
  Tag,
  type TagComponentSize,
  type TagComponentVariant,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const sizeOptions: TagComponentSize[] = ["sm", "md", "lg"];
const variantOptions: TagComponentVariant[] = [
  "subtle",
  "solid",
  "outline",
  "surface",
];
const noop = () => undefined;

const baseArgs = {
  id: "tag-react",
  value: "React",
  size: "md" as const,
  variant: "outline" as const,
  closable: true,
  maxWidth: undefined,
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
    variant: { control: { type: "select" }, options: variantOptions },
    closable: { control: "boolean" },
    maxWidth: { control: "text" },
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
          variant="outline"
          closable
          onClick={noop}
        />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
      {variantOptions.map((variant) => (
        <Tag
          key={variant}
          id={variant}
          value={`Tag ${variant}`}
          size="md"
          variant={variant}
          closable
          onClick={noop}
        />
      ))}
    </div>
  ),
};

export const VariantsWithoutClose: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-center ui:gap-3">
      {variantOptions.map((variant) => (
        <Tag
          key={`${variant}-static`}
          id={`${variant}-static`}
          value={`Tag ${variant}`}
          size="md"
          variant={variant}
          closable={false}
          onClick={noop}
        />
      ))}
    </div>
  ),
};

export const MaxWidths: Story = {
  render: () => {
    const longLabel =
      "Very long tag label that should truncate once the max width is reached";

    return (
      <div className="ui:flex ui:flex-col ui:items-start ui:gap-3">
        <Tag
          id="tag-max-width-sm"
          value={longLabel}
          size="md"
          variant="outline"
          closable
          maxWidth="8rem"
          onClick={noop}
        />
        <Tag
          id="tag-max-width-md"
          value={longLabel}
          size="md"
          variant="surface"
          closable={false}
          maxWidth="12rem"
          onClick={noop}
        />
        <Tag
          id="tag-max-width-lg"
          value={longLabel}
          size="md"
          variant="solid"
          closable
          maxWidth="16rem"
          onClick={noop}
        />
      </div>
    );
  },
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
            variant="outline"
            closable
            onClick={() => setTags((current) => current.filter((v) => v !== tag))}
          />
        ))}
      </div>
    );
  },
};
