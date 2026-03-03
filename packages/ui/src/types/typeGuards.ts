// Button guard
import type { ButtonProps } from "../components/Button/Button";
import { LIA_ICONS } from "../components/Icons/IconNames";
import type { IconVariant } from "../components/Icons/Icon";

const buttonSizes = new Set(["sm", "md", "lg"]);
const buttonVariants = new Set(["primary", "secondary", "ghost"]);

export function isButtonProps(value: unknown): value is ButtonProps {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<ButtonProps>;

  return (
    typeof v.label === "string" &&
    (v.size === undefined || buttonSizes.has(v.size)) &&
    (v.variant === undefined || v.variant === null || buttonVariants.has(v.variant)) &&
    (v.disabled === undefined || typeof v.disabled === "boolean") &&
    (v.onClick === undefined || typeof v.onClick === "function")
  );
}

export function isIconVariant(value: unknown): value is IconVariant {
  if (typeof value === "function") {
    return true;
  }
  if (typeof value === "string") {
    return value in LIA_ICONS;
  }
  return false;
}
