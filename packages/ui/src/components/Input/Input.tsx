import { type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import { memo, useCallback, type ForwardedRef } from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { useFormFieldContext } from "../Form/FormField";
import { Text } from "../Text";
import { Icon } from "../Icons/Icon";
import { isIconVariant } from "../../types/typeGuards";
import {
  createInputContainerCva,
  createInputDimensionCva,
} from "../../utlis/inputVariants";
import { cn } from "../../utlis/cn";
import {
  useInputGroupContext,
  type InputInlineElementType,
} from "./InputGroup";

const inputContainerVariants = createInputContainerCva(
  "ui:flex ui:justify-between ui:placeholder:text-ui-fg-muted ui:overflow-hidden",
  {
    compoundVariants: [
      {
        state: "error",
        surface: "outline",
        className: "ui:border-ui-error",
      },
      {
        state: "success",
        surface: "outline",
        className: "ui:border-ui-success",
      },
    ],
  },
);

const inputComponentVariants = createInputDimensionCva();

export type InputSize = NonNullable<
  VariantProps<typeof inputComponentVariants>["size"]
>;
export type InputWidth = NonNullable<
  VariantProps<typeof inputComponentVariants>["width"]
>;

export type InputSurface = NonNullable<
  VariantProps<typeof inputContainerVariants>
>["surface"];
export type InputState = NonNullable<
  VariantProps<typeof inputContainerVariants>["state"]
>;

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
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  disabled?: boolean;
  size?: InputSize;
  width?: InputWidth;
  surface?: InputSurface;
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
  disabled,
  type,
  size,
  width,
  surface,
  ref,
  className,
}: InputProps) {
  const formFieldContext = useFormFieldContext();
  const inputStateStyle = getInputStateStyle(formFieldContext, disabled);

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
  const containerStyle = inputContainerVariants({
    state: inputStateStyle,
    surface,
  });
  const styles = useResponsiveVariantClass({
    variants: inputComponentVariants,
    base: {
      size,
      width,
    },
    responsive,
    toVariantProps: (responsiveSize?: InputSize) => ({
      size: responsiveSize ?? undefined,
    }),
  });

  return (
    <div className={cn(containerStyle, className)}>
      <InputComponent.InputPrefix />
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={`phx-input ${styles}`}
        required={!!formFieldContext?.required}
        disabled={disabled}
      />
      <InputComponent.InputSuffix />
    </div>
  );
}

function getInputStateStyle(
  context: ReturnType<typeof useFormFieldContext>,
  isDisabled?: boolean,
): InputState {
  if (context?.disabled || isDisabled) {
    return "disabled";
  }
  if (context?.error) {
    return "error";
  }
  if (context?.success) {
    return "success";
  }
  return "default";
}

export const Input = memo(InputComponent);
Input.displayName = "Input";

function renderInputInlineElement(element?: InputInlineElementType) {
  if (!element) {
    return null;
  }
  if (isIconVariant(element)) {
    return (
      <span className="ui:flex ui:items-center ui:justify-center ui:p-2">
        <Icon size={"md"} icon={element} color={"muted"} />
      </span>
    );
  }
  if (typeof element === "string") {
    return (
      <div className="ui:flex ui:p-2 ui:h-full ui:text-center ui:items-center ui:justify-center">
        <Text as="span" variant={"label-md"} tone={"muted"}>
          {element}
        </Text>
      </div>
    );
  } else {
    return (
      <span className="ui:px-2 ui:py-1 ui:flex ui:items-center ui:justify-center">
        {element}
      </span>
    );
  }
}

InputComponent.InputSuffix = function InputSuffix() {
  const context = useInputGroupContext();
  const suffix = context?.inlineElement?.end;
  return renderInputInlineElement(suffix);
};

InputComponent.InputPrefix = function InputPrefix() {
  const context = useInputGroupContext();
  const prefix = context?.inlineElement?.start;
  return renderInputInlineElement(prefix);
};
