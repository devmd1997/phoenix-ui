import { DropDownButton, type DropDownButtonProps } from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const sizeOptions = ["sm", "md", "lg"] as const;
const variantOptions = [
  "solid",
  "outline",
  "subtle",
  "surface",
  "ghost",
  "plain",
] as const;
const menuPositionOptions = ["top", "bottom", "left", "right"] as const;

const iconMapping = {
  undefined: undefined,
  home: "home",
  bell: "bell",
  plus: "plus",
  search: "search",
  ellipsisHorizontal: "ellipsisHorizontal",
  user: "user",
} as const;

const basicItems: DropDownButtonProps["items"] = [
  { key: "new", label: "New file", icon: "plus" },
  { key: "search", label: "Search", icon: "search" },
  { key: "notifications", label: "Notifications", icon: "bell" },
];

const groupedItems: DropDownButtonProps["items"] = [
  { key: "profile", label: "Profile", icon: "user" },
  {
    key: "workspace",
    label: "Workspace",
    icon: "ellipsisHorizontal",
    items: [
      { key: "members", label: "Members" },
      { key: "permissions", label: "Permissions", intent: "info" },
      { key: "archive", label: "Archive workspace", intent: "danger" },
    ],
  },
  { key: "logout", label: "Log out", intent: "danger" },
];

const nestedGroupedItems: DropDownButtonProps["items"] = [
  { key: "overview", label: "Overview", icon: "home" },
  {
    key: "workspace",
    label: "Workspace",
    icon: "ellipsisHorizontal",
    items: [
      { key: "members", label: "Members", icon: "user" },
      {
        key: "permissions",
        label: "Permissions",
        icon: "search",
        items: [
          { key: "roles", label: "Roles" },
          { key: "teams", label: "Teams" },
          {
            key: "advanced",
            label: "Advanced",
            items: [
              { key: "audit-log", label: "Audit log", icon: "bell" },
              { key: "api-keys", label: "API keys", intent: "info" },
              {
                key: "danger-zone",
                label: "Danger zone",
                intent: "danger",
              },
            ],
          },
        ],
      },
      {
        key: "automation",
        label: "Automation",
        icon: "plus",
        items: [
          { key: "workflows", label: "Workflows" },
          { key: "webhooks", label: "Webhooks", intent: "info" },
        ],
      },
    ],
  },
  {
    key: "billing",
    label: "Billing",
    icon: "bell",
    items: [
      { key: "invoices", label: "Invoices" },
      {
        key: "plans",
        label: "Plans",
        items: [
          { key: "starter", label: "Starter" },
          { key: "growth", label: "Growth" },
          { key: "enterprise", label: "Enterprise" },
        ],
      },
    ],
  },
];

const longLabelItems: DropDownButtonProps["items"] = [
  {
    key: "activity",
    label: "View recent activity across every shared project",
    icon: "bell",
  },
  {
    key: "preferences",
    label: "Open workspace preferences and notification settings",
    icon: "ellipsisHorizontal",
  },
  {
    key: "invite",
    label: "Invite collaborators by email",
    icon: "user",
  },
];

const meta = {
  title: "Base/DropDownButton",
  component: DropDownButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "select" },
      options: sizeOptions,
    },
    variant: {
      control: { type: "select" },
      options: variantOptions,
    },
    menuPosition: {
      control: { type: "select" },
      options: menuPositionOptions,
    },
    hideIndicator: { control: "boolean" },
    disabled: { control: "boolean" },
    initalOpen: { control: "boolean" },
    iconLeft: {
      control: { type: "select" },
      options: Object.keys(iconMapping),
      mapping: iconMapping,
    },
    items: {
      control: false,
    },
    open: {
      control: false,
    },
    onMenuChange: { action: "menuChanged" },
    className: {
      control: false,
    },
  },
  args: {
    label: "Actions",
    size: "md",
    variant: "outline",
    menuPosition: "right",
    hideIndicator: false,
    disabled: false,
    initalOpen: false,
    iconLeft: "plus",
    items: basicItems,
  },
  parameters: {
    controls: { expanded: true },
  },
  render: (args) => (
    <div className="ui:min-h-64 ui:w-full ui:flex ui:items-center ui:justify-center ui:p-12">
      <DropDownButton {...args} />
    </div>
  ),
} satisfies Meta<typeof DropDownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const MenuPositions: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-2 ui:gap-12 ui:w-full ui:max-w-3xl ui:p-12">
      {menuPositionOptions.map((menuPosition) => (
        <div
          key={menuPosition}
          className="ui:min-h-40 ui:flex ui:flex-col ui:items-center ui:justify-center ui:gap-3 ui:bg-ui-surface ui:rounded-sm"
        >
          <span className="ui:text-label-sm ui:text-ui-fg-muted">
            {menuPosition}
          </span>
          <DropDownButton
            label="Options"
            size="md"
            variant="outline"
            menuPosition={menuPosition}
            items={basicItems}
            initalOpen
          />
        </div>
      ))}
    </div>
  ),
};

export const GroupedItems: Story = {
  args: {
    label: "Workspace",
    iconLeft: "ellipsisHorizontal",
    items: groupedItems,
    initalOpen: true,
  },
};

export const NestedGroups: Story = {
  args: {
    label: "Admin",
    iconLeft: "ellipsisHorizontal",
    items: nestedGroupedItems,
    initalOpen: true,
  },
};

export const NestedGroupBranches: Story = {
  render: () => (
    <div className="ui:flex ui:flex-wrap ui:items-start ui:justify-center ui:gap-10 ui:w-full ui:max-w-5xl ui:p-12">
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-3">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">
          Right-opening tree
        </span>
        <DropDownButton
          label="Workspace"
          iconLeft="ellipsisHorizontal"
          size="md"
          variant="outline"
          menuPosition="right"
          items={nestedGroupedItems}
        />
      </div>
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-3">
        <span className="ui:text-label-sm ui:text-ui-fg-muted">
          Left-opening tree
        </span>
        <DropDownButton
          label="Workspace"
          iconLeft="ellipsisHorizontal"
          size="md"
          variant="outline"
          menuPosition="left"
          items={nestedGroupedItems}
        />
      </div>
    </div>
  ),
};

export const LongLabels: Story = {
  args: {
    label: "More",
    iconLeft: "bell",
    items: longLabelItems,
    menuPosition: "bottom",
    initalOpen: true,
  },
};
