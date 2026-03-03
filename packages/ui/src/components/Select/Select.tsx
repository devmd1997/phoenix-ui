import { cva, type VariantProps } from "class-variance-authority";
import { memo, useCallback, useRef, useState, type ChangeEvent } from "react";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import type { ResponsiveProp } from "../../types";
import {
  useFormFieldContext,
  type FormFieldContextValue,
} from "../Form/FormField";
import { Icon } from "../Icons";
import { cn } from "../../utlis/cn";

const selectVariants = cva(
  "ui:font-body ui:font-normal ui:outline-none ui:pl-3",
  {
    variants: {
      size: {
        sm: "ui:input-width-sm",
        md: "ui:input-width-md",
        lg: "ui:input-width-lg",
      },
      width: {
        auto: "ui:w-fit",
        full: "ui:w-full",
      },
      state: {
        default:
          "ui:input-default ui:cursor-pointer ui:text-ui-fg ui:hover:not-focus-within:border-ui-primary/25 ui:focus-within:border-ui-primary",
        error:
          "ui:input-error ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-error",
        success:
          "ui:input-success ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-success",
        disabled: "ui:input-disabled ui:cursor-not-allowed ui:text-ui-fg-muted",
      },
      surface: {
        outline: "ui:border ui:rounded-full ui:focus-within:border-2",
        subtle: "ui:rounded-full ui:focus-within:border-2",
        underline: "ui:border-b-2 ui:focus:border-b-2",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      surface: "outline",
      width: "auto",
    },
    compoundVariants: [
      {
        state: ["default", "error", "success", "disabled"],
        surface: ["underline", "outline"],
        className: "ui:bg-none",
      },
      {
        state: "default",
        surface: "subtle",
        className:
          "ui:bg-ui-bg ui:hover:not-focus-within:bg-ui-primary/25 ui:focus-within:bg-ui-primary/50",
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

export type SelectSize = NonNullable<
  VariantProps<typeof selectVariants>["size"]
>;

export type SelectWidth = NonNullable<
  VariantProps<typeof selectVariants>
>["width"];

export type SelectState = NonNullable<
  VariantProps<typeof selectVariants>["state"]
>;

export type SelectSurface = NonNullable<
  VariantProps<typeof selectVariants>["surface"]
>;

export interface OptionProps {
  value: string;
  label: string;
}

export interface OptionGroupProps {
  label: string;
  options: OptionProps[];
}

export type SelectComponentOptionProps = OptionProps | OptionGroupProps;

export interface SelectComponentProps {
  id: string;
  placeholder?: string;
  options?: SelectComponentOptionProps[];
  size?: SelectSize;
  width?: SelectWidth;
  surface?: SelectSurface;
  disabled?: boolean;
  responsive?: ResponsiveProp<SelectSize>;
  required?: boolean;
  autocomplete?: boolean;
  onSelectChange?: (value: string) => void;
}

function SelectComponent({
  id,
  placeholder,
  size,
  surface,
  width,
  disabled,
  responsive,
  onSelectChange,
  options,
}: SelectComponentProps) {
  const formFieldContext = useFormFieldContext();
  const stateStyle = getSelectStateStyle(formFieldContext, disabled);
  const isDisabled = stateStyle === "disabled";
  const [value, setValue] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);

  const style = useResponsiveVariantClass({
    variants: selectVariants,
    base: {
      size,
      state: stateStyle,
      surface,
      width,
    },
    responsive,
    toVariantProps: (responsiveSize?: SelectSize) => ({
      size: responsiveSize ?? undefined,
    }),
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      if (onSelectChange) {
        onSelectChange(newValue);
      }
    },
    [onSelectChange],
  );

  const handleOpenSelect = useCallback(() => {
    if (selectRef.current && !isDisabled) {
      selectRef.current.showPicker();
    }
  }, [isDisabled]);

  const pickerColor: Record<SelectState, string> = {
    default: "ui:text-ui-fg ui:group-focus-within:text-ui-primary",
    success: "ui:text-ui-success",
    error: "ui:text-ui-error",
    disabled: "ui:text-ui-fg",
  };

  return (
    <div
      className={`ui:relative ui:flex ui:items-center ui:justify-between ui:group ${style}`}
      onClick={handleOpenSelect}
    >
      <select
        className={cn([
          "ui:appearance-none ui:pr-8 ui:w-full ui:peer",
          isDisabled ? "ui:cursor-not-allowed" : "ui:cursor-pointer",
        ])}
        ref={selectRef}
        id={id}
        disabled={isDisabled}
        value={value}
        onChange={handleChange}
      >
        {placeholder && (
          <option value={""}>
            <label>{placeholder}</label>
          </option>
        )}
        {options?.map((option, index) => {
          if (isOptionGroup(option)) {
            return (
              <optgroup label={option.label} key={index}>
                {options.map((subOption, index) => (
                  <option
                    value={subOption.label}
                    key={`${option.label}-${index}`}
                  >
                    <label>{subOption.label}</label>
                  </option>
                ))}
              </optgroup>
            );
          }
          return (
            <option value={option.value} key={index}>
              <label>{option.label}</label>
            </option>
          );
        })}
      </select>
      <span
        className={cn(
          "ui:pointer-events-none ui:absolute ui:right-3 ui:top-[50%] ui:translate-y-[-50%] ui:transition-transform ui:duration-150",
          "ui:peer-open:rotate-180",
          pickerColor[stateStyle],
        )}
      >
        <Icon icon="angleDown" size="sm" color={"inherit"} />
      </span>
    </div>
  );
}

function getSelectStateStyle(
  context?: FormFieldContextValue,
  disabled?: boolean,
): SelectState {
  if (context?.disabled || disabled) {
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

export const Select = memo(SelectComponent);
Select.displayName = "Select";

function isOptionGroup(
  props: SelectComponentOptionProps,
): props is OptionGroupProps {
  return "options" in props;
}
