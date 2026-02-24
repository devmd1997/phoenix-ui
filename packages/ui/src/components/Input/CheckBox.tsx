import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import {
  useFormFieldContext,
  type FormFieldContextValue,
} from "../Form/FormField";
import { memo, useCallback, useEffect, useRef } from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { Stack } from "../Stack";
import { Text } from "../Text";

const checkBoxVariants = cva(
  "ui:rounded-sm ui:cursor-pointer ui:border ui:accent-ui-primary ui:indeterminate:bg-ui-primary ui:font-body ui:font-normal",
  {
    variants: {
      size: {
        sm: "ui:size-3",
        md: "ui:size-4",
        lg: "ui:size-5",
      },
      state: {
        default: "ui:input-default ui:bg-ui-bg",
        error: "ui:input-error ui:bg-ui-error/50",
        success: "ui:input-success ui:bg-ui-success/50",
        disabled: "ui:input-disabled ui:bg-ui-disabled",
      },
      checkboxPosition: {
        right: "ui:order-last",
        left: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      checkboxPosition: "left",
    },
  },
);

export type CheckBoxSize = NonNullable<
  VariantProps<typeof checkBoxVariants>
>["size"];
export type CheckBoxState = NonNullable<
  VariantProps<typeof checkBoxVariants>
>["state"];
export type CheckBoxPosition = NonNullable<
  VariantProps<typeof checkBoxVariants>["checkboxPosition"]
>;

/**
 * Contract:
 * `CheckBox` is a checkbox primitive with optional label/description content.
 * It supports controlled checked state, optional indeterminate state, and
 * token-driven size/responsive styling.
 *
 * Ownership boundaries:
 * - Visual state (`default/error/success/disabled`) is derived from `FormField`
 *   context when present.
 * - Form behavior remains native checkbox behavior via input props.
 * - Layout and text rendering for label/description are handled internally.
 */
export interface CheckBoxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "onChange"
> {
  // Controlled checked state. Use with `onChange` for controlled usage.
  checked?: boolean;
  // Enables the visual "partially selected" checkbox state.
  // This is applied directly to the DOM input via ref.
  indeterminate?: boolean;
  // Optional label shown next to the checkbox.
  label?: string;
  // Optional supporting text rendered below the label.
  description?: string;
  // Token-based checkbox size variant.
  size?: CheckBoxSize;
  // Breakpoint overrides for checkbox `size`.
  responsive?: ResponsiveProp<CheckBoxSize>;
  // Emits the next checked boolean when the user toggles the checkbox.
  onChange?: (checked: boolean) => void;

  checkboxPosition?: CheckBoxPosition;
}

/**
 * `CheckBoxComponent` composes:
 * - context-aware visual state styling
 * - native checkbox semantics (`type="checkbox"`)
 * - optional indeterminate state synchronization
 * - optional label and description content
 */
function CheckBoxComponent({
  checked,
  indeterminate,
  onChange,
  label,
  description,
  responsive,
  size,
  checkboxPosition,
  ...props
}: CheckBoxProps) {
  const formFieldContext = useFormFieldContext();
  const stateStyle = getCheckBoxStateStyle(formFieldContext);
  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkBoxRef.current) {
      checkBoxRef.current.indeterminate = indeterminate ?? false;
      checkBoxRef.current.checked = checked ?? false;
    }
  }, [checkBoxRef, indeterminate, checked]);

  const handleOnChange = useCallback(
    (checked: boolean) => {
      if (onChange) {
        onChange(checked);
      }
    },
    [onChange],
  );

  const styles = useResponsiveVariantClass({
    variants: checkBoxVariants,
    base: {
      state: stateStyle,
      size,
      checkboxPosition,
    },
    responsive,
    toVariantProps: (responsiveSize: CheckBoxSize) => ({
      size: responsiveSize ?? undefined,
    }),
  });

  const labelSize = (checkBoxSize?: CheckBoxSize) => {
    switch (checkBoxSize) {
      case "sm":
        return "label-xs";
      case "md":
        return "label-sm";
      case "lg":
        return "label-md";
      default:
        return "label-sm";
    }
  };

  return (
    <Stack
      direction="horizontal"
      gap="sm"
      spacing={{ p: "sm" }}
      crossAxisAlignment="center"
    >
      <input
        {...props}
        checked={checked}
        className={styles}
        ref={checkBoxRef}
        type="checkbox"
        onChange={(e) => handleOnChange(e.target.checked)}
      />
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
          <Text as="p" variant={"body-sm"} tone="muted">
            {description}
          </Text>
        )}
      </Stack>
    </Stack>
  );
}

function getCheckBoxStateStyle(context?: FormFieldContextValue): CheckBoxState {
  if (!context) {
    return "default";
  }
  if (context.disabled) {
    return "disabled";
  }
  if (context.error) {
    return "error";
  }
  if (context.success) {
    return "success";
  }
  return "default";
}

export const CheckBox = memo(CheckBoxComponent);
CheckBox.displayName = "CheckBox";
