import {
  ComboBox,
  type ComboBoxInputSize,
  type ComboBoxInputWidth,
  type ComboBoxSurface,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: ComboBoxInputSize[] = ["sm", "md", "lg"];
const widthOptions: ComboBoxInputWidth[] = ["auto", "full"];
const surfaceOptions: ComboBoxSurface[] = ["outline", "subtle", "underline"];

const baseItems = [
  {
    id: "react",
    label: "React",
    value: "react",
    description: "Component model with a mature ecosystem.",
  },
  {
    id: "vue",
    label: "Vue",
    value: "vue",
    description: "Incremental adoption with strong template ergonomics.",
  },
  {
    id: "svelte",
    label: "Svelte",
    value: "svelte",
    description: "Compile-time optimization with a small runtime.",
  },
  {
    id: "solid",
    label: "Solid",
    value: "solid",
    description: "Fine-grained reactivity with minimal overhead.",
  },
];

const noop = () => undefined;

const meta = {
  title: "Forms/ComboBox",
  component: ComboBox,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    surface: { control: { type: "select" }, options: surfaceOptions },
    disabled: { control: "boolean" },
    multiselect: { control: "boolean" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    placeholder: "Search frameworks",
    items: baseItems,
    size: "md",
    width: "full",
    surface: "outline",
    disabled: false,
    multiselect: false,
    onInputValueChange: noop,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-md">
      <ComboBox {...args} />
    </div>
  ),
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Surfaces: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {surfaceOptions.map((surface) => (
        <div key={surface} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            {surface}
          </span>
          <ComboBox
            placeholder={`Surface: ${surface}`}
            items={baseItems}
            size="md"
            width="full"
            surface={surface}
            onInputValueChange={noop}
          />
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled combo box",
  },
};

export const MultiSelect: Story = {
  args: {
    multiselect: true,
    placeholder: "Choose frameworks",
    selectedListItemIds: ["react", "vue"],
  },
};

export const MultiSelectSurfaces: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {surfaceOptions.map((surface) => (
        <div key={surface} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            {surface}
          </span>
          <ComboBox
            placeholder={`Multi-select: ${surface}`}
            items={baseItems}
            size="md"
            width="full"
            surface={surface}
            multiselect
            selectedListItemIds={["react", "svelte"]}
            onInputValueChange={noop}
          />
        </div>
      ))}
    </div>
  ),
};
