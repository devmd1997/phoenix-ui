/**
 * TextInput
 * Only allows text input
 * Allows default text input, email, and password
 */

import { forwardRef } from "react";
import { Button } from "../Button";
import { Icon } from "../Icons";
import { Input, type InputProps } from "./Input";
import { InputGroup, type InputAddOnElement } from "./InputGroup";

type TextInputType = "text" | "email" | "password" | "search" | "url" | "tel";
export type TextInputPrefixPreset = "searchIcon" | "atSign" | "dollar";
export type TextInputSuffixPreset =
  | "domainDotCom"
  | "shortcutSlash"
  | "goButton";

export interface TextInputProps extends Omit<InputProps, "type"> {
  type?: TextInputType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixPreset?: TextInputPrefixPreset;
  suffixPreset?: TextInputSuffixPreset;
  suffixButtonLabel?: string;
  onSuffixButtonClick?: () => void;
}

function getPrefixInlinePreset(prefixPreset: TextInputPrefixPreset | undefined) {
  switch (prefixPreset) {
    case "searchIcon":
      return <Icon icon="search" color="muted" size="lg" />;
    default:
      return undefined;
  }
}

function getPrefixAddOnPreset(
  prefixPreset: TextInputPrefixPreset | undefined,
): InputAddOnElement["start"] {
  switch (prefixPreset) {
    case "atSign":
      return "@";
    case "dollar":
      return "$";
    default:
      return undefined;
  }
}

function getSuffixAddOnPreset(
  suffixPreset: TextInputSuffixPreset | undefined,
): InputAddOnElement["end"] {
  switch (suffixPreset) {
    case "domainDotCom":
      return ".com";
    case "shortcutSlash":
      return "/";
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
    const inlineElement = {
      start: prefix ?? getPrefixInlinePreset(prefixPreset),
      end:
        suffix ??
        (suffixPreset === "goButton" ? (
          <Button
            label={suffixButtonLabel ?? "Go"}
            size="md"
            intent="primary"
            onClick={onSuffixButtonClick}
            corners="none"
          />
        ) : undefined),
    };

    const addOnElement = {
      start: getPrefixAddOnPreset(prefixPreset),
      end: getSuffixAddOnPreset(suffixPreset),
    };

    return (
      <InputGroup inlineElement={inlineElement} addOnElement={addOnElement}>
        <Input ref={ref} type={type} {...props} />
      </InputGroup>
    );
  },
);

TextInput.displayName = "TextInput";
