import { cva, type VariantProps } from "class-variance-authority";
import {
  useFormFieldContext,
  type FormFieldContextValue,
} from "../Form/FormField";
import { memo, useCallback } from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import type { ResponsiveProp } from "../../types";
import { Stack } from "../Stack";
import { Text } from "../Text";

const radioInputVariants = cva(
  "ui:border-2 ui:appearance-none ui:shrink-0 ui:w-5 ui:h-5 ui:rounded-full ui:focus:outline-none",
  {
    variants: {
      size: {
        sm: "ui:scale-75",
        md: "ui:scale-100",
        lg: "ui:scale-125",
      },
      state: {
        default:
          "ui:bg-none ui:border-ui-primary ui:focus:ring-offset-0 ui:focus:ring-2 ui:focus:ring-ui-primary/80 ui:cursor-pointer",
        disabled: "ui:border-ui-disabled ui:cursor-default",
      },
      defaultVaraints: {
        size: "md",
        state: "default",
      },
    },
  },
);

export type RadioInputSize = NonNullable<
  VariantProps<typeof radioInputVariants>
>["size"];

export type RadioInputState = NonNullable<
  VariantProps<typeof radioInputVariants>
>["state"];

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
  onChange: (value: string) => void;
  /** Breakpoint overrides for `size` using responsive token variants. */
  responsive?: ResponsiveProp<RadioInputSize>;
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
}: RadioInputProps) {
  const formFieldContext = useFormFieldContext();
  const stateStyle = getRadioInputStateStyle(formFieldContext, disabled);
  const handleOnChange = useCallback(
    (inputValue: string) => {
      if (onChange) {
        onChange(inputValue);
      }
    },
    [onChange],
  );

  const styles = useResponsiveVariantClass({
    variants: radioInputVariants,
    base: {
      state: stateStyle,
      size,
    },
    responsive,
    toVariantProps: (responsiveSize: RadioInputSize) => ({
      size: responsiveSize,
    }),
  });

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
    <Stack
      direction="horizontal"
      gap="sm"
      spacing={{ p: "sm" }}
      crossAxisAlignment="center"
    >
      <div className="ui:grid ui:place-items-center ui:mt-1">
        <input
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled || formFieldContext?.disabled}
          className={`ui:peer ui:col-start-1 ui:row-start-1 ${styles}`}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <div
          className={`phx-radio-inner-circle ui:peer-checked:bg-ui-primary ui:peer-checked:peer-disabled:bg-ui-disabled ${radioCircleSize(size)}`}
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
  );
}

function getRadioInputStateStyle(
  context?: FormFieldContextValue,
  disalbed?: boolean,
): RadioInputState {
  if (context?.disabled || disalbed) {
    return "disabled";
  }
  return "default";
}

export const RadioInput = memo(RadioInputComponent);
RadioInput.displayName = "RadioInput";
