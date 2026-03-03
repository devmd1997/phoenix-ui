import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  type ForwardedRef,
} from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { useFormFieldContext } from "../Form/FormField";
import { type ButtonProps } from "../Button";
import { Text } from "../Text";
import { Icon, type IconVariant } from "../Icons/Icon";
import { isIconVariant } from "../../types/typeGuards";

const inputContainerVariants = cva(
  "ui:flex ui:justify-between ui:placeholder:text-ui-fg-muted ui:overflow-hidden",
  {
    variants: {
      state: {
        default:
          "ui:input-default ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-primary",
        error:
          "ui:input-error ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-error",
        success:
          "ui:input-success ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-success",
        disabled: "ui:input-disabled ui:cursor-not-allowed ui:text-ui-fg-muted",
      },
      surface: {
        outline: "ui:border ui:rounded-lg ui:focus-within:border-2",
        subtle: "ui:rounded-lg ui:focus-within:border-2",
        underline: "ui:border-b-2 ui:focus:border-b-2",
      },
    },
    defaultVariants: {
      state: "default",
      surface: "outline",
    },
    compoundVariants: [
      {
        state: ["default", "error", "success", "disabled"],
        surface: ["underline", "outline"],
        className: "ui:bg-none",
      },
      {
        state: "default",
        surface: "underline",
        className:
          "ui:hover:not-focus-within:border-b-2 ui:hover:not-focus-within:border-ui-primary/50",
      },
      {
        state: "default",
        surface: "outline",
        className:
          "ui:hover:not-focus-within:border ui:hover:not-focus-within:border-ui-primary/50",
      },
      {
        state: "default",
        surface: "subtle",
        className:
          "ui:bg-ui-bg ui:hover:not-focus-within:bg-ui-primary/25 ui:focus-within:bg-ui-primary/50",
      },
      {
        state: "default",
        surface: "subtle",
        className:
          "ui:hover:not-focus-within:border-2 ui:hover:not-focus-within:border-ui-primary/50",
      },
      {
        state: "error",
        surface: "subtle",
        className: "ui:bg-ui-error/25",
      },
      {
        state: "success",
        surface: "subtle",
        className: "ui:bg-ui-success/25",
      },
      {
        state: "disabled",
        surface: "subtle",
        className: "ui:bg-ui-disabled/25",
      },
    ],
  },
);

const inputComponentVariants = cva("", {
  variants: {
    size: {
      sm: "ui:input-width-sm",
      md: "ui:input-width-md",
      lg: "ui:input-width-lg",
    },
    width: {
      auto: "ui:w-auto",
      full: "ui:w-full",
    },
  },
  defaultVariants: {
    size: "md",
    width: "auto",
  },
});

export type InputSize = NonNullable<
  VariantProps<typeof inputComponentVariants>["size"]
>;
export type InputWidth = NonNullable<
  VariantProps<typeof inputComponentVariants>["width"]
>;

export type InputSurface = NonNullable<
  VariantProps<typeof inputContainerVariants>
>["surface"];
type InputState = NonNullable<
  VariantProps<typeof inputContainerVariants>["state"]
>;

type InputContextValue = {
  suffix?: InputAddOn;
  prefix?: InputAddOn;
  state?: InputState;
  size?: InputSize;
};

const InputContext = createContext<InputContextValue | undefined>(undefined);

function useInputContext() {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error("useInputContext must be used within an InputComponent");
  }
  return context;
}
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
  prefix,
  suffix,
  type,
  size,
  width,
  surface,
  ref,
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
    <InputContext.Provider value={{ suffix, prefix, size }}>
      <div className={containerStyle}>
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
    </InputContext.Provider>
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

type InputAddOn = IconVariant | string | ButtonProps | React.ReactNode;

InputComponent.InputSuffix = function InputSuffix() {
  const context = useInputContext();
  const { suffix } = context;
  if (!suffix) {
    return <></>;
  }
  if (isIconVariant(suffix)) {
    return (
      <span className="ui:flex ui:items-center ui:p-1">
        <Icon size={"md"} icon={suffix} />
      </span>
    );
  }
  if (typeof suffix === "string") {
    return (
      <div className="ui:flex ui:pr-3 ui:h-full ui:text-center ui:items-center">
        <Text as="span" variant={"label-md"} tone={"default"}>
          {suffix}
        </Text>
      </div>
    );
  } else {
    return <>{suffix}</>;
  }
};

InputComponent.InputPrefix = function InputPrefix() {
  const context = useInputContext();
  const { prefix } = context;
  if (!prefix) {
    return <></>;
  }
  if (isIconVariant(prefix)) {
    return (
      <span className="ui:flex ui:items-center ui:pl-3 ui:h-full">
        <Icon size={"md"} icon={prefix} />
      </span>
    );
  }
  if (typeof prefix === "string") {
    return (
      <div className="ui:flex ui:text-center ui:pl-3 ui:items-center ui:h-full">
        <Text as="span" variant={"label-md"} tone={"default"}>
          {prefix}
        </Text>
      </div>
    );
  } else {
    return <>{prefix}</>;
  }
};
