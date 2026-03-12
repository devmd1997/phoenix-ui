import { useCallback } from "react";
import { useOnHover } from "../../hooks";
import { Icon, type IconVariant } from "../Icons/Icon";
import { buttonVariants, type ButtonVariantType } from "./Button";

export interface IconButtonProps extends ButtonVariantType {
  icon: IconVariant;
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

export function IconButton({
  icon,
  onClick,
  onHover,
  disabled,
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
      className={style}
      onClick={handleClick}
      onMouseLeave={hoverHandlers.onMouseEnter}
      onMouseEnter={hoverHandlers.onMouseEnter}
      disabled={disabled}
    >
      <Icon icon={icon} size={styleProps.size} color={"inherit"} />
    </button>
  );
}
