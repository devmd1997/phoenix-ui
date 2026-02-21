import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, type PropsWithChildren } from "react";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";

const formFieldVariants = cva("", {
  variants: {
    size: {
      sm: "ui:gap-2",
      md: "ui:gap-3",
      lg: "ui:gap-4",
    },
    direction: {
      horizontal: "ui:flex",
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

export const FormFieldContext = createContext<FormFieldContextValue | undefined>(
  undefined,
);

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
        <label>
          {label}
          {required ? " *" : ""}
        </label>
        {description ? <p>{description}</p> : null}
        {children}
        {error ? <p>{error}</p> : null}
        {!error && success ? <p>{success}</p> : null}
      </fieldset>
    </FormFieldContext.Provider>
  );
}

export const FormField = FormFieldComponent;
