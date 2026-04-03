import { cva, type VariantProps } from "class-variance-authority";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { Stack, type StackDirection } from "../Stack/Stack";
import { Text } from "../Text";
import { cn } from "../../utlis/cn";
import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Icon, type IconVariant } from "../Icons/Icon";
import { createRequiredContext } from "../../utlis/createRequiredContext";

const listBoxVariants = cva(
  "ui:rounded-sm ui:appearance-none ui:border ui:border-ui-border ui:overflow-y-auto ui:bg-white",
  {
    variants: {
      size: {
        sm: "ui:input-width-sm ui:max-h-30 ui:px-1",
        md: "ui:input-width-md ui:max-h-40 ui:px-2",
        lg: "ui:input-width-lg ui:max-h-50 ui:px-3",
      },
      width: {
        auto: "ui:w-fit",
        full: "ui:w-full",
      },
    },
    defaultVariants: {
      size: "md",
      width: "auto",
    },
  },
);

const listItemsVariants = cva("ui:rounded-sm ui:w-full ui:font-normal", {
  variants: {
    state: {
      default:
        "ui:bg-none ui:text-ui-fg ui:hover:not-focus-within:not-toggled:bg-ui-primary/25 ui:focus-within:border-ui-primary/50 ui:focus-within:border-2 ui:cursor-pointer ui:toggled:bg-ui-primary/50",
      disabled: "ui:bg-none ui:text-ui-fg-muted ui:cursor-not-allowed",
    },
  },
});

export type ListBoxSize = NonNullable<
  VariantProps<typeof listBoxVariants>
>["size"];

export type ListBoxWidth = NonNullable<
  VariantProps<typeof listBoxVariants>
>["width"];

type ListItemContextValue = {
  selectedItem: Array<string>;
  onSelectedItem: (selectedItem: string) => void;
  multiselect?: boolean;
};

const [ListItemContext, useListItemContext] =
  createRequiredContext<ListItemContextValue>(
    "useListItemContext must be used within a ListItem",
);

export interface ListItemProps {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  iconLeft?: IconVariant;
}

export interface ListBoxProps {
  items: ListItemProps[];
  size?: ListBoxSize;
  width?: ListBoxWidth;
  direction?: StackDirection;
  responsive?: ResponsiveProp<ListBoxSize>;
  multiselect?: boolean;
  selectedListItemIds?: string[]; // list of selected ids
  onSelected?: (selectedItems: ListItemProps[]) => void;
}

function ListBoxComponent({
  items,
  size,
  direction,
  width,
  responsive,
  multiselect,
  selectedListItemIds,
  onSelected,
}: ListBoxProps) {
  const [selectedItem, setSelectedItem] = useState<Array<string>>([]); // list of ids
  const style = useResponsiveVariantClass({
    variants: listBoxVariants,
    base: {
      size,
      width,
    },
    responsive,
    toVariantProps: (responsiveSize?: ListBoxSize) => ({
      size: responsiveSize,
    }),
  });

  useEffect(() => {
    setSelectedItem(selectedListItemIds ?? []);
  }, [selectedListItemIds]);

  const handleSelectedItem = useCallback(
    (itemKey: string) => {
      if (multiselect) {
        setSelectedItem((currentItems) => {
          const newItems = currentItems.includes(itemKey)
            ? currentItems.filter((item) => item !== itemKey)
            : [...currentItems, itemKey];
          if (onSelected) {
            onSelected(items.filter((item) => newItems.includes(item.id)));
          }
          return newItems;
        });
      } else {
        if (onSelected) {
          onSelected(items.filter((item) => item.id === itemKey));
        }
        setSelectedItem([itemKey]);
      }
    },
    [onSelected],
  );

  return (
    <ListItemContext.Provider
      value={{ selectedItem, onSelectedItem: handleSelectedItem, multiselect }}
    >
      <ul className={style}>
        <Stack direction={direction} gap={"xs"}>
          {items.map((item) => {
            const itemKey = item.id;
            return (
              <ListBoxComponent.ListItem
                {...item}
                itemKey={itemKey}
                key={itemKey}
              />
            );
          })}
        </Stack>
      </ul>
    </ListItemContext.Provider>
  );
}

type ListItemComponentProps = ListItemProps & {
  itemKey: string;
};
ListBoxComponent.ListItem = function ListBoxItemComponent(
  props: ListItemComponentProps,
) {
  const context = useListItemContext();
  const { selectedItem, onSelectedItem } = context;
  const style = useResponsiveVariantClass({
    variants: listItemsVariants,
    base: {
      state: props.disabled ? "disabled" : "default",
    },
  });
  const isSelected = selectedItem.includes(props.itemKey);
  return (
    <li
      role="option"
      aria-selected={isSelected}
      className={cn([
        "ui:flex",
        "ui:flex-row",
        "ui:gap-3",
        "ui:items-center",
        "ui:p-1.5",
        style,
      ])}
      value={props.value}
      data-toggled={`${isSelected}`}
      onClick={() => {
        if (!props.disabled) {
          onSelectedItem(props.itemKey);
        }
      }}
    >
      {props.iconLeft && <Icon icon={props.iconLeft} size={"md"} />}
      <Stack direction={"vertical"} gap="xs" width={"full"}>
        <Text
          variant={"label-sm"}
          as="span"
          tone={"inherit"}
          weight={"semibold"}
        >
          {props.label}
        </Text>
        {props.description && (
          <Text variant={"body-sm"} as="p" tone={"muted"}>
            {props.description}
          </Text>
        )}
      </Stack>
      {context.multiselect && (
        <div className="ui:float-end ui:w-5 ui:flex ui:items-center">
          {isSelected ? (
            <Icon icon={"checkmark"} size={"md"} color={"default"} />
          ) : (
            <div className="ui:icon-size-md" />
          )}
        </div>
      )}
    </li>
  );
};

export const ListBox = memo(ListBoxComponent);
