import { cva, type VariantProps } from "class-variance-authority";
import type { GapSpace } from "../../types/spacing.types";
import type { Breakpoint, ResponsiveProp } from "../../types";
import {
  gapSpaceToClasses,
  getClassArrayFromVariants,
  responsiveClass,
} from "../../utlis/responsive";
import { cn } from "../../utlis/cn";
import { memo, type PropsWithChildren } from "react";

const gridVariants = cva("ui:grid", {
  variants: {
    columns: {
      1: "ui:grid-cols-1",
      2: "ui:grid-cols-2",
      3: "ui:grid-cols-3",
      4: "ui:grid-cols-4",
      6: "ui:grid-cols-6",
      8: "ui:grid-cols-8",
      10: "ui:grid-cols-10",
      12: "ui:grid-cols-12",
    },
    rows: {
      1: "ui:grid-rows-1",
      2: "ui:grid-rows-2",
      3: "ui:grid-rows-3",
      4: "ui:grid-rows-4",
      6: "ui:grid-rows-6",
      8: "ui:grid-rows-8",
      10: "ui:grid-rows-10",
      12: "ui:grid-rows-12",
    },
    flow: {
      col: "ui:grid-flow-col",
      row: "ui:grid-flow-row",
      dense: "ui:grid-flow-dense",
      colDense: "ui:grid-flow-col-dense",
      rowDense: "ui:grid-flow-row-dense",
    },
  },
});

export type GridColumns = NonNullable<
  VariantProps<typeof gridVariants>
>["columns"];
export type GridRows = NonNullable<VariantProps<typeof gridVariants>>["rows"];
export type GridFlow = NonNullable<VariantProps<typeof gridVariants>>["flow"];

type GridSpecs = {
  gap?: GapSpace;
  columns?: GridColumns;
  rows?: GridRows;
  flow?: GridFlow;
};

export interface GridProps extends GridSpecs, PropsWithChildren {
  responsive?: ResponsiveProp<GridSpecs>;
}

function GridComponent({
  gap,
  columns,
  rows,
  flow,
  responsive,
  children,
}: GridProps) {
  const classes = [];
  classes.push(gridVariants({ columns, rows, flow }));
  classes.push(gapSpaceToClasses(gap));

  if (responsive) {
    const responsiveMap = (Object.keys(responsive) as Breakpoint[]).reduce(
      (acc, bp) => {
        const gridSpec = responsive[bp];
        if (!gridSpec) return acc;

        const { gap: responsiveGap, ...responsiveVariants } = gridSpec;
        if (responsiveGap) {
          classes.push(gapSpaceToClasses(responsiveGap, bp));
        }
        const responsiveClassArr = getClassArrayFromVariants(
          gridVariants(responsiveVariants),
        );
        acc[bp] = responsiveClassArr;
        return acc;
      },
      {} as ResponsiveProp<string[]>,
    );
    classes.push(responsiveClass(responsiveMap));
  }

  const style = cn(classes);
  return <div className={style}>{children}</div>;
}

export const Grid = memo(GridComponent);
