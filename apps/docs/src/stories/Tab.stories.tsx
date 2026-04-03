import {
  Tab,
  type TabDirection,
  type TabItem,
  type TabItemAlignment,
  type TabItemSize,
  type TabVariants,
  type TabWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const variantOptions: TabVariants[] = ["underline", "ghost", "subtle", "plain"];
const directionOptions: TabDirection[] = ["horizontal", "vertical"];
const widthOptions: TabWidth[] = ["full", "sm", "md", "lg"];
const sizeOptions: TabItemSize[] = ["sm", "md", "lg"];
const alignmentOptions: TabItemAlignment[] = ["left", "center", "right"];

const baseItems: TabItem[] = [
  {
    label: "Overview",
    icon: "home",
    content: (
      <div className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <h3 className="ui:text-label-md ui:text-ui-fg">Overview</h3>
        <p className="ui:text-body-sm ui:text-ui-fg-muted">
          Project health, ownership, and release status live here.
        </p>
      </div>
    ),
  },
  {
    label: "Activity",
    icon: "bell",
    content: (
      <div className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <h3 className="ui:text-label-md ui:text-ui-fg">Activity</h3>
        <p className="ui:text-body-sm ui:text-ui-fg-muted">
          Recent changes, comments, and workflow events appear in this panel.
        </p>
      </div>
    ),
  },
  {
    label: "Settings",
    icon: "ellipsisHorizontal",
    content: (
      <div className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <h3 className="ui:text-label-md ui:text-ui-fg">Settings</h3>
        <p className="ui:text-body-sm ui:text-ui-fg-muted">
          Configure access, notifications, and workspace defaults.
        </p>
      </div>
    ),
  },
];

const disabledItems: TabItem[] = [
  ...baseItems.slice(0, 2),
  {
    label: "Advanced",
    icon: "search",
    disabled: true,
    content: (
      <div className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-4">
        <h3 className="ui:text-label-md ui:text-ui-fg">Advanced</h3>
        <p className="ui:text-body-sm ui:text-ui-fg-muted">
          This content should not render while the tab is disabled.
        </p>
      </div>
    ),
  },
];

const longLabelItems: TabItem[] = [
  {
    label: "Overview and status",
    content: baseItems[0].content,
  },
  {
    label: "Activity and approvals",
    content: baseItems[1].content,
  },
  {
    label: "Settings and permissions",
    content: baseItems[2].content,
  },
];

const baseArgs = {
  items: baseItems,
  defaultActiveTab: 0,
  variant: "underline" as const,
  groupDirection: "horizontal" as const,
  width: "full" as const,
  tabItemSize: "md" as const,
  tabItemAlignment: "center" as const,
};

const meta = {
  title: "Navigation/Tab",
  component: Tab,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: { type: "select" }, options: variantOptions },
    groupDirection: { control: { type: "select" }, options: directionOptions },
    width: { control: { type: "select" }, options: widthOptions },
    tabItemSize: { control: { type: "select" }, options: sizeOptions },
    tabItemAlignment: {
      control: { type: "select" },
      options: alignmentOptions,
    },
    defaultActiveTab: {
      control: { type: "number", min: 0, max: 2, step: 1 },
    },
    activeTab: {
      control: false,
    },
    items: {
      control: false,
    },
    emptyStateContent: {
      control: false,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-4xl ui:p-6">
      <Tab {...args} />
    </div>
  ),
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-4xl ui:p-6">
      {variantOptions.map((variant) => (
        <div key={variant} className="ui:flex ui:flex-col ui:gap-3">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{variant}</span>
          <Tab
            items={baseItems}
            defaultActiveTab={0}
            variant={variant}
            groupDirection="horizontal"
            width="full"
            tabItemSize="md"
            tabItemAlignment="center"
          />
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    ...baseArgs,
    groupDirection: "vertical",
    width: "sm",
    tabItemAlignment: "left",
  },
};

export const LongLabels: Story = {
  args: {
    ...baseArgs,
    items: longLabelItems,
    tabItemAlignment: "left",
  },
};

export const DisabledTabEmptyState: Story = {
  args: {
    ...baseArgs,
    items: disabledItems,
    defaultActiveTab: 2,
    emptyStateContent: (
      <div className="ui:flex ui:w-full ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-bg ui:p-4 ui:text-body-sm ui:text-ui-fg-muted">
        This tab is disabled. Select another tab to view content.
      </div>
    ),
  },
};
