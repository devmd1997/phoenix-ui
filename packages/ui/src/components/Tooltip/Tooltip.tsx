import { useState } from "react";
import type { ButtonVariant } from "../Button/Button";
import { Popover, type PopoverProps } from "../Popover";
import { IconButton } from "../Button";
import type { IconVariant } from "../Icons/Icon";

export interface ToolTipProps extends Omit<
  PopoverProps,
  "visible" | "onVisible" | "manualClose"
> {
  variant?: Extract<ButtonVariant, "danger" | "success" | "info" | "secondary">;
}

export function ToolTip({ variant = "secondary", ...props }: ToolTipProps) {
  const [popOverVisible, setPopoverVisible] = useState(false);

  const icon: Record<typeof variant, IconVariant> = {
    info: "info",
    danger: "warning",
    success: "success",
    secondary: "ellipsisVertical",
  };
  return (
    <Popover
      {...props}
      visible={popOverVisible}
      onVisible={setPopoverVisible}
      manualClose
    >
      <IconButton
        variant={"ghost"}
        intent={variant}
        icon={icon[variant]}
        size={"md"}
        onClick={() => setPopoverVisible(!popOverVisible)}
      />
    </Popover>
  );
}
