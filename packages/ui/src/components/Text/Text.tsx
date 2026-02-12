import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utlis/cn";
import type { Breakpoint, ResponsiveProp } from "../../types";
import { responsiveClass } from "../../utlis/responsive";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "ui:font-heading ui:text-h1 ui:font-bold ui:tracking-tight ui:leading-heading",
      h2: "ui:font-heading ui:text-h2 ui:font-bold ui:tracking-tight ui:leading-heading",
      h3: "ui:font-heading ui:text-h3 ui:font-bold ui:tracking-tight ui:leading-heading",
      h4: "ui:font-heading ui:text-h4 ui:font-bold ui:tracking-tight ui:leading-heading",
      h5: "ui:font-heading ui:text-h5 ui:font-medium ui:leading-heading",
      h6: "ui:font-heading ui:text-h6 ui:font-medium ui:leading-heading",
      "body-lg": "ui:font-body ui:text-body-lg ui:font-normal ui:leading-body",
      "body-md": "ui:font-body ui:text-body-md ui:font-normal ui:leading-body",
      "body-sm": "ui:font-body ui:text-body-sm ui:font-normal ui:leading-body",
      caption:
        "ui:font-body ui:text-caption ui:font-normal ui:leading-caption ui:tracking-caption",
      "label-md":
        "ui:font-body ui:text-label-md ui:font-medium ui:leading-body",
      "label-sm":
        "ui:font-body ui:text-label-sm ui:font-medium ui:leading-body",
      "label-xs":
        "ui:font-body ui:text-label-xs ui:font-medium ui:leading-body",
    },
    tone: {
      default: "ui:text-ui-fg",
      muted: "ui:text-ui-fg-muted",
      primary: "ui:text-ui-primary",
      secondary: "ui:text-ui-secondary",
      success: "ui:text-ui-secondary",
      accent: "ui:text-ui-accent",
      warning: "ui:text-ui-accent",
      inverse: "ui:text-ui-bg",
    },
    truncate: {
      true: "ui:truncate",
    },
    uppercase: {
      true: "ui:uppercase",
    },
  },
  defaultVariants: {
    variant: "body-md",
    tone: "default",
  },
});

export type TextVariant = NonNullable<
  VariantProps<typeof textVariants>["variant"]
>;

export type TextTone = NonNullable<VariantProps<typeof textVariants>["tone"]>;
export type TextUppercase = NonNullable<
  VariantProps<typeof textVariants>["uppercase"]
>;

type TextTag =
  | "p"
  | "span"
  | "div"
  | "label"
  | "span"
  | "strong"
  | "em"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: TextTag;
  responsive?: ResponsiveProp<VariantProps<typeof textVariants>>;
}

/**
 * Text
 * Renders semantic typography primitives with Phoenix UI tokens.
 *
 * Behavior:
 * - Uses `variant` and `tone` to select base typography classes.
 * - Chooses a semantic default HTML tag from the selected `variant`.
 * - Allows explicit tag override through `as`.
 * - Accepts optional responsive overrides per breakpoint (`sm`/`md`/`lg`) for
 *   `variant`, `tone`, `truncate`, and `uppercase`.
 */
export function Text({
  as,
  variant = "body-md",
  tone = "default",
  uppercase,
  truncate,
  className,
  responsive,
  ...props
}: TextProps) {
  const v = variant ?? "body-md";
  const Tag = (as ?? defaultTagForVariant(v)) as React.ElementType;
  const classes = [];

  classes.push(textVariants({ variant: v, tone, truncate, uppercase }));
  if (responsive) {
    const responsiveMap = (Object.keys(responsive) as Breakpoint[]).reduce(
      (acc, bp) => {
        const spec = responsive[bp];
        const responsiveVariants = textVariants({
          variant: spec?.variant,
          tone: spec?.tone,
          truncate: spec?.truncate,
          uppercase: spec?.uppercase,
        });
        const responsiveClassArr = responsiveVariants.split(" ");
        acc[bp] = responsiveClassArr;
        return acc;
      },
      {} as ResponsiveProp<string[]>,
    );
    classes.push(responsiveClass(responsiveMap));
  }

  const styles = classes.join(" ");
  return <Tag className={cn(styles, className)} {...props} />;
}

function defaultTagForVariant(v?: TextVariant): React.ElementType {
  switch (v) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "label-md":
    case "label-sm":
    case "label-xs":
      return "label";
    case "caption":
      return "span";
    default:
      return "p";
  }
}
