import { cva, type VariantProps } from "class-variance-authority";
import { IconContext } from "react-icons";
import type { IconType } from "react-icons";
import type { Breakpoint, ResponsiveProp } from "../../types";
import { memo, useMemo } from "react";
import { responsiveClass } from "../../utlis/responsive";
import { getIconByName, type IconName } from "./IconNames";

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "ui:icon-size-sm",
      md: "ui:icon-size-md",
      lg: "ui:icon-size-lg",
    },
    color: {
      default: "ui:text-ui-fg",
      muted: "ui:text-ui-fg-muted",
      surface: "ui:text-ui-surface",
      primary: "ui:text-ui-primary",
      secondary: "ui:text-ui-secondary",
      success: "ui:text-ui-secondary",
      accent: "ui:text-ui-accent",
      warning: "ui:text-ui-accent",
      inverse: "ui:text-ui-bg",
      inherit: "ui:text-inherit",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "default",
  },
});
export type IconVariant = IconType | IconName;
export type IconSize = NonNullable<VariantProps<typeof iconVariants>["size"]>;
export type IconColor = NonNullable<VariantProps<typeof iconVariants>["color"]>;
export interface IconProps extends VariantProps<typeof iconVariants> {
  icon: IconVariant;
  responsive?: ResponsiveProp<IconSize>;
}

function IconComponent({ icon, responsive, ...props }: IconProps) {
  const Glyph = getIconByName(icon);
  const styles = useMemo(() => {
    const classes: string[] = [];
    classes.push(iconVariants({ ...props }));

    if (responsive) {
      const responsiveMap = (Object.keys(responsive) as Breakpoint[]).reduce(
        (acc, bp) => {
          const spec = responsive[bp];
          const responsiveSize = iconVariants({ size: spec });
          const responsiveClassArr = responsiveSize.split(" ");
          acc[bp] = responsiveClassArr;
          return acc;
        },
        {} as ResponsiveProp<string[]>,
      );
      classes.push(responsiveClass(responsiveMap));
    }

    return classes.join(" ");
  }, [props, responsive]);

  return (
    <IconContext.Provider value={{ className: `${styles}` }}>
      <div>
        <Glyph />
      </div>
    </IconContext.Provider>
  );
}

export const Icon = memo(IconComponent);
Icon.displayName = "Icon";
