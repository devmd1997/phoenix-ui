import type { VariantProps } from "class-variance-authority";
import {
  createInputContainerCva,
  createInputDimensionCva,
} from "../../utlis/inputVariants";
import { createContext, memo, useContext, useRef } from "react";
import { useTagValues } from "../../hooks/useTagValues";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { FormFieldContext } from "../Form/FormField";
import { getFormSate } from "../../hooks/useFormState";
import type { ResponsiveProp } from "../../types";
import type { InputSize } from "./Input";
import { useInputValue } from "../../hooks/useInputValue";
import { cn } from "../../utlis/cn";
import { Tag, type TagComponentVariant } from "../Tag/Tag";
import { Stack } from "../Stack";

const tagInputContainerVariants = createInputContainerCva(
  "ui:flex ui:flex-row ui:gap-2 ui:flex-wrap ui:placeholder:text-ui-fg-muted ui:p-3",
);

const tagInputComponentVariants = createInputDimensionCva(
  "ui:flex-1 ui:min-w-32 ui:placeholder:text-ui-fg-muted",
);

export type TagInputSize = NonNullable<
  VariantProps<typeof tagInputComponentVariants>
>["size"];
export type TagInputWidth = NonNullable<
  VariantProps<typeof tagInputComponentVariants>
>["width"];

export type TagInputSurface = NonNullable<
  VariantProps<typeof tagInputContainerVariants>
>["surface"];
export type TagInputState = NonNullable<
  VariantProps<typeof tagInputContainerVariants>
>["state"];

export interface TagInputProps {
  className?: string;
  placeholder?: string;
  inputValue?: string;
  onInputValueChange?: (details: InputValueChangeDetails) => void;
  onValueChange?: (details: ChangeValueDetails) => void; // Callback fired when the tag values is updated
  value?: string[]; // controlled tag value
  disabled?: boolean;
  delimiter?: string;
  defaultValue: string[]; // default string values
  size?: TagInputSize;
  surface?: TagInputSurface;
  width?: TagInputWidth;
  responsive?: ResponsiveProp<InputSize>;
}

export interface ChangeValueDetails {
  values: string[];
}

export interface InputValueChangeDetails {
  value: string;
}

type TagInputContextValue = {
  placeholder?: string;
  inputValue: string;
  onInputValueChange: (details: InputValueChangeDetails) => void;
  removeValue: (indexToRemove: number) => void;
  addValues: (...newValues: string[]) => void;
  values: string[];
  delimiter?: string;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  size?: TagInputSize;
  width?: TagInputWidth;
  surface?: TagInputSurface;
};

const TagInputContext = createContext<TagInputContextValue | undefined>(
  undefined,
);

const useTagInputContext = () => {
  const context = useContext(TagInputContext);
  if (!context) {
    throw new Error(
      "useTagInputContext must be used within a TagInput component",
    );
  }
  return context;
};

function TagInputComponent({
  size,
  surface,
  width,
  className,
  responsive,
  onInputValueChange,
  onValueChange,
  ...props
}: TagInputProps) {
  const { values, removeValue, addValues } = useTagValues(
    props.value,
    onValueChange,
  );
  const { inputValue, handleInputChange } = useInputValue(
    props.inputValue,
    onInputValueChange,
  );
  const formContext = useContext(FormFieldContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = props.disabled || formContext?.disabled;
  const containerStyle = useResponsiveVariantClass({
    variants: tagInputContainerVariants,
    base: {
      surface: surface,
      state: getFormSate(formContext, isDisabled),
    },
  });

  return (
    <TagInputContext.Provider
      value={{
        values,
        inputRef,
        inputValue,
        onInputValueChange: handleInputChange,
        removeValue,
        addValues,
        disabled: isDisabled,
        delimiter: props.delimiter,
        width,
        size,
        surface,
        placeholder: props.placeholder,
      }}
    >
      <div
        className={cn(containerStyle, className)}
        onFocus={() => {
          if (inputRef) {
            inputRef.current?.focus();
          }
        }}
      >
        <TagInputComponent.Tags />
        <TagInputComponent.Input />
      </div>
    </TagInputContext.Provider>
  );
}

TagInputComponent.Tags = function Tags() {
  const context = useTagInputContext();
  const { values, removeValue, size, disabled, surface } = context;
  const tagVariant = getTagSurface(surface ?? "outline");
  return (
    <Stack
      gap="xs"
      direction={"horizontal"}
      crossAxisAlignment={"center"}
      wrap={"wrap"}
    >
      {values.map((value, index) => (
        <Tag
          id={index}
          value={value}
          size={size}
          disabled={disabled}
          onClick={() => removeValue(index)}
          variant={tagVariant}
          closable={true}
        />
      ))}
    </Stack>
  );
};

TagInputComponent.Input = function TagInput() {
  const context = useTagInputContext();
  const {
    inputValue,
    onInputValueChange,
    size,
    width,
    delimiter,
    placeholder,
    disabled,
    addValues,
    inputRef,
  } = context;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      let values = [inputValue];
      if (delimiter) {
        values = inputValue.split(delimiter);
      }
      addValues(...values);
      onInputValueChange({ value: "" });
    }
  };

  const style = tagInputComponentVariants({ size, width });
  return (
    <input
      type="text"
      value={inputValue}
      ref={inputRef}
      onChange={(e) => onInputValueChange({ value: e.target.value })}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className={style}
      placeholder={placeholder}
    />
  );
};

function getTagSurface(surface: TagInputSurface): TagComponentVariant {
  switch (surface) {
    case "outline":
      return "subtle";
    case "subtle":
      return "outline";
    case "underline":
      return "surface";
  }
}

export const TagInput = memo(TagInputComponent);
