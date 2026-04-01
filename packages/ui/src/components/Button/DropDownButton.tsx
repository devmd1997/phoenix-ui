import { cva, type VariantProps } from "class-variance-authority";
import { Icon, type IconVariant } from "../Icons/Icon";
import { Button, type ButtonProps, type ButtonSize } from "./Button";
import { useMenu, type MenuChangeDetails } from "../../hooks/useMenu";
import { createContext, memo, useContext, useState } from "react";
import { cn } from "../../utlis/cn";

const dropDownItemVariants = cva(
  "ui:rounded-sm ui:flex ui:w-full ui:max-w-200 ui:flex-row ui:gap-3 ui:justify-start ui:items-center ui:p-2 ui:cursor-pointer ui:disabled:cursor-not-allowed ui:disabled:pointer-events-none",
  {
    variants: {
      size: {
        sm: "ui:text-label-xs",
        md: "ui:text-label-sm",
        lg: "ui:text-label-md",
      },
      intent: {
        default: "ui:button-ghost-ui-secondary",
        danger: "ui:button-ghost-ui-error",
        info: "ui:button-ghost-ui-info",
        success: "ui:button-ghost-ui-success",
      },
    },
    defaultVariants: {
      size: "md",
      intent: "default",
    },
  },
);

const dropDownMenuVariants = cva(
  "ui:absolute ui:z-40 ui:flex ui:w-fit ui:flex-col ui:items-center ui:justify-center ui:p-2 ui:bg-ui-surface ui:rounded-sm ui:border ui:border-ui-border",
  {
    variants: {
      position: {
        top: "ui:bottom-full ui:left-1/2 ui:-translate-x-1/2",
        bottom: "ui:top-full ui:left-1/2 ui:-translate-x-1/2",
        right: "ui:left-full ui:top-1/2 ui:-translate-y-1/2",
        left: "ui:right-full ui:top-1/2 ui:-translate-y-1/2",
      },
      visible: {
        true: "ui:visible",
        false: "ui:hidden",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);

export type DropDownItemIntent = NonNullable<
  VariantProps<typeof dropDownItemVariants>
>["intent"];

export type DropDownMenuPosition = NonNullable<
  VariantProps<typeof dropDownMenuVariants>
>["position"];

export interface DropDownItemProps {
  key: string;
  label: string;
  icon?: IconVariant;
  onClick?: () => void;
  intent?: DropDownItemIntent;
  disabled?: boolean;
}

export interface DropDownItemGroup extends Omit<
  DropDownItemProps,
  "onClick" | "intent"
> {
  items: DropDownItem[];
}

export type DropDownItem = DropDownItemGroup | DropDownItemProps;

export interface DropDownButtonProps extends Omit<
  ButtonProps,
  "intent" | "onClick" | "iconRight"
> {
  items: DropDownItem[];
  menuPosition?: DropDownMenuPosition;
  hideIndicator?: boolean;
  onMenuChange?: (details: MenuChangeDetails<DropDownItem>) => void;
  initalOpen?: boolean;
  open?: boolean;
}

type DropDownButtonContextValue = {
  items: DropDownItem[];
  menuPosition?: DropDownMenuPosition;
  toggleMenu: (open?: boolean) => void;
  isOpen: boolean;
  open?: boolean;
  size?: ButtonSize;
  openPath: string[];
  setOpenPath: React.Dispatch<React.SetStateAction<string[]>>;
};

const DropDownButtonContext = createContext<
  DropDownButtonContextValue | undefined
>(undefined);

const useDropDownButtonContext = () => {
  const context = useContext(DropDownButtonContext);
  if (!context) {
    throw new Error(
      "useDropDownButtonContext cannot be used outside of a DropDownButton Component",
    );
  }
  return context;
};

function DropDownComponent(props: DropDownButtonProps) {
  const { isOpen, toggleMenu } = useMenu<DropDownItem>(
    props.items,
    props.initalOpen,
    props.onMenuChange,
  );
  const [openPath, setOpenPath] = useState<string[]>([]);

  const indicatorIcon = (
    menuPosition: DropDownMenuPosition,
    hideIndicator?: boolean,
  ): IconVariant | undefined => {
    if (hideIndicator) {
      return undefined;
    }
    if (menuPosition === "top" || menuPosition === "bottom") {
      return isOpen ? "caretUpFilled" : "caretDownFilled";
    }

    return isOpen
      ? "caretUpFilled"
      : menuPosition === "left"
        ? "caretLeftFilled"
        : "caretRightFilled";
  };

  return (
    <DropDownButtonContext.Provider
      value={{
        items: props.items,
        menuPosition: props.menuPosition,
        toggleMenu,
        isOpen,
        open: props.open,
        size: props.size,
        openPath,
        setOpenPath,
      }}
    >
      <div className="ui:relative ui:p-2 ui:max-w-200">
        <Button
          label={props.label}
          iconLeft={
            props.menuPosition === "left"
              ? indicatorIcon(props.menuPosition, props.hideIndicator)
              : props.iconLeft
          }
          iconRight={
            props.menuPosition === "left"
              ? props.iconLeft
              : indicatorIcon(props.menuPosition, props.hideIndicator)
          }
          variant={props.variant}
          intent={"secondary"}
          onClick={() => toggleMenu(props.open)}
          className={props.className}
        />
        <DropDownMenu
          items={props.items}
          menuPosition={props.menuPosition}
          isOpen={isOpen}
          depth={0}
          parentPath={[]}
        />
      </div>
    </DropDownButtonContext.Provider>
  );
}

interface DropDownMenuProps {
  items: DropDownItem[];
  menuPosition?: DropDownMenuPosition;
  isOpen: boolean;
  depth: number;
  parentPath: string[];
}
function DropDownMenu({
  depth = 0,
  parentPath = [],
  ...props
}: DropDownMenuProps) {
  const style = dropDownMenuVariants({
    visible: props.isOpen,
    position: props.menuPosition,
  });

  return (
    <div className={cn(style)}>
      {props.items.map((item) => {
        if (isDropDownGroup(item)) {
          return (
            <DropDownItemGroup
              specs={item}
              depth={depth}
              parentPath={parentPath}
            />
          );
        }
        return <DropDownItem {...item} />;
      })}
    </div>
  );
}

function DropDownItem(props: DropDownItemProps) {
  const context = useDropDownButtonContext();
  const { size } = context;
  const style = dropDownItemVariants({ size, intent: props.intent });

  return (
    <button
      key={props.key}
      className={style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon && <Icon icon={props.icon} size={"md"} color={"inherit"} />}
      {props.label}
    </button>
  );
}
interface DropDownItemGroupProps {
  specs: DropDownItemGroup;
  depth: number;
  parentPath: string[];
}
function DropDownItemGroup({
  depth,
  parentPath,
  specs: props,
}: DropDownItemGroupProps) {
  const context = useDropDownButtonContext();
  const { size, menuPosition, openPath, setOpenPath } = context;
  const style = dropDownItemVariants({ size, intent: "default" });
  const nestedMenuPosition = menuPosition === "right" ? "right" : "left";
  const groupPath = [...parentPath, props.key];

  const isGroupOpen = groupPath.every((key, i) => openPath[i] === key);

  const openSubMenu = () => {
    setOpenPath(groupPath);
  };

  const closeSubMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (event.currentTarget.contains(nextTarget)) {
      return;
    }
    setOpenPath(parentPath);
  };

  const indicator = (
    <Icon
      icon={menuPosition === "left" ? "caretLeftFilled" : "caretRightFilled"}
      size={"md"}
      color={"inherit"}
    />
  );

  const icon = props.icon && (
    <Icon icon={props.icon} size={"md"} color={"inherit"} />
  );
  return (
    <div
      className="ui:relative ui:w-full"
      onMouseEnter={openSubMenu}
      onMouseLeave={closeSubMenu}
    >
      <button
        key={props.key}
        className={cn(style, "ui:disabled:pointer-events-none")}
        disabled={props.disabled}
      >
        {menuPosition === "left" ? indicator : icon}
        {props.label}
        {menuPosition === "left" ? icon : indicator}
      </button>
      <DropDownMenu
        items={props.items}
        isOpen={isGroupOpen}
        menuPosition={nestedMenuPosition}
        depth={depth + 1}
        parentPath={groupPath}
      />
    </div>
  );
}

function isDropDownGroup(value: DropDownItem): value is DropDownItemGroup {
  const v = value as Partial<DropDownItemGroup>;
  return v.items !== undefined;
}

export const DropDownButton = memo(DropDownComponent);
