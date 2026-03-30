import { cva, type VariantProps } from "class-variance-authority";
import { useFormFieldContext } from "../Form/FormField";
import { memo, useCallback, useId, useRef } from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import type { ResponsiveProp } from "../../types";
import { Stack } from "../Stack";
import { Text } from "../Text";
import { cn } from "../../utlis/cn";

const radioInputVariants = cva(
  "ui:border-2 ui:appearance-none ui:shrink-0 ui:w-5 ui:h-5 ui:rounded-full ui:focus:outline-none ui:focus:ring-offset-0 ui:focus:ring-4",
  {
    variants: {
      size: {
        sm: "ui:scale-75",
        md: "ui:scale-100",
        lg: "ui:scale-125",
      },
      variant: {
        solid:
          "ui:bg-none ui:border-ui-border ui:checked:bg-ui-primary ui:checked:border-ui-primary ui:checked:disabled:bg-ui-disabled ui:checked:disabled:border-ui-disabled ui:focus:ring-ui-primary/60",
        outline:
          "ui:bg-none ui:border-ui-border ui:checked:border-ui-primary ui:checked:bg-white ui:disabled:border-ui-disabled ui:focus:ring-ui-primary/60",
        subtle:
          "ui:bg-ui-primary/40 ui:border-transparent ui:disabled:bg-ui-disabled/40 ui:focus:ring-ui-primary/80",
      },
      disabled: {
        false: "ui:cursor-pointer",
        true: "ui:cursor-not-allowed",
      },
      defaultVaraints: {
        size: "md",
        state: "default",
        variant: "outline",
      },
    },
  },
);

const radioInnerCircleVariants = cva(
  "ui:relative ui:z-10 ui:cursor-pointer ui:peer-disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        solid: "ui:bg-none ui:peer-checked:bg-ui-surface",
        outline:
          "ui:bg-none ui:peer-checked:bg-ui-primary ui:peer-checked:peer-disabled:bg-ui-disabled",
        subtle:
          "ui:bg-none ui:peer-checked:bg-ui-primary ui:peer-checked:peer-disabled:bg-ui-disabled",
      },
    },
  },
);

export type RadioInputSize = NonNullable<
  VariantProps<typeof radioInputVariants>
>["size"];

export type RadioInputState = NonNullable<
  VariantProps<typeof radioInputVariants>
>["disabled"];

export type RadioInputVariant = NonNullable<
  VariantProps<typeof radioInputVariants>
>["variant"];
/**
 * Props for `RadioInput`, a token-driven radio control with optional label and description.
 *
 * This component can be used:
 * - as a standalone controlled radio
 * - as an option inside a higher-level `RadioGroup` that owns selected value
 *
 * Example (standalone controlled):
 * ```tsx
 * const [selected, setSelected] = useState("email");
 *
 * <RadioInput
 *   value="email"
 *   checked={selected === "email"}
 *   onChange={setSelected}
 *   label="Email"
 *   description="Receive updates by email."
 * />
 * ```
 *
 * Example (inside a group-like mapping):
 * ```tsx
 * const [selected, setSelected] = useState("monthly");
 *
 * {["monthly", "yearly"].map((plan) => (
 *   <RadioInput
 *     key={plan}
 *     value={plan}
 *     checked={selected === plan}
 *     onChange={setSelected}
 *     label={plan}
 *   />
 * ))}
 * ```
 */
export interface RadioInputProps {
  className?: string;
  /** Option value emitted by `onChange` when selected. */
  value: string;
  /** Controlled checked state for this option. */
  checked?: boolean;
  /** Optional primary label shown beside the radio control. */
  label?: string;
  /** Optional supporting text rendered below the label. */
  description?: string;
  /** Token-based visual size for the radio control. */
  size?: RadioInputSize;
  /** Disables interaction for this option. */
  disabled?: boolean;
  /** Called with this option's `value` when the user selects it. */
  onChange?: (value: string) => void;
  /** Breakpoint overrides for `size` using responsive token variants. */
  responsive?: ResponsiveProp<RadioInputSize>;
  variant?: RadioInputVariant;
}

/**
 * `RadioInputComponent` renders:
 * - a native `input[type="radio"]` for semantics and form behavior
 * - context-aware disabled styling from `FormField` when available
 * - optional label and description text content
 */
function RadioInputComponent({
  value,
  checked,
  label,
  description,
  size,
  disabled,
  responsive,
  onChange,
  className,
  variant,
}: RadioInputProps) {
  const formFieldContext = useFormFieldContext();
  const isDisabled = disabled || formFieldContext?.disabled;
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnChange = useCallback(() => {
    if (onChange) {
      if (!isDisabled) {
        onChange(inputRef.current!.value);
      }
    }
  }, [onChange, isDisabled]);

  const styles = useResponsiveVariantClass({
    variants: radioInputVariants,
    base: {
      disabled: isDisabled,
      size,
      variant,
    },
    responsive,
    toVariantProps: (responsiveSize: RadioInputSize) => ({
      size: responsiveSize,
    }),
  });

  const innerCircleStyle = radioInnerCircleVariants({ variant });

  const labelSize = (radioSize?: RadioInputSize) => {
    switch (radioSize) {
      case "sm":
        return "label-xs";
      case "md":
        return "label-sm";
      case "lg":
        return "label-md";
    }
  };

  const radioCircleSize = (radioSize?: RadioInputSize) =>
    radioSize === "lg" ? "ui:scale-125" : "";

  return (
    <div className={className} onClick={handleOnChange}>
      <Stack
        direction="horizontal"
        gap="sm"
        spacing={{ p: "sm" }}
        crossAxisAlignment="center"
      >
        <div className="ui:grid ui:place-items-center ui:mt-1">
          <input
            id={inputId}
            ref={inputRef}
            type="radio"
            value={value}
            checked={checked}
            disabled={disabled || formFieldContext?.disabled}
            className={cn(`ui:peer ui:col-start-1 ui:row-start-1`, styles)}
          />
          <div
            className={`phx-radio-inner-circle ${innerCircleStyle} ${radioCircleSize(size)}`}
          />
        </div>
        <Stack direction="vertical" gap="sm" spacing={{ p: "sm" }}>
          {label && (
            <Text
              as="label"
              variant={labelSize(size)}
              tone="default"
              responsive={{
                md: {
                  variant: labelSize(size),
                },
                lg: {
                  variant: labelSize(size),
                },
              }}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text as="p" variant={"body-sm"} tone={"muted"}>
              {description}
            </Text>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

export const RadioInput = memo(RadioInputComponent);
RadioInput.displayName = "RadioInput";
