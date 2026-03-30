import {
  TagInput,
  type TagInputSize,
  type TagInputSurface,
  type TagInputWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: TagInputSize[] = ["sm", "md", "lg"];
const widthOptions: TagInputWidth[] = ["auto", "full"];
const surfaceOptions: TagInputSurface[] = ["outline", "subtle", "underline"];

const baseTags = ["React", "TypeScript"];

const baseArgs = {
  placeholder: "Type a tag and press Enter",
  value: baseTags,
  defaultValue: baseTags,
  delimiter: ",",
  size: "md" as const,
  width: "full" as const,
  surface: "outline" as const,
  disabled: false,
  responsive: { lg: "md" as const },
};

const meta = {
  title: "Forms/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    delimiter: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    surface: { control: { type: "select" }, options: surfaceOptions },
    disabled: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-xl">
      <TagInput
        key={[
          args.placeholder,
          args.delimiter,
          args.size,
          args.width,
          args.surface,
          args.disabled,
          ...(args.value ?? []),
        ].join("|")}
        {...args}
      />
    </div>
  ),
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {sizeOptions.map((size) => (
        <TagInput
          key={size}
          placeholder={`Size ${size}`}
          value={["React", "UI"]}
          defaultValue={["React", "UI"]}
          delimiter=","
          size={size}
          width="full"
          surface="outline"
          responsive={{ lg: size }}
        />
      ))}
    </div>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-2xl">
      {surfaceOptions.map((surface) => (
        <TagInput
          key={surface}
          placeholder={`Surface ${surface}`}
          value={["Design", "System"]}
          defaultValue={["Design", "System"]}
          delimiter=","
          size="md"
          width="full"
          surface={surface}
          responsive={{ lg: "md" }}
        />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    placeholder: "Disabled tag input",
  },
};

export const DelimiterExample: Story = {
  args: {
    ...baseArgs,
    placeholder: "Type comma-separated tags, then press Enter",
    value: ["Alpha", "Beta"],
    defaultValue: ["Alpha", "Beta"],
    delimiter: ",",
  },
};
