import { cva, type VariantProps } from "class-variance-authority";
import type { Breakpoint, ResponsiveProp } from "../../types";
import { responsiveClass } from "../../utlis/responsive";
import { cn } from "../../utlis/cn";
import { createRequiredContext } from "../../utlis/createRequiredContext";
import { useOnHover } from "../../hooks";
import { memo, useCallback, useMemo } from "react";
import { Icon } from "../Icons";
import type { IconVariant } from "../Icons/Icon";

export const buttonVariants = cva(
  "ui:flex ui:justify-center ui:items-center ui:font-medium ui:font-body ui:tracking-button",
  {
    variants: {
      size: {
        sm: "ui:text-label-xs ui:py-1 ui:px-2 ui:gap-2",
        md: "ui:text-label-sm ui:py-1.5 ui:px-3 ui:gap-3",
        lg: "ui:text-label-md ui:py-2 ui:px-4 ui:gap-4",
      },
      intent: {
        primary: "",
        secondary: "",
        callToAction: "",
        danger: "",
        success: "",
        info: "",
      },
      variant: {
        solid: "",
        outline: "",
        subtle: "",
        surface: "",
        ghost: "",
        plain: "",
      },
      disabled: {
        false: "ui:cursor-pointer",
        true: "ui:cursor-not-allowed ui:relative ui:after:content-[''] ui:after:absolute ui:after:-inset-0.5 ui:after:rounded-[inherit] ui:after:bg-white/50",
      },
      corners: {
        rounded: "ui:rounded-sm",
        none: "ui:rounded-none",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        intent: "primary",
        className: "ui:button-solid-ui-primary",
      },
      {
        variant: "solid",
        intent: "secondary",

        className: "ui:button-solid-ui-button-secondary",
      },
      {
        variant: "solid",
        intent: "danger",

        className: "ui:button-solid-ui-error",
      },
      {
        variant: "solid",
        intent: "success",

        className: "ui:button-solid-ui-success",
      },
      {
        variant: "solid",
        intent: "info",

        className: "ui:button-solid-ui-info",
      },
      {
        intent: "callToAction",
        size: ["sm", "md", "lg"],
        className: "ui:text-label-cta ui:py-2.5 ui:px-5",
      },
      {
        variant: "solid",
        intent: "callToAction",

        className:
          "ui:bg-linear-to-r/increasing ui:from-ui-button-secondary ui:via-ui-primary ui:to-ui-secondary ui:text-ui-bg",
      },
      {
        variant: "outline",
        intent: "callToAction",

        className: "phx-cta-ghost",
      },
      {
        variant: "outline",
        intent: ["primary", "secondary", "callToAction"],
        disabled: true,
        className:
          "ui:border-ui-fg-muted ui:text-ui-fg-muted ui:bg-transparent",
      },
      {
        variant: "subtle",
        intent: "primary",

        className: "ui:button-subtle-ui-primary",
      },
      {
        variant: "subtle",
        intent: "secondary",

        className: "ui:button-subtle-ui-button-secondary",
      },
      {
        variant: "subtle",
        intent: "danger",

        className: "ui:button-subtle-ui-error",
      },
      {
        variant: "subtle",
        intent: "success",

        className: "ui:button-subtle-ui-success",
      },
      {
        variant: "subtle",
        intent: "info",

        className: "ui:button-subtle-ui-info",
      },
      {
        variant: "surface",
        intent: "primary",

        className: "ui:button-surface-ui-primary",
      },
      {
        variant: "surface",
        intent: "secondary",

        className: "ui:button-surface-ui-button-secondary",
      },
      {
        variant: "surface",
        intent: "danger",

        className: "ui:button-surface-ui-error",
      },
      {
        variant: "surface",
        intent: "success",

        className: "ui:button-surface-ui-success",
      },
      {
        variant: "surface",
        intent: "info",

        className: "ui:button-surface-ui-info",
      },
      {
        variant: "outline",
        intent: "primary",

        className: "ui:button-outline-ui-primary",
      },
      {
        variant: "outline",
        intent: "secondary",

        className: "ui:button-outline-ui-button-secondary",
      },
      {
        variant: "outline",
        intent: "danger",

        className: "ui:button-outline-ui-error",
      },
      {
        variant: "outline",
        intent: "success",

        className: "ui:button-outline-ui-success",
      },
      {
        variant: "outline",
        intent: "info",

        className: "ui:button-outline-ui-info",
      },
      {
        variant: "ghost",
        intent: "primary",

        className: "ui:button-ghost-ui-primary",
      },
      {
        variant: "ghost",
        intent: "secondary",

        className: "ui:button-ghost-ui-button-secondary",
      },
      {
        variant: "ghost",
        intent: "danger",

        className: "ui:button-ghost-ui-error",
      },
      {
        variant: "ghost",
        intent: "success",

        className: "ui:button-ghost-ui-success",
      },
      {
        variant: "ghost",
        intent: "info",

        className: "ui:button-ghost-ui-info",
      },
      {
        variant: "plain",
        intent: "primary",

        className: "ui:button-plain-ui-primary",
      },
      {
        variant: "plain",
        intent: "secondary",

        className: "ui:button-plain-ui-button-secondary",
      },
      {
        variant: "plain",
        intent: "danger",

        className: "ui:button-plain-ui-error",
      },
      {
        variant: "plain",
        intent: "success",

        className: "ui:button-plain-ui-success",
      },
      {
        variant: "plain",
        intent: "info",

        className: "ui:button-plain-ui-info",
      },
    ],
    defaultVariants: {
      size: "md",
      intent: "secondary",
      variant: "solid",
      corners: "rounded",
    },
  },
);

export type ButtonVariantType = NonNullable<
  VariantProps<typeof buttonVariants>
>;

export type ButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;

export type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>
>["intent"];

export type ButtonType = NonNullable<
  VariantProps<typeof buttonVariants>
>["variant"];

export type ButtonDisabled = NonNullable<
  VariantProps<typeof buttonVariants>["disabled"]
>;

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  className?: string;
  iconLeft?: IconVariant;
  iconRight?: IconVariant;
  disabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
  size?: ButtonSize;
  variant?: ButtonType;
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
const [ButtonContext, useButtonContext] = createRequiredContext<ButtonContext>(
  "useButtonContext must be used within a Button",
);

function ButtonComponent({
  label,
  iconLeft,
  iconRight,
  onClick,
  onHover,
  responsive,
  disabled = false,
  className,
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
  }, [disabled, props, responsive]);

  return (
    <ButtonContext.Provider
      value={{ iconLeft, iconRight, responsive, disabled, defaultStyle: props }}
    >
      <button
        disabled={disabled}
        className={cn(styles, className)}
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
