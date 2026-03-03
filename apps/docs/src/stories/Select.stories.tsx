import {
  Select,
  type SelectComponentOptionProps,
  type SelectSize,
  type SelectSurface,
  type SelectWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: SelectSize[] = ["sm", "md", "lg"];
const widthOptions: SelectWidth[] = ["auto", "full"];
const surfaceOptions: SelectSurface[] = ["outline", "subtle", "underline"];
const noop = () => undefined;

const baseOptions: SelectComponentOptionProps[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

const groupedOptions: SelectComponentOptionProps[] = [
  {
    label: "Frontend",
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ],
  },
  {
    label: "Backend",
    options: [
      { value: "node", label: "Node.js" },
      { value: "go", label: "Go" },
      { value: "rust", label: "Rust" },
    ],
  },
];

const baseArgs = {
  id: "storybook-select",
  placeholder: "Choose a framework",
  options: baseOptions,
  size: "md" as const,
  width: "full" as const,
  surface: "outline" as const,
  disabled: false,
  required: false,
  autocomplete: false,
  responsive: { lg: "md" as const },
  onSelectChange: noop,
};

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    surface: { control: { type: "select" }, options: surfaceOptions },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    autocomplete: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-md">
      <Select {...args} />
    </div>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    ...baseArgs,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <Select
            id={`select-size-${size}`}
            placeholder={`Size: ${size}`}
            options={baseOptions}
            size={size}
            width="auto"
            surface="outline"
            onSelectChange={noop}
            responsive={{ lg: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {surfaceOptions.map((surface) => (
        <div key={surface} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            {surface}
          </span>
          <Select
            id={`select-surface-${surface}`}
            placeholder={`Surface: ${surface}`}
            options={baseOptions}
            size="md"
            width="full"
            surface={surface}
            onSelectChange={noop}
            responsive={{ lg: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Widths: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {widthOptions.map((width) => (
        <div key={width} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{width}</span>
          <Select
            id={`select-width-${width}`}
            placeholder={`Width: ${width}`}
            options={baseOptions}
            size="md"
            width={width}
            surface="outline"
            onSelectChange={noop}
            responsive={{ lg: "md" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const GroupedOptions: Story = {
  args: {
    ...baseArgs,
    options: groupedOptions,
    placeholder: "Choose a stack",
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-md">
      <Select {...args} id="select-grouped-options" onSelectChange={noop} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    placeholder: "Disabled select",
  },
};
