import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useState,
} from "react";
import { motion } from "framer-motion";
import { cn } from "../../utlis/cn";

const segmentControlGroupVariants = cva(
  "ui:flex ui:flex-row ui:justify-between ui:items-center ui:gap-1 ui:font-semibold ui:font-body ui:tracking-button ui:rounded-sm ui:px-2 ui:border ui:border-ui-border",
  {
    variants: {
      size: {
        sm: "ui:input-width-sm",
        md: "ui:input-width-md",
        lg: "ui:input-width-lg",
      },
      width: {
        auto: "ui:w-fit",
        full: "ui:w-full",
      },
      disabled: {
        true: "ui:bg-ui-disabled",
        false: "ui:bg-ui-bg",
      },
    },
    defaultVariants: {
      size: "md",
      width: "auto",
      disabled: false,
    },
  },
);

export type SegmentControlGroupSize = NonNullable<
  VariantProps<typeof segmentControlGroupVariants>
>["size"];
export type SegmentControlGroupWidth = NonNullable<
  VariantProps<typeof segmentControlGroupVariants>
>["width"];

export type SegmentControlItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SegmentControlContextValue = {
  handleInputChange: (value: string, index: number) => void;
  id: string;
  disabled?: boolean;
};

const SegmentControlContext = createContext<
  SegmentControlContextValue | undefined
>(undefined);

const useSegmentControlContext = () => {
  const context = useContext(SegmentControlContext);
  if (!context) {
    throw new Error(
      "segmentControlContext must be used within a SegemntControlGroup",
    );
  }
  return context;
};

export interface SegmentControlGroupProps {
  size?: SegmentControlGroupSize;
  width?: SegmentControlGroupWidth;
  onInputChange?: (value: string, index: number) => void;
  defaultActiveIndex?: number;
  disabled?: boolean;
  responsive?: ResponsiveProp<SegmentControlGroupSize>;
  items: SegmentControlItem[];
}

function SegmentControlGroupComponent({
  size,
  width,
  onInputChange,
  defaultActiveIndex,
  disabled,
  responsive,
  items,
}: SegmentControlGroupProps) {
  const [currentIndex, setCurrentIndex] = useState(defaultActiveIndex ?? 0);
  const id = useId();
  const style = useResponsiveVariantClass({
    variants: segmentControlGroupVariants,
    base: {
      size,
      width,
      disabled,
    },
    responsive,
    toVariantProps: (responsiveSize: SegmentControlGroupSize) => ({
      size: responsiveSize,
    }),
  });

  const handleInputChange = useCallback(
    (value: string, index: number) => {
      setCurrentIndex(index);
      if (onInputChange) {
        onInputChange(value, index);
      }
    },
    [onInputChange],
  );
  return (
    <SegmentControlContext.Provider value={{ handleInputChange, id, disabled }}>
      <div className={style}>
        {items.map((item, index) => (
          <SegmentControlGroupComponent.Item
            item={item}
            isActive={currentIndex === index}
            index={index}
            size={size}
            responsive={responsive}
          />
        ))}
      </div>
    </SegmentControlContext.Provider>
  );
}

const segmentItemVariants = cva(
  "ui:appearance-none ui:relative ui:w-full ui:flex ui:items-center ui:justify-center ui:rounded-sm",
  {
    variants: {
      size: {
        sm: "ui:text-label-xs ui:py-1 ui:px-2 ui:gap-2",
        md: "ui:text-label-sm ui:py-1.5 ui:px-3 ui:gap-3",
        lg: "ui:text-label-md ui:py-2 ui:px-4 ui:gap-4",
      },
      state: {
        default: "ui:cursor-pointer",
        disabled: "ui:cursor-not-allowed",
      },
      active: {
        true: "ui:text-ui-fg-surface",
        false: "ui:text-ui-fg ui:hover:text-ui-primary",
      },
    },
  },
);

type SegmentItemSize = NonNullable<
  VariantProps<typeof segmentItemVariants>
>["size"];
interface SegmentControlItemProps {
  size?: SegmentItemSize;
  item: SegmentControlItem;
  index: number;
  isActive: boolean;
  responsive?: ResponsiveProp<SegmentItemSize>;
}

SegmentControlGroupComponent.Item = function SegmentControlItem(
  props: SegmentControlItemProps,
) {
  const context = useSegmentControlContext();
  const isDisabled = props.item.disabled || context.disabled;
  const style = useResponsiveVariantClass({
    variants: segmentItemVariants,
    base: {
      size: props.size,
      state: isDisabled ? "disabled" : "default",
      active: props.isActive,
    },
    responsive: props.responsive,
    toVariantProps: (responsvieSize: SegmentItemSize) => ({
      size: responsvieSize,
    }),
  });

  return (
    <div
      className={style}
      onClick={() => {
        if (!isDisabled) {
          context.handleInputChange(props.item.value, props.index);
        }
      }}
    >
      {props.isActive && !isDisabled && (
        <motion.div
          layoutId={context.id}
          className={cn([
            "ui:bg-ui-primary",
            "ui:absolute",
            "ui:inset-0",
            "ui:rounded-sm",
          ])}
        />
      )}
      <span
        className={cn([
          !isDisabled ? "ui:text-inherit" : "ui:text-ui-fg-muted",
          "ui:relative",
          "ui:z-10",
          "ui:text-center",
        ])}
      >
        {props.item.label}
      </span>
    </div>
  );
};

export const SegmentControl = memo(SegmentControlGroupComponent);
SegmentControl.displayName = "SegmentControl";
