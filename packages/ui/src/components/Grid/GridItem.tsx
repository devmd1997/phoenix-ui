import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { memo, type PropsWithChildren } from "react";

const gridItemVariants = cva("", {
  variants: {
    colSpan: {
      1: "ui:col-span-1",
      2: "ui:col-span-2",
      3: "ui:col-span-3",
      4: "ui:col-span-4",
      6: "ui:col-span-6",
      7: "ui:col-span-7",
      8: "ui:col-span-8",
      9: "ui:col-span-9",
      10: "ui:col-span-10",
      11: "ui:col-span-11",
      12: "ui:col-span-12",
      full: "ui:col-span-full",
    },
    colStart: {
      1: "ui:col-start-1",
      2: "ui:col-start-2",
      3: "ui:col-start-3",
      4: "ui:col-start-4",
      6: "ui:col-start-6",
      7: "ui:col-start-7",
      8: "ui:col-start-8",
      9: "ui:col-start-9",
      10: "ui:col-start-10",
      11: "ui:col-start-11",
      12: "ui:col-start-12",
      auto: "ui:col-start-auto",
    },
    colEnd: {
      1: "ui:col-end-1",
      2: "ui:col-end-2",
      3: "ui:col-end-3",
      4: "ui:col-end-4",
      6: "ui:col-end-6",
      7: "ui:col-end-7",
      8: "ui:col-end-8",
      9: "ui:col-end-9",
      10: "ui:col-end-10",
      11: "ui:col-end-11",
      12: "ui:col-end-12",
      auto: "ui:col-end-auto",
    },
    rowSpan: {
      1: "ui:row-span-1",
      2: "ui:row-span-2",
      3: "ui:row-span-3",
      4: "ui:row-span-4",
      6: "ui:row-span-6",
      7: "ui:row-span-7",
      8: "ui:row-span-8",
      9: "ui:row-span-9",
      10: "ui:row-span-10",
      11: "ui:row-span-11",
      12: "ui:row-span-12",
      full: "ui:row-span-full",
    },
    rowStart: {
      1: "ui:row-start-1",
      2: "ui:row-start-2",
      3: "ui:row-start-3",
      4: "ui:row-start-4",
      6: "ui:row-start-6",
      7: "ui:row-start-7",
      8: "ui:row-start-8",
      9: "ui:row-start-9",
      10: "ui:row-start-10",
      11: "ui:row-start-11",
      12: "ui:row-start-12",
      auto: "ui:row-start-auto",
    },
    rowEnd: {
      1: "ui:row-end-1",
      2: "ui:row-end-2",
      3: "ui:row-end-3",
      4: "ui:row-end-4",
      6: "ui:row-end-6",
      7: "ui:row-end-7",
      8: "ui:row-end-8",
      9: "ui:row-end-9",
      10: "ui:row-end-10",
      11: "ui:row-end-11",
      12: "ui:row-end-12",
      auto: "ui:row-end-auto",
    },
  },
});

export type GridItemSpecs = VariantProps<typeof gridItemVariants>;

export interface GridItemProps extends GridItemSpecs, PropsWithChildren {
  responsive?: ResponsiveProp<GridItemSpecs>;
}
function GridItemComponent({
  colSpan,
  colStart,
  colEnd,
  rowEnd,
  rowSpan,
  rowStart,
  responsive,
  children,
}: GridItemProps) {
  const style = useResponsiveVariantClass({
    variants: gridItemVariants,
    base: {
      colSpan,
      colStart,
      colEnd,
      rowEnd,
      rowSpan,
      rowStart,
    },
    responsive,
    toVariantProps: (responsiveVariant?: GridItemSpecs) => ({
      ...responsiveVariant,
    }),
  });

  return <div className={style}>{children}</div>;
}

export const GridItem = memo(GridItemComponent);
