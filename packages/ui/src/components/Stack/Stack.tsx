import type { PropsWithChildren } from "react";
import type { Space, SpacingSpec } from "../../types/spacing.types";
import type { Breakpoint, ResponsiveProp } from "../../types";
import { cva, type VariantProps } from "class-variance-authority";
import {
  gapSpaceToClasses,
  getClassArrayFromVariants,
  responsiveClass,
  spacingToClasses,
} from "../../utlis/responsive";

type StackSpecs = VariantProps<typeof stackVariants> & {
  gap: Space;
  spacing?: SpacingSpec;
};

export interface StackProps extends StackSpecs, PropsWithChildren {
  responsive?: ResponsiveProp<Partial<StackSpecs>>;
}

const stackVariants = cva("", {
  variants: {
    direction: {
      horizontal: "ui:flex-row",
      vertical: "ui:flex-col",
    },
    crossAxisAlignment: {
      stretch: "ui:items-stretch",
      start: "ui:items-start",
      center: "ui:items-center",
      end: "ui:items-end",
      baseline: "ui:items-baseline",
    },
    mainAxisAlignment: {
      start: "ui:justify-start",
      center: "ui:justify-center",
      end: "ui:justify-end",
      spaceBetween: "ui:justify-between",
      spaceAround: "ui:justify-around",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

export function Stack({ children, responsive, ...props }: StackProps) {
  const { spacing: baseSpacing, gap: defaultGap, ...baseVariants } = props;
  const classes = [];

  classes.push(spacingToClasses(baseSpacing));
  classes.push(gapSpaceToClasses(defaultGap));
  classes.push(stackVariants({ ...baseVariants }));

  if (responsive) {
    const responsiveMap = (Object.keys(responsive) as Breakpoint[]).reduce(
      (acc, bp) => {
        const spec = responsive[bp];
        if (spec) {
          const {
            spacing: responsiveSpacing,
            gap: responsiveGap,
            ...responsiveVariants
          } = spec;
          if (responsiveSpacing) {
            classes.push(spacingToClasses(responsiveSpacing, bp));
          }
          if (responsiveGap) {
            classes.push(gapSpaceToClasses(responsiveGap, bp));
          }
          const responsiveClassArr = getClassArrayFromVariants(
            stackVariants(responsiveVariants),
          );
          acc[bp] = responsiveClassArr;
        }
        return acc;
      },
      {} as ResponsiveProp<string[]>,
    );

    classes.push(responsiveClass(responsiveMap));
  }

  const style = classes.join(" ");
  return <div className={style}>{children}</div>;
}
