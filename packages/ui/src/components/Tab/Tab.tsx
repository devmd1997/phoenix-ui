import { cva, type VariantProps } from "class-variance-authority";
import { useTabs } from "../../hooks/useTabs";
import { memo, useEffect, useId, useState } from "react";
import { createRequiredContext } from "../../utlis/createRequiredContext";
import { cn } from "../../utlis/cn";
import { Icon, type IconVariant } from "../Icons/Icon";
import { motion } from "framer-motion";

const tabIndicatorVariants = cva("ui:absolute ui:z-10", {
  variants: {
    variant: {
      underline: "ui:bg-ui-primary",
      ghost: "ui:inset-0 ui:rounded-sm ui:bg-ui-primary/40",
      subtle: "ui:inset-0 ui:rounded-sm ui:bg-ui-primary",
      plain: "",
    },
    direction: {
      horizontal: "",
      vertical: "",
    },
  },
  compoundVariants: [
    {
      direction: "horizontal",
      variant: "underline",
      className: "ui:-bottom-0.5 ui:left-0 ui:right-0 ui:h-1",
    },
    {
      direction: "vertical",
      variant: "underline",
      className: "ui:-right-0.5 ui:top-0 ui:bottom-0 ui:w-1",
    },
  ],
  defaultVariants: {
    variant: "underline",
    direction: "horizontal",
  },
});

const tabContainerVariants = cva(
  "ui:gap-3 ui:items-center ui:justify-between",
  {
    variants: {
      variant: {
        underline: "",
        ghost: "",
        subtle: "ui:bg-ui-bg ui:rounded-sm ui:p-1",
        plain: "",
      },
      direction: {
        horizontal: "ui:flex ui:flex-row",
        vertical: "ui:flex ui:flex-col",
      },
      width: {
        full: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      {
        direction: "horizontal",
        variant: "underline",
        className: "ui:border-b-2 ui:border-ui-border",
      },
      {
        direction: "vertical",
        variant: "underline",
        className: "ui:border-r-2 ui:border-ui-border",
      },
      {
        direction: "horizontal",
        width: "sm",
        className: "ui:min-w-200",
      },
      {
        direction: "horizontal",
        width: "md",
        className: "ui:min-w-400",
      },
      {
        direction: "horizontal",
        width: "lg",
        className: "ui:min-w-800",
      },
      {
        direction: "horizontal",
        width: "full",
        className: "ui:w-full",
      },
      {
        direction: "vertical",
        width: "sm",
        className: "ui:min-h-50",
      },
      {
        direction: "vertical",
        width: "md",
        className: "ui:min-h-100",
      },
      {
        direction: "vertical",
        width: "lg",
        className: "ui:min-h-150",
      },
      {
        direction: "vertical",
        width: "full",
        className: "ui:h-full",
      },
    ],
    defaultVariants: {
      variant: "underline",
      direction: "horizontal",
      width: "full",
    },
  },
);

const tabItemVariants = cva(
  "ui:relative ui:flex ui:flex-row ui:gap-1 ui:items-center ui:w-full ui:text-ui-fg-muted ui:hover:not-active:text-ui-primary/80 ui:cursor-pointer ui:disabled:cursor-not-allowed ui:disabled:text-ui-disabled",
  {
    variants: {
      variant: {
        underline: "ui:active:not-disabled:text-ui-primary",
        ghost: "ui:active:not-disabled:text-ui-primary",
        subtle: "ui:active:not-disabled:text-ui-fg-surface",
        plain: "ui:active:not-disabled:text-ui-primary",
      },
      size: {
        sm: "ui:text-label-xs ui:p-1",
        md: "ui:text-label-sm ui:p-2",
        lg: "ui:text-label-md ui:p-3",
      },
      align: {
        left: "ui:justify-start",
        right: "ui:justify-end",
        center: "ui:justify-center",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
      align: "center",
    },
  },
);

export type TabVariants = NonNullable<
  VariantProps<typeof tabContainerVariants>
>["variant"];
export type TabDirection = NonNullable<
  VariantProps<typeof tabContainerVariants>
>["direction"];
export type TabWidth = NonNullable<
  VariantProps<typeof tabContainerVariants>
>["width"];
export type TabItemSize = NonNullable<
  VariantProps<typeof tabItemVariants>
>["size"];
export type TabItemAlignment = NonNullable<
  VariantProps<typeof tabItemVariants>
>["align"];

type TabContextValue = {
  activeTabIndex: number;
  activeTabItem?: TabItem;
  emptyStateContent?: React.ReactNode;
  controlledActiveTabIndex?: number;
  navigateToTab: (tabIndex: number) => void;
  variant?: TabVariants;
  tabItemSize?: TabItemSize;
  tabItemAlignment?: TabItemAlignment;
  groupDirection?: TabDirection;
  tabWidth?: TabWidth;
  layoutId: string;
};

const [TabContext, useTabContext] = createRequiredContext<TabContextValue>(
  "useTabContext must be used within a Tab component",
);
export interface TabItem {
  icon?: IconVariant;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabProps {
  items: TabItem[];
  defaultActiveTab?: number;
  activeTab?: number;
  emptyStateContent?: React.ReactNode;
  variant?: TabVariants;
  groupDirection?: TabDirection;
  width?: TabWidth;
  tabItemSize?: TabItemSize;
  tabItemAlignment?: TabItemAlignment;
}

function TabComponent({
  items,
  defaultActiveTab,
  activeTab,
  emptyStateContent,
  variant,
  groupDirection = "horizontal",
  width,
  tabItemSize,
  tabItemAlignment,
}: TabProps) {
  const { currentTab, navigateToTab } = useTabs(items, defaultActiveTab);
  const layoutId = useId();

  return (
    <TabContext.Provider
      value={{
        activeTabIndex: currentTab,
        activeTabItem: currentTab >= 0 ? items[currentTab] : undefined,
        controlledActiveTabIndex: activeTab,
        navigateToTab,
        variant,
        tabItemSize,
        tabItemAlignment,
        groupDirection,
        tabWidth: width,
        layoutId,
        emptyStateContent,
      }}
    >
      <section
        className={cn(
          "ui:flex ui:gap-3",
          groupDirection === "horizontal" ? "ui:flex-col" : "ui:flex-row",
        )}
        role="tab-outter-container"
      >
        <TabComponent.TabContainer items={items} />
        <TabComponent.Content />
      </section>
    </TabContext.Provider>
  );
}

interface TabContainerProps {
  items: TabItem[];
}
TabComponent.TabContainer = function TabContainer(props: TabContainerProps) {
  const context = useTabContext();
  const { tabWidth, groupDirection, variant } = context;

  const style = tabContainerVariants({
    variant,
    width: tabWidth,
    direction: groupDirection,
  });

  return (
    <div className={style} role="tab-group-container">
      {props.items.map((tab, index) => (
        <TabComponent.TabItem {...tab} key={index} index={index} />
      ))}
    </div>
  );
};

interface TabItemProps extends TabItem {
  key: number;
  index: number;
}

TabComponent.TabItem = function TabItem(props: TabItemProps) {
  const context = useTabContext();
  const {
    tabItemSize,
    tabItemAlignment,
    navigateToTab,
    activeTabIndex,
    variant,
  } = context;
  const [isActive, setIsActive] = useState(false);
  const style = tabItemVariants({
    size: tabItemSize,
    align: tabItemAlignment,
    variant,
  });

  useEffect(() => {
    activeTabIndex === props.index ? setIsActive(true) : setIsActive(false);
  }, [activeTabIndex]);

  return (
    <button
      key={props.key}
      onClick={() => navigateToTab(props.index)}
      className={style}
      disabled={props.disabled}
      data-active={isActive ? "true" : "false"}
    >
      <div className="ui:relative ui:z-20">
        {props.icon && (
          <Icon icon={props.icon} size={tabItemSize} color={"inherit"} />
        )}
      </div>
      <div className="ui:relative ui:z-20">{props.label}</div>

      {isActive && !props.disabled && <TabComponent.Indicator />}
    </button>
  );
};

TabComponent.Indicator = function TabIndicator() {
  const context = useTabContext();
  const { variant, layoutId, groupDirection } = context;
  const style = tabIndicatorVariants({ variant, direction: groupDirection });

  return <motion.div className={style} layoutId={layoutId} />;
};

TabComponent.Content = function TabContent() {
  const context = useTabContext();
  const { activeTabItem, emptyStateContent } = context;
  const renderContent = () => {
    if (!activeTabItem || activeTabItem.disabled) {
      return emptyStateContent ? emptyStateContent : <div></div>;
    }
    return activeTabItem.content;
  };
  return <div className="ui:flex ui:w-full">{renderContent()}</div>;
};

export const Tab = memo(TabComponent);
