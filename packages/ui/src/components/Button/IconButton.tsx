import { useCallback } from "react";
import { useOnHover } from "../../hooks";
import { cn } from "../../utlis/cn";
import { Icon, type IconVariant } from "../Icons/Icon";
import { buttonVariants, type ButtonVariantType } from "./Button";

export interface IconButtonProps extends ButtonVariantType {
  className?: string;
  icon: IconVariant;
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

export function IconButton({
  icon,
  onClick,
  onHover,
  disabled = false,
  className,
  ...styleProps
}: IconButtonProps) {
  const { hoverHandlers } = useOnHover(onHover);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const style = buttonVariants({ ...styleProps, disabled: disabled });
  return (
    <button
      className={cn(style, className)}
      onClick={handleClick}
      onMouseLeave={hoverHandlers.onMouseEnter}
      onMouseEnter={hoverHandlers.onMouseEnter}
      disabled={disabled}
    >
      <Icon icon={icon} size={styleProps.size} color={"inherit"} />
    </button>
  );
}
