import {
  Pagination,
  type PageItemSize,
  type PaginationItemVariant,
  type PaginationProps,
  type PaginationWidth,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

type DemoItem = {
  id: number;
  title: string;
  description: string;
};

const widthOptions: PaginationWidth[] = ["auto", "full"];
const variantOptions: PaginationItemVariant[] = [
  "solid",
  "outline",
  "subtle",
  "surface",
  "ghost",
  "plain",
] as const;
const sizeOptions: PageItemSize[] = ["sm", "md", "lg"];

const demoItems: DemoItem[] = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  title: `Entry ${index + 1}`,
  description: `Content block ${index + 1} for pagination preview.`,
}));

const renderDemoItem = (item: DemoItem) => (
  <div
    key={item.id}
    className="ui:flex ui:flex-col ui:gap-1 ui:rounded-sm ui:border ui:border-ui-border ui:bg-ui-surface ui:p-3"
  >
    <span className="ui:text-label-sm ui:text-ui-fg">{item.title}</span>
    <span className="ui:text-body-sm ui:text-ui-fg-muted">
      {item.description}
    </span>
  </div>
);

const baseArgs = {
  count: demoItems.length,
  defaultPage: 1,
  pageSize: 6,
  siblingCount: 1,
  width: "full" as const,
  variant: "outline" as const,
  size: "md" as const,
  items: {
    items: demoItems,
    render: renderDemoItem,
  },
} satisfies PaginationProps<DemoItem>;

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    count: { control: { type: "number", min: 1, step: 1 } },
    defaultPage: { control: { type: "number", min: 1, step: 1 } },
    pageSize: { control: { type: "number", min: 1, step: 1 } },
    siblingCount: { control: { type: "number", min: 0, max: 3, step: 1 } },
    width: { control: { type: "select" }, options: widthOptions },
    variant: { control: { type: "select" }, options: variantOptions },
    size: { control: { type: "select" }, options: sizeOptions },
    activePage: { control: false },
    items: { control: false },
    onPageChange: { action: "pageChanged" },
    onPageSizeChange: { action: "pageSizeChanged" },
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div className="ui:w-full ui:max-w-3xl ui:p-6">
      <Pagination {...args} />
    </div>
  ),
} satisfies Meta<typeof Pagination<DemoItem>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-4xl ui:p-6">
      {variantOptions.map((variant) => (
        <div key={variant} className="ui:flex ui:flex-col ui:gap-3">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{variant}</span>
          <Pagination
            count={demoItems.length}
            defaultPage={2}
            pageSize={5}
            siblingCount={1}
            width="full"
            variant={variant}
            size="md"
            items={{
              items: demoItems,
              render: renderDemoItem,
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-4xl ui:p-6">
      {sizeOptions.map((size) => (
        <div key={size} className="ui:flex ui:flex-col ui:gap-3">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{size}</span>
          <Pagination
            count={demoItems.length}
            defaultPage={2}
            pageSize={4}
            siblingCount={1}
            width="full"
            variant="surface"
            size={size}
            items={{
              items: demoItems,
              render: renderDemoItem,
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Widths: Story = {
  render: () => (
    <div className="ui:grid ui:grid-cols-1 ui:gap-6 ui:w-full ui:max-w-4xl ui:p-6">
      {widthOptions.map((width) => (
        <div key={width} className="ui:flex ui:flex-col ui:gap-3">
          <span className="ui:text-label-sm ui:text-ui-fg-muted">{width}</span>
          <div className={width === "auto" ? "ui:w-fit" : "ui:w-full"}>
            <Pagination
              count={demoItems.length}
              defaultPage={3}
              pageSize={3}
              siblingCount={2}
              width={width}
              variant="outline"
              size="md"
              items={{
                items: demoItems,
                render: renderDemoItem,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const IndicatorsOnly: Story = {
  args: {
    ...baseArgs,
    pageSize: 5,
    items: undefined,
  },
};
