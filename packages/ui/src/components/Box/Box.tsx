import { cva, type VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import type { SpacingSpec } from "../../types/spacing.types";
import type { Breakpoint, ResponsiveProp } from "../../types";
import { axisSpaceToClasses, responsiveClass } from "../../utlis/responsive";

/**
 * Box visual variants mapped to finite, token-backed class sets.
 * Use these props to control structure and surface intent.
 */
const boxVariants = cva("", {
  variants: {
    display: {
      inline: "ui:inline",
      block: "ui:block",
      inlineFlex: "ui:inline-flex",
    },
    variant: {
      default: "ui:text-ui-fg ui:border-ui-fg",
      muted: "ui:text-ui-fg-muted ui:border-ui-fg-muted",
      primary: "ui:text-ui-primary ui:border-ui-primary",
      secondary: "ui:text-ui-secondary ui:border-ui-secondary",
      success: "ui:text-ui-secondary ui:border-ui-secondary",
      accent: "ui:text-ui-accent ui:border-ui-accent",
      warning: "ui:text-ui-accent ui:border-ui-accent",
      inverse: "ui:text-ui-bg ui:border-ui-bg",
      inherit: "ui:text-inherit ui:border-inherit",
    },
    backgroundColor: {
      none: "ui:bg-none",
      default: "ui:bg-ui-bg",
      surface: "ui:bg-ui-surface",
    },
    border: {
      none: "ui:border-none",
      sm: "ui:border",
      md: "ui:border-2",
      lg: "ui:border-4",
    },
    borderRadius: {
      none: "ui:rounded-none",
      sm: "ui:rounded-sm",
      md: "ui:rounded-md",
      lg: "ui:rounded-lg",
      xl: "ui:rounded-xl",
      "2xl": "ui:rounded-2xl",
      "3xl": "ui:rounded-3xl",
      full: "ui:rounded-full",
    },
  },
  defaultVariants: {
    display: "block",
    variant: "default",
    backgroundColor: "none",
    border: "none",
    borderRadius: "none",
  },
});

type BoxTags = "div" | "span" | "p";
type BoxSpecs = VariantProps<typeof boxVariants> & {
  /**
   * Optional spacing spec for margin (`m`) and/or padding (`p`).
   * Supports shorthand values or axis/object values.
   */
  spacing?: SpacingSpec;
};

/**
 * Box props.
 *
 * - `as`: semantic element to render (`div` by default).
 * - `display`, `variant`, `backgroundColor`, `border`, `borderRadius`: base styles.
 * - `spacing`: base margin/padding styles.
 * - `responsive`: breakpoint-specific overrides (`sm`/`md`/`lg`) for any Box spec,
 *   including `spacing`.
 * - `children`: Box content.
 */
export interface BoxProps extends BoxSpecs, PropsWithChildren {
  as?: BoxTags;
  responsive: ResponsiveProp<BoxSpecs>;
}

/**
 * Box
 * Structural container primitive for token-driven display, surface, border,
 * radius, and spacing styles.
 *
 * Behavior:
 * - Applies base variant classes through CVA.
 * - Converts `spacing` into margin/padding utility classes.
 * - Applies responsive variant and spacing overrides per breakpoint.
 *
 * Examples:
 * ```tsx
 * <Box variant="default" backgroundColor="surface" border="sm" borderRadius="md" responsive={{}}>
 *   Content
 * </Box>
 *
 * <Box spacing={{ p: { x: "md", y: "sm" } }} responsive={{}}>
 *   Spaced content
 * </Box>
 *
 * <Box
 *   responsive={{
 *     sm: { display: "inline" },
 *     md: { border: "sm", spacing: { p: { all: "lg" } } },
 *   }}
 * >
 *   Responsive content
 * </Box>
 * ```
 */
export function Box({ as, children, responsive, ...props }: BoxProps) {
  const { spacing: baseSpacing, ...baseVariants } = props;
  const Tag = as ?? "div";
  const classes = [];

  classes.push(boxVariants({ ...baseVariants }));

  if (baseSpacing) {
    if (baseSpacing.m) {
      classes.push(...axisSpaceToClasses("m", baseSpacing.m));
    }
    if (baseSpacing.p) {
      classes.push(...axisSpaceToClasses("p", baseSpacing.p));
    }
  }

  if (responsive) {
    const responsiveMap = (Object.keys(responsive) as Breakpoint[]).reduce(
      (acc, bp) => {
        const spec = responsive[bp];
        if (spec) {
          const { spacing, ...responsiveVariants } = spec;
          if (spacing) {
            if (spacing.m) {
              classes.push(...axisSpaceToClasses("m", spacing.m, bp));
            }
            if (spacing.p) {
              classes.push(...axisSpaceToClasses("p", spacing.p, bp));
            }
          }
          const responsiveClassArr = boxVariants(responsiveVariants).split(" ");
          acc[bp] = responsiveClassArr;
        }
        return acc;
      },
      {} as ResponsiveProp<string[]>,
    );

    classes.push(responsiveClass(responsiveMap));
  }

  const style = classes.join(" ");
  return (
    <Tag className={style} {...props}>
      {children}
    </Tag>
  );
}
