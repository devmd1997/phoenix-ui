import { cva, type VariantProps } from "class-variance-authority";
import type { Breakpoint, ResponsiveProp } from "../../types";
import { responsiveClass } from "../../utlis/responsive";
import { useOnHover } from "../../hooks";
import { createContext, memo, useCallback, useContext, useMemo } from "react";
import { Icon } from "../Icons";
import type { IconVariant } from "../Icons/Icon";

const buttonVariants = cva(
  "ui:flex ui:justify-center ui:items-center ui:rounded-md ui:font-semibold ui:font-body ui:tracking-button ui:cursor-pointer",
  {
    variants: {
      size: {
        sm: "ui:text-label-xs ui:py-1 ui:px-2 ui:gap-2",
        md: "ui:text-label-sm ui:py-1.5 ui:px-3 ui:gap-3",
        lg: "ui:text-label-md ui:py-2 ui:px-4 ui:gap-4",
      },
      variant: {
        primary: "",
        secondary: "",
        callToAction: "",
      },
      type: {
        default: "",
        ghost: "ui:border-2 ui:bg-transparent",
        link: "ui:border-none ui:bg-none ui:underline ui:text-ui-accent",
      },
      disabled: {
        false: "",
        true: "ui:cursor-not-allowed ui:text-ui-fg-muted",
      },
    },
    compoundVariants: [
      {
        type: "default",
        variant: "primary",
        disabled: false,
        className:
          "ui:bg-ui-primary ui:hover:shadow-ring ui:hover:shadow-ui-primary/75 ui:hover:bg-hover ui:border-ui-primary ui:text-white",
      },
      {
        type: "default",
        variant: "secondary",
        disabled: false,
        className:
          "ui:bg-ui-button-secondary ui:hover:bg-ui-button-secondary/90 ui:text-ui-fg-surface",
      },
      {
        variant: "callToAction",
        size: ["sm", "md", "lg"],
        className: "ui:text-label-cta ui:py-2.5 ui:px-5",
      },
      {
        type: "default",
        variant: "callToAction",
        disabled: false,

        className:
          "ui:bg-linear-to-r/increasing ui:from-ui-accent ui:via-ui-primary ui:to-ui-secondary ui:text-ui-bg",
      },
      {
        type: "default",
        disabled: true,
        className: "ui:bg-ui-disabled",
      },
      {
        type: "ghost",
        variant: "primary",
        disabled: false,
        className:
          "ui:border-ui-primary ui:text-ui-primary ui:hover:text-white ui:hover:bg-ui-primary",
      },
      {
        type: "ghost",
        variant: "secondary",
        disabled: false,
        className:
          "ui:border-ui-accent ui:text-ui-accent ui:hover:bg-ui-accent ui:hover:text-white",
      },
      {
        type: "ghost",
        variant: "callToAction",
        disabled: false,
        className: "phx-cta-ghost",
      },
      {
        type: "ghost",
        variant: ["primary", "secondary", "callToAction"],
        disabled: true,
        className:
          "ui:border-ui-fg-muted ui:text-ui-fg-muted ui:bg-transparent",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "secondary",
      type: "default",
    },
  },
);

export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

export type ButtonType = NonNullable<
  VariantProps<typeof buttonVariants>["type"]
>;

export type ButtonDisabled = NonNullable<
  VariantProps<typeof buttonVariants>["disabled"]
>;

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  iconLeft?: IconVariant;
  iconRight?: IconVariant;
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
  onHover?: (active: boolean) => void;
  responsive?: ResponsiveProp<ButtonSize>;
}

type ButtonContext = {
  iconLeft?: IconVariant;
  iconRight?: IconVariant;
  responsive?: ResponsiveProp<ButtonSize>;
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  defaultStyle: VariantProps<typeof buttonVariants>;
};
const ButtonContext = createContext<ButtonContext | undefined>(undefined);

function useButtonContext() {
  const context = useContext(ButtonContext);
  if (context === undefined) {
    throw new Error("useButtonContext must be used within a Button");
  }
  return context;
}

function ButtonComponent({
  label,
  iconLeft,
  iconRight,
  onClick,
  onHover,
  responsive,
  disabled = false,
  ...props
}: ButtonProps) {
  const { hoverHandlers } = useOnHover(onHover);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const styles = useMemo(() => {
    const classes: string[] = [];
    classes.push(buttonVariants({ ...props, disabled }));

    if (responsive) {
      const responsiveMap = (Object.keys(responsive) as Breakpoint[]).reduce(
        (acc, bp) => {
          const spec = responsive[bp];
          const responsiveSize = buttonVariants({ size: spec });
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
    <ButtonContext.Provider
      value={{ iconLeft, iconRight, responsive, disabled, defaultStyle: props }}
    >
      <button
        disabled={disabled}
        className={styles}
        onClick={handleClick}
        onMouseEnter={hoverHandlers.onMouseEnter}
        onMouseLeave={hoverHandlers.onMouseLeave}
      >
        <ButtonComponent.IconLeft />
        {label}
        <ButtonComponent.IconRight />
      </button>
    </ButtonContext.Provider>
  );
}

export const Button = memo(ButtonComponent);
Button.displayName = "Button";

ButtonComponent.IconLeft = function IconLeft() {
  const context = useButtonContext();

  return (
    context.iconLeft && (
      <Icon
        icon={context.iconLeft}
        size={context.defaultStyle.size}
        color={"inherit"}
        responsive={context.responsive}
      />
    )
  );
};

ButtonComponent.IconRight = function IconRight() {
  const context = useButtonContext();

  return (
    context.iconRight && (
      <Icon
        icon={context.iconRight}
        size={context.defaultStyle.size}
        color={"inherit"}
        responsive={context.responsive}
      />
    )
  );
};
