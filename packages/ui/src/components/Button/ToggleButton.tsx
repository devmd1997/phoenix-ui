import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { memo, useCallback, useState } from "react";

const toggleButtonVariants = cva("ui:group ui:rounded-full ui:flex ui:border", {
  variants: {
    size: {
      sm: "ui:p-1 ui:w-10",
      md: "ui:p-1.5 ui:w-12",
      lg: "ui:p-2 ui:w-15",
    },
    state: {
      default:
        "ui:border-ui-border ui:bg-ui-bg ui:toggled:bg-ui-primary ui:cursor-pointer",
      disabled:
        "ui:border-ui-disabled ui:bg-ui-bg ui:toggled:bg-ui-disabled/25",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

export type ToggleButtonSize = NonNullable<
  VariantProps<typeof toggleButtonVariants>
>["size"];
export type ToggleButtonState = NonNullable<
  VariantProps<typeof toggleButtonVariants>
>["state"];

export interface ToggleButtonProps {
  toggled?: boolean;
  onToggled?: (toggled: boolean) => void;
  disabled?: boolean;
  size?: ToggleButtonSize;
  responsive?: ResponsiveProp<ToggleButtonSize>;
}

function ToggleButtonComponent({
  toggled,
  onToggled,
  disabled,
  size,
  responsive,
}: ToggleButtonProps) {
  const [active, setActive] = useState(toggled ?? false);

  const handleToggle = useCallback(() => {
    setActive((prevToggle) => {
      if (onToggled) {
        onToggled(!prevToggle);
      }
      return !prevToggle;
    });
  }, [onToggled, setActive]);

  const styles = useResponsiveVariantClass({
    variants: toggleButtonVariants,
    base: {
      state: disabled ? "disabled" : "default",
      size,
    },
    responsive,
    toVariantProps: (responsiveSize: ToggleButtonSize) => ({
      size: responsiveSize,
    }),
  });

  const toggleSize = {
    sm: {
      wrapper: "ui:h-4",
      toggleBtn: "ui:size-4",
    },
    md: { wrapper: "ui:h-5", toggleBtn: "ui:size-5" },
    lg: { wrapper: "ui:h-6", toggleBtn: "ui:size-6" },
  };

  return (
    <button
      disabled={disabled}
      data-toggled={`${active}`}
      className={styles}
      onClick={handleToggle}
    >
      <div
        className={`${toggleSize[size ?? "md"].wrapper} ui:w-full ui:relative`}
      >
        <div
          className={`phx-toggle-button ${toggleSize[size ?? "md"].toggleBtn}`}
        />
      </div>
    </button>
  );
}

export const ToggleButton = memo(ToggleButtonComponent);
ToggleButton.displayName = "ToggleButton";
