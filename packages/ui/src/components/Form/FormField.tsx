import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, type PropsWithChildren } from "react";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { Text } from "../Text";
import { Stack } from "../Stack";

const formFieldVariants = cva("ui:flex", {
  variants: {
    size: {
      sm: "ui:gap-2",
      md: "ui:gap-3",
      lg: "ui:gap-4",
    },
    direction: {
      horizontal: "ui:flex-row",
      vertical: "ui:flex-col",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    size: "md",
  },
});

export type FormFieldContextValue = {
  error?: string;
  success?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
};

export const FormFieldContext = createContext<
  FormFieldContextValue | undefined
>(undefined);

export function useFormFieldContext() {
  const context = useContext(FormFieldContext);
  return context;
}
export interface FormFieldProps
  extends PropsWithChildren, VariantProps<typeof formFieldVariants> {
  label: string;
  value: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  role?: string;
  disabled?: boolean;
  responsive?: ResponsiveProp<VariantProps<typeof formFieldVariants>>;
}

function FormFieldComponent({
  label,
  value,
  description,
  error,
  success,
  required,
  role,
  size,
  direction,
  responsive,
  disabled,
  children,
}: FormFieldProps) {
  const styles = useResponsiveVariantClass({
    variants: formFieldVariants,
    base: { size, direction },
    responsive,
  });
  return (
    <FormFieldContext.Provider
      value={{ value, error, success, disabled, required }}
    >
      <fieldset className={styles} role={role}>
        <Stack gap={"xs"} direction={"vertical"}>
          <Text variant={"label-md"} tone={"default"}>
            {label}
            {required ? " *" : ""}
          </Text>
          {description ? (
            <Text variant={"body-sm"} tone={"muted"}>
              {description}
            </Text>
          ) : null}
        </Stack>
        <Stack gap={"xs"} direction={"vertical"}>
          {children}
          {error ? (
            <Text variant={"body-sm"} tone={"error"}>
              {error}
            </Text>
          ) : null}
          {!error && success ? (
            <Text variant={"body-sm"} tone={"success"}>
              {success}
            </Text>
          ) : null}
        </Stack>
      </fieldset>
    </FormFieldContext.Provider>
  );
}

export const FormField = FormFieldComponent;
