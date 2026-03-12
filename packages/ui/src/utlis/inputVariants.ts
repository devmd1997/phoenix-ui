import { cva } from "class-variance-authority";

type SharedInputState = "default" | "error" | "success" | "disabled";
type SharedInputSurface = "outline" | "subtle" | "underline";
type SharedInputSize = "sm" | "md" | "lg";
type SharedInputWidth = "auto" | "full";

const sharedInputStateVariants: Record<SharedInputState, string> = {
  default:
    "ui:input-default ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-primary",
  error:
    "ui:input-error ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-error",
  success:
    "ui:input-success ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-success",
  disabled: "ui:input-disabled ui:cursor-not-allowed ui:text-ui-fg-muted",
} as const;

const sharedInputSurfaceVariants: Record<SharedInputSurface, string> = {
  outline: "ui:border ui:rounded-sm ui:focus-within:border-2",
  subtle: "ui:rounded-sm ui:focus-within:border-2",
  underline: "ui:border-b-2 ui:focus:border-b-2",
};

const sharedInputSizeVariants: Record<SharedInputSize, string> = {
  sm: "ui:input-width-sm",
  md: "ui:input-width-md",
  lg: "ui:input-width-lg",
};

const sharedInputWidthVariants: Record<SharedInputWidth, string> = {
  auto: "ui:w-auto",
  full: "ui:w-full",
};

type InputCompoundVariant = {
  state?: SharedInputState | SharedInputState[];
  surface?: SharedInputSurface | SharedInputSurface[];
  className: string;
};

interface CreateInputContainerCvaOptions {
  state?: Partial<typeof sharedInputStateVariants>;
  surface?: Partial<typeof sharedInputSurfaceVariants>;
  compoundVariants?: InputCompoundVariant[];
}

export function createInputContainerCva(
  baseClassName: string,
  options?: CreateInputContainerCvaOptions,
) {
  return cva(baseClassName, {
    variants: {
      state: {
        ...sharedInputStateVariants,
        ...options?.state,
      },
      surface: {
        ...sharedInputSurfaceVariants,
        ...options?.surface,
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
      ...(options?.compoundVariants ?? []),
    ],
  });
}

export function createInputDimensionCva(baseClassName = "") {
  return cva(baseClassName, {
    variants: {
      size: sharedInputSizeVariants,
      width: sharedInputWidthVariants,
    },
    defaultVariants: {
      size: "md",
      width: "auto",
    },
  });
}
