import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "../Icons";
import { type ListItemProps, type ListBoxProps, ListBox } from "./ListBox";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { cn } from "../../utlis/cn";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Text } from "../Text";

const comboBoxVariants = cva(
  "ui:group ui:relative ui:flex ui:justify-between ui:placeholder:text-ui-fg-muted ui:pr-3",
  {
    variants: {
      state: {
        default:
          "ui:input-default ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-primary",
        error:
          "ui:input-error ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-error",
        success:
          "ui:input-success ui:cursor-pointer ui:text-ui-fg ui:focus-within:border-ui-success",
        disabled: "ui:input-disabled ui:cursor-not-allowed ui:text-ui-fg-muted",
      },
      surface: {
        outline: "ui:border ui:rounded-md ui:focus-within:border-2",
        subtle: "ui:rounded-md ui:focus-within:border-2",
        underline: "ui:border-b-2 ui:focus:border-b-2",
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
    ],
  },
);

const comboBoxInputComponentVariants = cva("ui:disabled:cursor-not-allowed", {
  variants: {
    size: {
      sm: "ui:input-width-sm",
      md: "ui:input-width-md",
      lg: "ui:input-width-lg",
    },
    width: {
      auto: "ui:w-auto",
      full: "ui:w-full",
    },
  },
  defaultVariants: {
    size: "md",
    width: "auto",
  },
});

export type ComboBoxSurface = NonNullable<
  VariantProps<typeof comboBoxVariants>
>["surface"];

export type ComboBoxInputSize = NonNullable<
  VariantProps<typeof comboBoxInputComponentVariants>
>["size"];
export type ComboBoxInputWidth = NonNullable<
  VariantProps<typeof comboBoxInputComponentVariants>
>["width"];

export interface ComboBoxComponentProps extends Omit<
  ListBoxProps,
  "size" | "width" | "responsive" | "onSelected"
> {
  placeholder?: string;
  width?: ComboBoxInputWidth;
  size?: ComboBoxInputSize;
  surface?: ComboBoxSurface;
  disabled?: boolean;
  onInputValueChange?: (value: string) => void;
  onSelect?: (selectedItem: ListItemProps[]) => void;
  onFocus?: (value: string) => void;
  responsive?: ResponsiveProp<ComboBoxInputWidth>;
}

type ComboBoxContextValue = {
  opened: boolean;
  disabled?: boolean;
  initialItems: ListItemProps[];
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
  inputValue: string;
  inputRef: RefObject<HTMLInputElement | null>;
  inputFocused: boolean;
  setInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const ComboBoxContext = createContext<ComboBoxContextValue | undefined>(
  undefined,
);

function useComboBoxContext() {
  const context = useContext(ComboBoxContext);
  if (!context) {
    throw new Error("comboBoxContext must be used within a ComboBoxComponent");
  }
  return context;
}

function ComboBoxComponent({
  placeholder,
  width,
  size,
  surface,
  disabled,
  onInputValueChange,
  onSelect,
  onFocus,
  items,
  multiselect,
}: ComboBoxComponentProps) {
  const [opened, setOpened] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]); // an array of selected inputs based on id
  const [listItems, setListItems] = useState<Array<ListItemProps>>(items);
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const comboBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const style = useResponsiveVariantClass({
    variants: comboBoxVariants,
    base: {
      surface,
      state: disabled ? "disabled" : "default",
    },
  });

  useEffect(() => {
    console.log(listItems);
  }, [listItems]);

  const resetItems = () => {
    setListItems(items);
    setInputValue("");
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const newItems = items.filter((item) =>
        item.value.toLowerCase().includes(value.toLowerCase()),
      );
      setListItems(newItems);
      setInputValue(value);
      setOpened(newItems.length !== 0);
      if (onInputValueChange) {
        onInputValueChange(value);
      }
    },
    [onInputValueChange],
  );

  const handleSelection = useCallback(
    (selectedItems: ListItemProps[]) => {
      inputRef.current?.focus();
      if (!multiselect) {
        const selectedItem = selectedItems[0];
        setInputValue(selectedItem.label);
        setSelectedValues([selectedItem.id]);
      } else {
        // keep the state of multiselected items
        resetItems(); // clear input
        const selectedIds = selectedItems.map((item) => item.id);
        setSelectedValues(selectedIds);
      }
      if (onSelect) {
        onSelect(selectedItems);
      }
    },
    [onSelect],
  );

  const hanldeFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setInputFocused(true);
      setOpened(true);
      if (onFocus) {
        onFocus(e.target.value);
      }
    },
    [onFocus],
  );

  useClickOutside(comboBoxRef, () => {
    setOpened(false);
    setInputFocused(false);
  });

  return (
    <ComboBoxContext.Provider
      value={{
        opened,
        disabled,
        initialItems: items,
        selectedValues,
        setSelectedValues,
        inputValue,
        handleInputChange,
        setOpened,
        inputRef,
        inputFocused,
        setInputFocused,
      }}
    >
      <div
        className={cn(
          "ui:flex ui:flex-col ui:gap-3",
          width == "full" ? "ui:w-full" : "ui:w-fit",
        )}
        ref={comboBoxRef}
      >
        {multiselect && <ComboBoxComponent.SelectTagGrid />}
        <div className={style}>
          <ComboBoxComponent.Input
            width={width}
            size={size}
            placeholder={placeholder}
            onFocus={hanldeFocus}
          />
          <ComboBoxComponent.Indicator />
          <ComboBoxComponent.Content
            items={listItems}
            size={size}
            width={width}
            direction={"vertical"}
            multiselect={multiselect}
            onSelected={handleSelection}
            selectedListItemIds={selectedValues}
          />
        </div>
      </div>
    </ComboBoxContext.Provider>
  );
}

interface ComboBoxInputProps {
  size?: ComboBoxInputSize;
  width?: ComboBoxInputWidth;
  responsive?: ResponsiveProp<ComboBoxInputSize>;
  placeholder?: string;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}
ComboBoxComponent.Input = function ComoboBoxInput({
  size,
  width,
  responsive,
  placeholder,
  onFocus,
}: ComboBoxInputProps) {
  const context = useComboBoxContext();
  const style = useResponsiveVariantClass({
    variants: comboBoxInputComponentVariants,
    base: {
      size: size,
      width: width,
    },
    responsive,
    toVariantProps: (responsiveSize: ComboBoxInputSize) => ({
      size: responsiveSize,
    }),
  });
  return (
    <input
      ref={context.inputRef}
      className={`phx-input ${style}`}
      value={context.inputValue}
      onChange={context.handleInputChange}
      onFocus={onFocus}
      placeholder={placeholder}
      type="text"
      disabled={context.disabled}
    />
  );
};

ComboBoxComponent.Indicator = function ComboBoxIndicator() {
  const context = useComboBoxContext();
  return (
    <div
      className={cn([
        context.disabled ? "ui:cursor-not-allowed" : "ui:cursor-pointer",
        "ui:float-right",
        "ui:text-ui-fg",
        "ui:transition-transform",
        "ui:flex",
        "ui:items-center",
        "ui:justify-center",
        "ui:duration-150",
        !context.disabled
          ? context.inputFocused
            ? "ui:text-ui-primary"
            : "ui:group-hover:text-ui-primary/50"
          : "ui:text-ui-fg-muted",
        context.opened ? "ui:rotate-180" : "ui:rotate-0",
      ])}
      onClick={() => {
        context.inputRef.current?.focus();
        context.setOpened(!context.opened);
      }}
    >
      <Icon icon={"angleDown"} size={"md"} color={"inherit"} />
    </div>
  );
};

ComboBoxComponent.Content = function ComboBoxContent(props: ListBoxProps) {
  const context = useComboBoxContext();
  return (
    <div
      className={cn([
        "ui:absolute",
        "ui:top-full",
        "ui:mt-1",
        "ui:left-0",
        "ui:right-0",
        "ui:z-50",
        context.opened ? "ui:flex" : "ui:hidden",
      ])}
    >
      <ListBox {...props} />
    </div>
  );
};

ComboBoxComponent.SelectTagGrid = function ComboBoxSelectTagGrid() {
  const context = useComboBoxContext();
  const { selectedValues, initialItems: listItems } = context;
  const listTags = listItems.filter((item) => selectedValues.includes(item.id));

  return (
    <div
      className={cn(
        "ui:grid",
        "ui:auto-cols-max",
        "ui:grid-flow-col",
        "ui:gap-2",
      )}
    >
      {listTags.map((item) => (
        <ComboBoxComponent.SelectTag id={item.id} label={item.label} />
      ))}
    </div>
  );
};

type ComboBoxSelectTagProps = {
  label: string;
  id: string;
};
ComboBoxComponent.SelectTag = function ComboBoxSelectTag(
  props: ComboBoxSelectTagProps,
) {
  const context = useComboBoxContext();
  const { selectedValues, setSelectedValues } = context;
  const handleDeselect = useCallback(() => {
    context.inputRef.current?.focus();
    const newItems = selectedValues.filter((valueId) => valueId !== props.id);
    setSelectedValues(newItems);
  }, [selectedValues]);

  return (
    <div
      className={cn([
        "ui:flex",
        "ui:flex-row",
        "ui:gap-1",
        "ui:rounded-sm",
        "ui:p-1",
        "ui:items-center",
        "ui:cursor-pointer",
        "ui:text-ui-fg",
        "ui:hover:text-ui-surface",
        "ui:bg-ui-bg",
        "ui:border",
        "ui:border-ui-border",
        "ui:hover:bg-ui-primary/80",
        "ui:hover:border",
        "ui:hover:border-ui-primary",
        "ui:group",
      ])}
      onClick={handleDeselect}
    >
      <Text variant={"label-sm"} as="span" tone={"inherit"}>
        {props.label}
      </Text>
      <div className="ui:flex ui:text-ui-fg-muted ui:group-hover:text-ui-surface">
        <Icon icon={"close"} size={"sm"} color={"inherit"} />
      </div>
    </div>
  );
};

export const ComboBox = memo(ComboBoxComponent);
