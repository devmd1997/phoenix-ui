/**
 * TextInput
 * Only allows text input
 * Allows default text input, email, and password
 */

import { forwardRef, type PropsWithChildren } from "react";
import { Input, type InputProps } from "./Input";
import { Icon } from "../Icons";
import { Button } from "../Button";

type TextInputType = "text" | "email" | "password" | "search" | "url" | "tel";
export type TextInputPrefixPreset = "searchIcon" | "atSign" | "dollar";
export type TextInputSuffixPreset =
  | "domainDotCom"
  | "shortcutSlash"
  | "goButton";

export interface TextInputProps extends Omit<InputProps, "type"> {
  type?: TextInputType;
  prefixPreset?: TextInputPrefixPreset;
  suffixPreset?: TextInputSuffixPreset;
  suffixButtonLabel?: string;
  onSuffixButtonClick?: () => void;
}

function getPrefixPreset(prefixPreset: TextInputPrefixPreset | undefined) {
  function getPreset() {
    switch (prefixPreset) {
      case "searchIcon":
        return <Icon icon="search" color="muted" size="lg" />;
      case "atSign":
        return <span className="ui:text-ui-fg-muted">@</span>;
      case "dollar":
        return <span className="ui:text-ui-fg-muted">$</span>;
      default:
        return undefined;
    }
  }

  const preset = getPreset();
  return (
    preset && (
      <div className="ui:flex ui:justify-center ui:items-center ui:p-3">
        {preset}
      </div>
    )
  );
}

const SuffixWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="ui:flex ui:justify-center ui:items-center ui:p-3 ui:bg-white ui:text-ui-fg-muted ui:min-w-[20%] ui:text-center">
      {children}
    </div>
  );
};

function getSuffixPreset(
  suffixPreset: TextInputSuffixPreset | undefined,
  suffixButtonLabel: string | undefined,
  onSuffixButtonClick: (() => void) | undefined,
) {
  switch (suffixPreset) {
    case "domainDotCom":
      return <SuffixWrapper>.com</SuffixWrapper>;
    case "shortcutSlash":
      return <SuffixWrapper>/</SuffixWrapper>;
    case "goButton":
      return (
        <Button
          label={suffixButtonLabel ?? "Go"}
          size="md"
          variant="primary"
          onClick={onSuffixButtonClick}
          corners="none"
        />
      );
    default:
      return undefined;
  }
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = "text",
      prefix,
      suffix,
      prefixPreset,
      suffixPreset,
      suffixButtonLabel,
      onSuffixButtonClick,
      ...props
    },
    ref,
  ) => {
    const resolvedPrefix = prefix ?? getPrefixPreset(prefixPreset);
    const resolvedSuffix =
      suffix ??
      getSuffixPreset(suffixPreset, suffixButtonLabel, onSuffixButtonClick);

    return (
      <Input
        ref={ref}
        type={type}
        prefix={resolvedPrefix}
        suffix={resolvedSuffix}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";
