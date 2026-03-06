import {
  Grid,
  GridItem,
  type GridColumns,
  type GridFlow,
  type GridRows,
} from "@phoenix-ui/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const columnOptions: GridColumns[] = [1, 2, 3, 4, 6, 8, 10, 12];
const rowOptions: GridRows[] = [1, 2, 3, 4, 6, 8, 10, 12];
const flowOptions: GridFlow[] = ["row", "col", "dense", "colDense", "rowDense"];
const gapOptions = ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

const cellClassName =
  "ui:flex ui:min-h-14 ui:items-center ui:justify-center ui:rounded-md ui:border ui:border-ui-fg-muted/40 ui:bg-ui-surface ui:px-3 ui:py-2 ui:text-label-sm ui:text-ui-fg";

const Cell = ({ label }: { label: string }) => (
  <div className={cellClassName}>{label}</div>
);

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    columns: { control: { type: "select" }, options: columnOptions },
    rows: { control: { type: "select" }, options: rowOptions },
    flow: { control: { type: "select" }, options: flowOptions },
    gap: { control: { type: "select" }, options: gapOptions },
    responsive: { control: false },
    children: { control: false },
  },
  args: {
    columns: 12,
    flow: "row",
    gap: "md",
  },
  render: (args) => (
    <Grid {...args}>
      <GridItem colSpan={3}>
        <Cell label="colSpan 3" />
      </GridItem>
      <GridItem colSpan={6}>
        <Cell label="colSpan 6" />
      </GridItem>
      <GridItem colSpan={3}>
        <Cell label="colSpan 3" />
      </GridItem>
      <GridItem colSpan={4}>
        <Cell label="colSpan 4" />
      </GridItem>
      <GridItem colSpan={4}>
        <Cell label="colSpan 4" />
      </GridItem>
      <GridItem colSpan={4}>
        <Cell label="colSpan 4" />
      </GridItem>
    </Grid>
  ),
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ColumnSpanExamples: Story = {
  render: () => (
    <Grid columns={12} gap="md">
      <GridItem colSpan={12}>
        <Cell label="colSpan 12" />
      </GridItem>
      <GridItem colSpan={8}>
        <Cell label="colSpan 8" />
      </GridItem>
      <GridItem colSpan={4}>
        <Cell label="colSpan 4" />
      </GridItem>
      <GridItem colSpan={6}>
        <Cell label="colSpan 6" />
      </GridItem>
      <GridItem colSpan={3}>
        <Cell label="colSpan 3" />
      </GridItem>
      <GridItem colSpan={3}>
        <Cell label="colSpan 3" />
      </GridItem>
    </Grid>
  ),
};

export const RowAndColumnPlacement: Story = {
  render: () => (
    <Grid columns={12} rows={4} gap="md">
      <GridItem colSpan={4} rowSpan={2}>
        <Cell label="colSpan 4 / rowSpan 2" />
      </GridItem>
      <GridItem colSpan={8}>
        <Cell label="colSpan 8" />
      </GridItem>
      <GridItem colSpan={4} colStart={9}>
        <Cell label="colStart 9 / colSpan 4" />
      </GridItem>
      <GridItem colSpan={6}>
        <Cell label="colSpan 6" />
      </GridItem>
      <GridItem colSpan={6}>
        <Cell label="colSpan 6" />
      </GridItem>
    </Grid>
  ),
};

export const ResponsiveItemSpans: Story = {
  render: () => (
    <Grid columns={12} gap="md">
      <GridItem
        colSpan={12}
        responsive={{ md: { colSpan: 6 }, lg: { colSpan: 4 } }}
      >
        <Cell label="12 -> 6 -> 4" />
      </GridItem>
      <GridItem
        colSpan={12}
        responsive={{ md: { colSpan: 6 }, lg: { colSpan: 8 } }}
      >
        <Cell label="12 -> 6 -> 8" />
      </GridItem>
      <GridItem colSpan={12} responsive={{ lg: { colSpan: 4 } }}>
        <Cell label="12 -> 4" />
      </GridItem>
    </Grid>
  ),
};
