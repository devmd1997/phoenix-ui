import { ListBox, type ListBoxSize, type ListBoxWidth } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions: ListBoxSize[] = ["sm", "md", "lg"];
const widthOptions: ListBoxWidth[] = ["auto", "full"];

const baseItems = [
  {
    label: "React",
    value: "react",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "Svelte",
    value: "svelte",
  },
];

const itemsWithIcons = [
  {
    label: "Home",
    value: "home",
    description: "Primary landing view.",
    iconLeft: "home" as const,
  },
  {
    label: "Profile",
    value: "profile",
    description: "Account details and preferences.",
    iconLeft: "user" as const,
  },
  {
    label: "Search",
    value: "search",
    description: "Find components and docs.",
    iconLeft: "search" as const,
  },
  {
    label: "Alerts",
    value: "alerts",
    description: "Recent activity and updates.",
    iconLeft: "bell" as const,
  },
];

const meta = {
  title: "Forms/ListBox",
  component: ListBox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "select" }, options: sizeOptions },
    width: { control: { type: "select" }, options: widthOptions },
    multiselect: { control: "boolean" },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    items: baseItems,
    size: "md",
    width: "full",
    multiselect: false,
    direction: "vertical",
    responsive: { lg: "md" as const },
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-md">
      <ListBox {...args} />
    </div>
  ),
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-4 ui:w-full ui:max-w-xl">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-2">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <ListBox
            items={baseItems}
            size={size}
            width="full"
            direction="vertical"
            responsive={{ lg: size }}
          />
        </div>
      ))}
    </div>
  ),
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...baseItems,
      {
        label: "Solid",
        value: "solid",
        description: "Unavailable in this example.",
        disabled: true,
      },
    ],
  },
};

export const WithLeadingIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
};

export const NavigationItems: Story = {
  render: () => (
    <div className="ui:w-full ui:max-w-md">
      <ListBox
        items={[
          {
            label: "Dashboard",
            value: "dashboard",
            description: "Overview and quick actions.",
            iconLeft: "home",
          },
          {
            label: "People",
            value: "people",
            description: "Users, teams, and access.",
            iconLeft: "user",
          },
          {
            label: "Notifications",
            value: "notifications",
            description: "Alerts and delivery settings.",
            iconLeft: "bell",
          },
        ]}
        size="md"
        width="full"
        direction="vertical"
        responsive={{ lg: "md" }}
      />
    </div>
  ),
};

export const MultiSelect: Story = {
  args: {
    items: [
      {
        label: "Home",
        value: "home",
        description: "Primary navigation and overview.",
        iconLeft: "home",
      },
      {
        label: "Profile",
        value: "profile",
        description: "Identity and account settings.",
        iconLeft: "user",
      },
      {
        label: "Search",
        value: "search",
        description: "Quick access to docs and components.",
        iconLeft: "search",
      },
      {
        label: "Notifications",
        value: "notifications",
        description: "Alerts and status changes.",
        iconLeft: "bell",
      },
    ],
    multiselect: true,
  },
};
