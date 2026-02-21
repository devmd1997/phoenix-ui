import { cva, type VariantProps } from "class-variance-authority";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  type ForwardedRef,
  type TextareaHTMLAttributes,
} from "react";
import {
  useFormFieldContext,
  type FormFieldContextValue,
} from "../Form/FormField";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import type { ResponsiveProp } from "../../types";
import { Button, type ButtonProps } from "../Button";

const textAreaVariants = cva("ui:flex-col ui:font-body ui:font-normal", {
  variants: {
    size: {
      sm: "ui:p-1 ui:text-body-sm",
      md: "ui:p-2 ui:text-body-md",
      lg: "ui:p-3 ui:text-body-lg",
    },
    state: {
      default: "ui:input-default",
      error: "ui:input-error",
      success: "ui:input-success",
      disabled: "ui:input-disabled",
    },
    width: {
      auto: "ui:min-w-50 ui:w-auto",
      full: "ui:w-full",
    },
    border: {
      filled: "ui:border-2 ui:rounded-lg",
      underline: "ui:border-b-2",
    },
  },
  defaultVariants: {
    size: "md",
    width: "auto",
    state: "default",
    border: "filled",
  },
  compoundVariants: [
    {
      state: ["default", "error", "success", "disabled"],
      border: "underline",
      className: "ui:bg-none",
    },
    {
      state: "default",
      border: "filled",
      class: "ui:bg-ui-bg",
    },
    {
      state: "error",
      border: "filled",
      class: "ui:bg-ui-error/25",
    },
    {
      state: "success",
      border: "filled",
      class: "ui:bg-ui-success/25",
    },
    {
      state: "disabled",
      border: "filled",
      class: "ui:bg-ui-disabled",
    },
  ],
});
export type TextAreaSize = NonNullable<
  VariantProps<typeof textAreaVariants>
>["size"];
export type TextAreaState = NonNullable<
  VariantProps<typeof textAreaVariants>
>["state"];
export type TextAreaWidth = NonNullable<
  VariantProps<typeof textAreaVariants>
>["width"];
export type TextAreaBorder = NonNullable<
  VariantProps<typeof textAreaVariants>
>["border"];

type TextAreaContextValue = {
  footer?: TextAreaFooterProps;
};

const TextAreaContext = createContext<TextAreaContextValue | undefined>(
  undefined,
);

function useTextAreaContext() {
  const context = useContext(TextAreaContext);
  if (context === undefined) {
    throw new Error("useTextAreaContext must be used within a TextArea");
  }
  return context;
}

/**
 * Contract:
 * `TextArea` is a controlled textarea primitive that keeps native textarea
 * behavior while applying Phoenix UI variants and optional footer actions.
 *
 * Ownership boundaries:
 * - Form semantics/messages (required, error, success, disabled) are sourced
 *   from `FormField` context when present.
 * - Visual concerns are driven by `size`, `width`, `border`, and `responsive`.
 * - Footer actions are passed through `footer`, which renders primary and
 *   secondary action buttons under the textarea surface.
 */
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Breakpoint overrides for `size` only.
  responsive?: ResponsiveProp<TextAreaSize>;
  // Controlled change event handler for textarea value updates.
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // Focus/blur lifecycle callbacks forwarded from the native textarea.
  onFocus: () => void;
  onBlur: () => void;
  // Forwarded ref to access the underlying <textarea>.
  ref?: ForwardedRef<HTMLTextAreaElement>;
  // Token-based sizing variant.
  size?: TextAreaSize;
  // Width variant for content area layout.
  width?: TextAreaWidth;
  // Border presentation variant.
  border?: TextAreaBorder;
  // Optional footer action area rendered below the textarea.
  footer?: TextAreaFooterProps;
}

/**
 * `TextAreaComponent` composes:
 * - context-aware state styling (`default/error/success/disabled`)
 * - responsive variant class generation
 * - native textarea event forwarding
 * - optional footer actions (primary + secondary buttons)
 */
function TextAreaComponent({
  onChange,
  onFocus,
  onBlur,
  ref,
  responsive,
  size,
  width,
  border,
  footer,
  ...props
}: TextAreaProps) {
  const formFieldContext = useFormFieldContext();
  const stateStyle = getTextAreaStateStyle(formFieldContext);

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
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange],
  );

  const styles = useResponsiveVariantClass({
    variants: textAreaVariants,
    base: {
      state: stateStyle,
      size,
      width,
      border,
    },
    responsive,
    toVariantProps: (responsiveSize: TextAreaSize) => ({
      size: responsiveSize ?? undefined,
    }),
  });

  return (
    <TextAreaContext.Provider value={{ footer }}>
      <div className={styles}>
        <textarea
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="phx-input ui:w-full ui:min-h-10"
          required={!!formFieldContext?.required}
          ref={ref}
        />
        <TextAreaComponent.Footer />
      </div>
    </TextAreaContext.Provider>
  );
}

type FooterButtonProps = Omit<ButtonProps, "variant">;

interface TextAreaFooterProps {
  primaryButton?: FooterButtonProps;
  secondaryButtons?: FooterButtonProps[];
}

TextAreaComponent.Footer = function TextAreaFooter() {
  const textAreaContext = useTextAreaContext();

  const PrimaryButton = (props: FooterButtonProps) => (
    <Button {...props} variant="primary" />
  );

  const SecondaryButton = (props: FooterButtonProps) => (
    <Button {...props} variant="secondary" />
  );

  return (
    textAreaContext.footer && (
      <div className="ui:w-full ui:flex ui:justify-between ui:items-center">
        {textAreaContext.footer.secondaryButtons && (
          <div className="ui:flex ui:gap-1 ui:flex-wrap">
            {textAreaContext.footer.secondaryButtons.map((btnProps) => (
              <SecondaryButton {...btnProps} />
            ))}
          </div>
        )}
        {textAreaContext.footer.primaryButton && (
          <PrimaryButton {...textAreaContext.footer.primaryButton} />
        )}
      </div>
    )
  );
};

function getTextAreaStateStyle(context?: FormFieldContextValue): TextAreaState {
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

export const TextArea = memo(TextAreaComponent);
TextArea.displayName = "TextArea";
