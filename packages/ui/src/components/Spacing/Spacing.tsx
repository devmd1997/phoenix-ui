import type {
  ResponsiveSpacing,
  SpacingOnly,
} from "../../types/spacing.types";
import { axisSpaceToClasses } from "../../utlis/responsive";
import type { Breakpoint } from "../../types";
import { cn } from "../../utlis/cn";

/**
 * Spacing component props.
 *
 * - `m`: Base (non-breakpoint) margin spacing.
 * - `p`: Base (non-breakpoint) padding spacing.
 * - `responsive`: Optional breakpoint overrides (`sm`/`md`/`lg`) where each
 *   breakpoint value can include `m` and/or `p`.
 *
 * Type guarantees:
 * - `SpacingOnly` requires at least one of `m` or `p`.
 * - `ResponsiveSpacing` requires at least one breakpoint key when provided, and
 *   each breakpoint requires at least one of `m` or `p`.
 */
export type SpacingProps = SpacingOnly & {
  responsive?: ResponsiveSpacing;
};

/**
 * Spacing
 * A spacing-only layout utility that generates margin/padding classes.
 * This component intentionally does not expose generic HTML props or className.
 *
 * Examples:
 * ```tsx
 * <Spacing m="md" />
 *
 * <Spacing m={{ y: "sm" }} p={{ x: "lg" }} />
 *
 * <Spacing
 *   m="sm"
 *   responsive={{
 *     md: { m: { y: "lg" } },
 *     lg: { p: { x: "xl" } },
 *   }}
 * />
 * ```
 *
 * @param props spacing configuration
 * @returns a `div` with generated spacing classes
 */
export function Spacing(props: SpacingProps) {
  const { m: baseMargin, p: basePadding, responsive } = props;
  const classes: string[] = [];

  if (baseMargin) {
    classes.push(...axisSpaceToClasses("m", baseMargin));
  }
  if (basePadding) {
    classes.push(...axisSpaceToClasses("p", basePadding));
  }

  if (responsive) {
    (Object.keys(responsive) as Breakpoint[]).forEach((bp) => {
      const spec = responsive[bp];
      if (!spec) return;
      const { m: margin, p: padding } = spec;
      if (margin) {
        classes.push(...axisSpaceToClasses("m", margin, bp));
      }
      if (padding) {
        classes.push(...axisSpaceToClasses("p", padding, bp));
      }
    });
  }

  return <div className={cn(classes)} />;
}
