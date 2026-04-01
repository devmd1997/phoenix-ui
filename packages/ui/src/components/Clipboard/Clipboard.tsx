import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, useState } from "react";
import { Icon } from "../Icons";
import type { IconSize, IconVariant } from "../Icons/Icon";

const clipboardComponentVariants = cva(
  "ui:inline-flex ui:gap-1 ui:items-center ui:cursor-pointer ui:disabled:cursor-not-allowed ui:disabled:pointer-events-none ui:toggled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "ui:rounded-sm ui:border ui:border-ui-border ui:p-2 ui:bg-ui-bg ui:text-ui-fg ui:hover:bg-ui-primary/60 ui:hover:text-ui-fg-surface ui:hover:border-ui-primary/60 ui:toggled:bg-ui-primary ui:toggled:border-ui-primary ui:toggled:text-ui-fg-surface ui:disabled:bg-ui-disabled ui:disabled:text-ui-fg-muted ui:disabled:border-ui-disabled ui:text-label-sm",
        link: "ui:text-ui-accent ui:text-label-xs ui:hover:text-ui-accent/80 ui:toggled:text-ui-accent ui:disabled:text-ui-disabled",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ClipboardVariant = NonNullable<
  VariantProps<typeof clipboardComponentVariants>
>["variant"];

export interface ClipboardProps {
  timeout?: number;
  value?: string;
  defaultValue?: string;
  variant?: ClipboardVariant;
  label?: string;
  disabled?: boolean;
}

type ClipboardContextValue = {
  variant?: ClipboardVariant;
  isCopied: boolean;
  label?: string;
};

const ClipboardContext = createContext<ClipboardContextValue | undefined>(
  undefined,
);

const useClipboardCotext = () => {
  const context = useContext(ClipboardContext);
  if (!context) {
    throw new Error(
      "useClipboardContext must be used within a Clipboard component",
    );
  }
  return context;
};

export function Clipboard({
  timeout = 3000,
  defaultValue,
  disabled,
  value,
  ...props
}: ClipboardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const style = clipboardComponentVariants({ variant: props.variant });

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy");
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(value ?? defaultValue ?? "")
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, timeout);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ClipboardContext.Provider value={{ isCopied, ...props }}>
      <button
        data-toggled={isCopied ? "true" : "false"}
        className={style}
        disabled={disabled}
        onClick={handleCopyClick}
      >
        <Clipboard.Icon />
      </button>
    </ClipboardContext.Provider>
  );
}

Clipboard.Icon = function ClipboardIcon() {
  const context = useClipboardCotext();
  const { isCopied, label, variant } = context;

  const renderIcon = (
    copyStatus: boolean,
    variant: ClipboardVariant = "default",
  ) => {
    const icon: IconVariant = copyStatus ? "checkmark" : "copy";
    const size: IconSize = variant === "link" ? "sm" : "md";
    return <Icon icon={icon} size={size} color={"inherit"} />;
  };
  return (
    <>
      {renderIcon(isCopied, variant)}
      {label && <span>{isCopied ? "Copied" : label}</span>}
    </>
  );
};
