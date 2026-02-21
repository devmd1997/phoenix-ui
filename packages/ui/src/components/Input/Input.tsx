import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import { memo, useCallback, type ForwardedRef } from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { useFormFieldContext } from "../Form/FormField";

const inputVariants = cva(
  "ui:rounded-lg ui:flex ui:justify-between ui:placeholder:text-ui-fg-muted ui:overflow-hidden",
  {
    variants: {
      state: {
        default:
          "ui:bg-ui-bg ui:border ui:border-ui-border ui:focus-within:outline-ui-primary ui:text-ui-fg",
        error:
          "ui:bg-ui-error/25 ui:border-ui-error ui:focus-within:outline-ui-error ui:active:outline-ui-error ui:text-ui-error",
        success:
          "ui:bg-ui-success/25 ui:border-ui-success ui:focus-within:outline-ui-success ui:active:outline-ui-success ui:text-ui-success",
      },
      size: {
        sm: "ui:w-50",
        md: "ui:w-75",
        lg: "ui:w-100",
        full: "ui:w-full",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
      disabled: false,
    },
    compoundVariants: [
      {
        state: ["default", "error", "success"],
        disabled: true,
        className: "ui:bg-ui-disabled ui:text-ui-fg-muted ui:border-ui-border",
      },
    ],
  },
);

export type InputSize = NonNullable<VariantProps<typeof inputVariants>["size"]>;
type InputState = NonNullable<VariantProps<typeof inputVariants>["state"]>;
/**
 * Input props for the reusable base input primitive.
 *
 * This component is intentionally simple so it can be composed into
 * higher-level input fields (for example: search bars, form rows, or
 * custom validation wrappers).
 *
 * Prop typing:
 * - Visual style is token-driven through CVA `variant` and `size`.
 * - `responsive` allows breakpoint-specific `size` overrides.
 * - `value`, `onChange`, `onFocus`, and `onBlur` provide controlled input behavior.
 * - `prefix` and `suffix` allow optional leading/trailing adornments.
 * - `type` forwards the native input type.
 */
export interface InputProps {
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  size?: InputSize;
  ref?: ForwardedRef<HTMLInputElement>;
  responsive?: ResponsiveProp<InputSize>;
}

/**
 * Input
 * A lightweight, reusable input primitive that applies Phoenix UI variants
 * and responsive size classes, while exposing controlled input handlers.
 *
 * Example:
 * ```tsx
 * <Input
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   onFocus={() => {}}
 *   onBlur={() => {}}
 *   placeholder="Email"
 *   variant="default"
 *   size="md"
 *   responsive={{ lg: "full" }}
 * />
 * ```
 */
function InputComponent({
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  responsive,
  prefix,
  suffix,
  type,
  size,
  ref,
}: InputProps) {
  const formFieldContext = useFormFieldContext();
  const inputStateStyle = getInputStateStyle(formFieldContext);

  const handleFocus = useCallback(() => {
    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  const styles = useResponsiveVariantClass({
    variants: inputVariants,
    base: {
      state: inputStateStyle,
      size,
      disabled: formFieldContext?.disabled,
    },
    responsive,
    toVariantProps: (
      responsiveSize: VariantProps<typeof inputVariants>["size"],
      _base,
    ) => ({ size: responsiveSize ?? undefined }),
  });

  return (
    <div className={styles}>
      {prefix}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="phx-input"
        required={!!formFieldContext?.required}
      />
      {suffix}
    </div>
  );
}

function getInputStateStyle(
  context: ReturnType<typeof useFormFieldContext>,
): InputState {
  if (!context) {
    return "default";
  }
  if (context.error) {
    return "error";
  }
  if (context.success) {
    return "success";
  }
  return "default";
}

export const Input = memo(InputComponent);
Input.displayName = "Input";
