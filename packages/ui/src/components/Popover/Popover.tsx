import { cva, type VariantProps } from "class-variance-authority";
import {
  memo,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { ResponsiveProp } from "../../types";
import { Stack } from "../Stack";
import { useOnHover } from "../../hooks";
import { Icon } from "../Icons";
import { Text } from "../Text";

type PopoverPlacement = "top" | "bottom" | "left" | "right";

const popoverVariants = cva(
  "ui:absolute ui:z-popover ui:drop-shadow-sm ui:bg-ui-surface ui:transition ui:delay-150 ui:ease-in ui:rounded-sm",
  {
    variants: {
      size: {
        sm: "ui:w-min-w-40 ui:p-1",
        md: "ui:w-min-w-56 ui:p-2",
        lg: "ui:w-min-w-72 ui:p-3",
      },
      position: {
        top: "ui:bottom-[120%] ui:left-[50%] ui:-translate-x-1/2",
        bottom: "ui:top-[120%] ui:left-[50%] ui:-translate-x-1/2",
        left: "ui:right-[120%] ui:top-[50%] ui:-translate-y-1/2",
        right: "ui:left-[120%] ui:top-[50%] ui:-translate-y-1/2",
      },
      hidden: {
        true: "ui:hidden ui:opacity-0",
        false: "ui:visible ui:opacity-100",
      },
    },
    defaultVariants: {
      size: "sm",
      position: "top",
    },
  },
);

const caretPositionClasses = {
  top: "ui:absolute ui:z-popover-caret ui:-bottom-2.5 ui:left-1/2 ui:-translate-x-1/2 ui:text-ui-surface",
  bottom:
    "ui:absolute ui:z-popover-caret ui:-top-2.5 ui:left-1/2 ui:-translate-x-1/2 ui:text-ui-surface",
  left: "ui:absolute ui:z-popover-caret ui:-right-2.5 ui:top-1/2 ui:-translate-y-1/2 ui:text-ui-surface",
  right:
    "ui:absolute ui:z-popover-caret ui:-left-2.5 ui:top-1/2 ui:-translate-y-1/2 ui:text-ui-surface",
} as const satisfies Record<PopoverPlacement, string>;

const caretIcons = {
  top: "caretDownFilled",
  bottom: "caretUpFilled",
  left: "caretRightFilled",
  right: "caretLeftFilled",
} as const satisfies Record<
  PopoverPlacement,
  "caretDownFilled" | "caretUpFilled" | "caretRightFilled" | "caretLeftFilled"
>;

const popoverContentVariants = cva(
  "ui:font-body ui:text-ui-fg ui:w-max ui:max-w-40 ui:p-1",
  {
    variants: {
      size: {
        sm: "ui:text-label-xs",
        md: "ui:text-body-sm",
        lg: "ui:text-body-sm",
      },
    },
  },
);

export type PopoverSize = NonNullable<
  VariantProps<typeof popoverVariants>
>["size"];
export type PopoverPosition = NonNullable<
  VariantProps<typeof popoverVariants>
>["position"];

export interface PopoverProps extends PropsWithChildren {
  size?: PopoverSize;
  position?: PopoverPosition;
  visible?: boolean;
  onVisible?: (isVisible: boolean) => void;
  title?: string;
  description?: string;
  content: string;
  responsive?: ResponsiveProp<PopoverSize>;
  manualClose?: boolean;
}

function PopoverComponent({
  size,
  position,
  visible,
  onVisible,
  title,
  description,
  content,
  manualClose,
  children,
}: PopoverProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const resolvedPosition = position ?? "top";
  const popOverStyle = popoverVariants({
    size,
    position: resolvedPosition,
    hidden: !isVisible,
  });
  const popoverContentStyle = popoverContentVariants({ size });
  const caretPositionStyle = caretPositionClasses[resolvedPosition];
  const caretIcon = caretIcons[resolvedPosition];

  const handleVisibility = useCallback(
    (visible: boolean) => {
      setIsVisible(visible);
      if (onVisible) {
        onVisible(visible);
      }
    },
    [onVisible],
  );
  const { hoverHandlers } = useOnHover((isHover: boolean) => {
    if (isHover === true && !manualClose) {
      handleVisibility(true);
    } else {
      if (manualClose && isVisible) {
        handleVisibility(true);
      } else {
        handleVisibility(false);
      }
    }
  });

  useEffect(() => {
    if (visible !== undefined) {
      handleVisibility(visible);
    }
  }, [visible, handleVisibility]);

  return (
    <div className="ui:relative">
      <div className={`${popOverStyle}`}>
        <Stack gap={"xs"} direction={"vertical"} width={"full"}>
          {manualClose && (
            <div className="ui:w-full ui:flex ui:justify-end ui:items-center">
              <div
                className="ui:cursor-pointer"
                onClick={() => {
                  handleVisibility(false);
                }}
              >
                <Icon icon={"close"} color={"muted"} />
              </div>
            </div>
          )}
          {title && (
            <Text variant={"label-md"} weight={"bold"} as="span">
              {title}
            </Text>
          )}
          {description && (
            <Text variant={"body-sm"} weight={"default"} tone={"muted"}>
              {description}
            </Text>
          )}
          <p className={popoverContentStyle}>{content}</p>
        </Stack>
        <div className={caretPositionStyle}>
          <Icon icon={caretIcon} size={"md"} color={"inherit"} />
        </div>
      </div>
      <div
        onMouseEnter={hoverHandlers.onMouseEnter}
        onMouseLeave={hoverHandlers.onMouseLeave}
      >
        {children}
      </div>
    </div>
  );
}

export const Popover = memo(PopoverComponent);
