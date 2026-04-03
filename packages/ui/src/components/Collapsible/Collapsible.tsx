import { cva, type VariantProps } from "class-variance-authority";
import {
  memo,
  useRef,
  type PropsWithChildren,
} from "react";
import {
  useCollapsible,
  type OpenChangeDetails,
} from "../../hooks/useCollapsible";
import { cn } from "../../utlis/cn";
import { createRequiredContext } from "../../utlis/createRequiredContext";
import { Icon } from "../Icons";

const collapsibleContainer = cva("ui:flex ui:flex-col ui:p-2 ui:gap-1", {
  variants: {
    height: {
      sm: "ui:max-h-40",
      md: "ui:max-h-80",
      lg: "ui:max-h-120",
      auto: "ui:max-h-fit",
      full: "ui:max-h-full",
    },
    width: {
      sm: "ui:w-40",
      md: "ui:w-80",
      lg: "ui:w-120",
      auto: "ui:w-fit",
      full: "ui:w-full",
    },
    variant: {
      default: "",
      container: "ui:border ui:border-ui-border ui:rounded-sm",
    },
  },
  defaultVariants: {
    height: "auto",
    width: "full",
    variant: "default",
  },
});

export type CollapsibleHeight = NonNullable<
  VariantProps<typeof collapsibleContainer>
>["height"];
export type CollapsibleWidth = NonNullable<
  VariantProps<typeof collapsibleContainer>
>["width"];
export type CollapsibleVariant = NonNullable<
  VariantProps<typeof collapsibleContainer>
>["variant"];

export interface CollapsibleProps extends PropsWithChildren {
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (details: OpenChangeDetails) => void;
  open?: boolean;
  height?: CollapsibleHeight;
  width?: CollapsibleWidth;
  variant?: CollapsibleVariant;
  title: string;
  className?: string;
}

type CollapsibleContextValue = Omit<
  CollapsibleProps,
  "children" | "onOpenChange" | "className"
> & {
  toggleCollapsible: (open?: boolean) => void;
  isOpen: boolean;
  collapsibleRef?: React.RefObject<HTMLDivElement | null>;
  contentHeight?: number;
};

const [CollapsibleContext, useCollapsibleContext] =
  createRequiredContext<CollapsibleContextValue>(
    "useCollapsibleContext can only be used within a Collapsible Component",
);

function CollapsibleComponent({
  defaultOpen,
  disabled,
  onOpenChange,
  open,
  height,
  width,
  variant,
  title,
  className,
  children,
}: CollapsibleProps) {
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const { isOpen, toggleCollapsible, contentHeight } = useCollapsible(
    defaultOpen,
    onOpenChange,
    collapsibleRef,
  );

  const containerStyle = collapsibleContainer({ height, width, variant });

  return (
    <CollapsibleContext.Provider
      value={{
        disabled,
        toggleCollapsible,
        open,
        isOpen,
        height,
        width,
        title,
        variant,
        collapsibleRef,
        contentHeight,
      }}
    >
      <section className={cn(containerStyle, className)}>
        <CollapsibleComponent.Indicator />
        {isOpen && variant === "default" && (
          <div className="ui:seperator-ui-border" />
        )}
        <CollapsibleComponent.Content>{children}</CollapsibleComponent.Content>
      </section>
    </CollapsibleContext.Provider>
  );
}

CollapsibleComponent.Indicator = function CollapsibleIndicator() {
  const context = useCollapsibleContext();
  const { title, isOpen, toggleCollapsible, open, disabled } = context;

  return (
    <div
      className={cn(
        "ui:flex ui:flex-row ui:w-full ui:items-center ui:justify-between",
        "ui:text-label-md ui:font-semibold",
        !disabled
          ? "ui:text-ui-fg ui:hover:text-ui-primary ui:cursor-pointer"
          : "ui:text-ui-fg-muted ui:cursor-not-allowed",
      )}
      onClick={() => toggleCollapsible(open)}
    >
      <span className="ui:text-inherit">{title}</span>
      <div
        className={cn(
          isOpen ? "ui:rotate-180" : "ui:rotate-0",
          "ui:transition-transform",
          "ui:duration-150",
        )}
      >
        <Icon icon={"angleDown"} size={"md"} color={"inherit"} />
      </div>
    </div>
  );
};

CollapsibleComponent.Content = function CollapsibleContent({
  children,
}: PropsWithChildren) {
  const context = useCollapsibleContext();
  const { collapsibleRef, contentHeight } = context;
  return (
    <div
      className={cn(
        "ui:w-full ui:overflow-auto ui:transition-[height] ui:duration-300 ui:ease-in-out",
      )}
      style={{ height: contentHeight }}
    >
      <div className="ui:mt-2" ref={collapsibleRef}>
        {children}
      </div>
    </div>
  );
};

export const Collapsible = memo(CollapsibleComponent);
