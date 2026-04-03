import { cva, type VariantProps } from "class-variance-authority";
import { Icon, type IconVariant } from "../Icons/Icon";
import { Stack, type StackDirection } from "../Stack/Stack";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { cn } from "../../utlis/cn";
import { createRequiredContext } from "../../utlis/createRequiredContext";
import { Text, type TextVariant } from "../Text";
import { RadioInput, type RadioInputVariant } from "./RadioInput";

const cardContainerVariant = cva("ui:rounded-md ui:border ui:cursor-pointer", {
  variants: {
    size: {
      sm: "ui:p-2",
      md: "ui:p-3",
      lg: "ui:p-4",
    },
    variant: {
      solid:
        "ui:border-ui-border ui:bg-ui-surface ui:text-ui-fg ui:selected:border-ui-primary ui:selected:bg-ui-primary ui:selected:text-ui-fg-surface ui:hover:not-selected:border-ui-primary/40 ui:hover:not-selected:bg-ui-primary/40",
      subtle:
        "ui:border-transparent ui:bg-ui-secondary/10 ui:text-ui-fg ui:selected:bg-ui-primary/40 ui:selected:text-ui-primary ui:hover:not-selected:bg-ui-primary/20",
      outline:
        "ui:bg-transparent ui:border-ui-border ui:text-ui-fg ui:selected:border-ui-primary ui:hover:not-selected:border-ui-primary/40",
      surface:
        "ui:border-ui-border ui:bg-transparent ui:text-ui-fg ui:selected:border-ui-primary/20 ui:selected:bg-ui-primary/20 ui:selected:text-ui-primary ui:hover:not-selected:border-ui-primary/20",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

export type RadioCardContainerSize = NonNullable<
  VariantProps<typeof cardContainerVariant>
>["size"];
export type RadioCardContainerVariant = NonNullable<
  VariantProps<typeof cardContainerVariant>
>["variant"];

type RadioCardContextType = RadioCardProps;

const [RadioCardContext, useRadioCardContext] =
  createRequiredContext<RadioCardContextType>(
    "useRadioCardContext must be used within a RadioCard Component",
);

export interface RadioCardProps {
  icon?: IconVariant;
  label: string;
  id: string;
  radioIndicator?: boolean;
  description?: string;
  direction?: StackDirection;
  size?: RadioCardContainerSize;
  variant?: RadioCardContainerVariant;
  onClick?: (radioCardItemId: string) => void;
  responsive?: ResponsiveProp<RadioCardContainerSize>;
  selected: boolean;
  className?: string;
}

function RadioCardComponent({
  icon,
  label,
  id,
  radioIndicator,
  description,
  direction,
  size,
  variant,
  responsive,
  onClick,
  selected,
  className,
}: RadioCardProps) {
  const [active, setActive] = useState(selected);
  const cardStyle = useResponsiveVariantClass({
    variants: cardContainerVariant,
    base: {
      size,
      variant,
    },
    responsive,
    toVariantProps: (responsiveSize?: RadioCardContainerSize) => ({
      size: responsiveSize,
    }),
  });

  useEffect(() => {
    setActive(selected);
  }, [selected]);

  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [onClick]);

  return (
    <RadioCardContext.Provider
      value={{
        icon,
        label,
        id,
        radioIndicator,
        direction,
        description,
        size,
        variant,
        responsive,
        onClick,
        selected: active,
        className,
      }}
    >
      <div
        data-selected={selected ? "true" : "false"}
        className={cn(cardStyle, className)}
        onClick={handleOnClick}
      >
        <Stack
          gap={"sm"}
          direction={direction}
          mainAxisAlignment={"spaceBetween"}
          crossAxisAlignment={"center"}
        >
          {icon && <Icon icon={icon} color={"inherit"} size={"lg"} />}
          <RadioCardComponent.Label />
          {radioIndicator && <RadioCardComponent.RadioIndicator />}
        </Stack>
      </div>
    </RadioCardContext.Provider>
  );
}

RadioCardComponent.Label = function RadioCardLabel() {
  const context = useRadioCardContext();
  const { label, description, size } = context;

  const textSize = {
    sm: "label-xs",
    md: "label-sm",
    lg: "label-md",
  };
  return (
    <Stack gap="xs" direction={"vertical"}>
      <Text
        variant={textSize[size ?? "md"] as TextVariant}
        tone={"inherit"}
        weight={"semibold"}
        className="ui:cursor-pointer"
      >
        {label}
      </Text>
      {description && <Text variant={"body-sm"} tone={"muted"} />}
    </Stack>
  );
};

RadioCardComponent.RadioIndicator = function RadioIndicator() {
  const context = useRadioCardContext();
  const { variant, size, id, selected } = context;
  const [indicatorVariant, setIndidicatorVariant] =
    useState<RadioInputVariant>("outline");

  useEffect(() => {
    switch (variant) {
      case "surface":
        setIndidicatorVariant("solid");
        break;
      case "outline":
        setIndidicatorVariant("solid");
        break;
      case "solid":
        setIndidicatorVariant("outline");
        break;
      case "subtle":
        setIndidicatorVariant("outline");
        break;
      default:
        setIndidicatorVariant("outline");
    }
  });

  return (
    <div className="ui:relative ui:z-20">
      <RadioInput
        value={id}
        size={size}
        checked={selected}
        variant={indicatorVariant}
      />
    </div>
  );
};

export const RadioCard = memo(RadioCardComponent);
