import { cva, type VariantProps } from "class-variance-authority";
import {
  usePagination,
  type PageChangeDetails,
  type PageSizeChangeDetails,
} from "../../hooks/usePagination";
import { createRequiredContext } from "../../utlis/createRequiredContext";
import { Icon, type IconVariant } from "../Icons/Icon";
import { memo } from "react";

const paginationLayoutVariants = cva("ui:flex ui:flex-row ui:gap-2", {
  variants: {
    width: {
      auto: "ui:w-fit",
      full: "ui:w-full",
    },
  },
});

const paginationItemVariants = cva(
  "ui:inline-flex ui:items-center ui:justify-center ui:text-center ui:cursor-pointer ui:rounded-sm",
  {
    variants: {
      size: {
        sm: "ui:text-label-xs ui:py-1 ui:px-2",
        md: "ui:text-label-sm ui:py-1.5 ui:px-3",
        lg: "ui:text-label-md ui:py-2 ui:px-4",
      },
      variant: {
        /**
         * Solid
         * inactive State: default border default text color no background
         * hover State: accent/60 border accent/60 background
         * active State: accent border accent background surface text
         */
        solid:
          "ui:border ui:border-ui-border ui:text-ui-fg ui:hover:not-active:bg-ui-accent/60 ui:hover:not-active:border-ui-accent/60 ui:active:bg-ui-accent ui:active:text-ui-fg-surface ui:active:border-ui-accent",
        /**
         * Outline
         * inactive State: default text no border no background
         * hover State: accent/60 text no border no background
         * active State: accent text accent border no background
         */
        outline:
          "ui:border ui:border-transparent ui:text-ui-fg ui:hover:not-active:text-ui-accent/60 ui:active:text-ui-accent ui:active:border-ui-accent",
        /**
         * Subtle
         * inactive State: no border accent text no background
         * hover State: no border accent text accent/20 background
         * active State: no border accent text accent/40 background
         */
        subtle:
          "ui:border ui:border-transparent ui:text-ui-accent/60 ui:hover:not-active:bg-ui-accent/20 ui:active:bg-ui-accent/40",
        /**
         * Surface
         * inactive State: no border default text default/40 background
         * hover State: accent/20 border accent text accent/20 background
         * active State: accent/40 border accent text accent/40 background
         */
        surface:
          "ui:border ui:border-transparent ui:text-ui-fg ui:bg-ui-bg/60 ui:hover:not-active:border-ui-accent/20 ui:hover:not-active:text-ui-accent ui:hover:not-active:bg-ui-accent/20 ui:active:border-ui-accent ui:active:bg-ui-accent/40",
        /**
         * Ghost
         * inactive State: no border default text no background
         * hover State: no border accent/60 text no background
         * active Staet: no border accent text accent/40 background
         */
        ghost:
          "ui:border ui:border-transparent ui:text-ui-fg ui:hover:not-active:text-ui-accent/60 ui:active:text-ui-accent ui:active:bg-ui-accent/40",
        /**
         * Plain
         * inactive State: no border default text no background
         * hover State: no border accent/60 text no background
         * active State: no border accent text no background
         */
        plain:
          "ui:border ui:border-transparent ui:text-ui-fg ui:hover:not-active:text-ui-accent/60 ui:active:text-ui-accent",
      },
    },
  },
);

export type PaginationWidth = NonNullable<
  VariantProps<typeof paginationLayoutVariants>
>["width"];
export type PaginationItemVariant = NonNullable<
  VariantProps<typeof paginationItemVariants>
>["variant"];
export type PageItemSize = NonNullable<
  VariantProps<typeof paginationItemVariants>
>["size"];

export interface PaginationItem<TItem> {
  items: TItem[];
  render: (item: TItem) => React.ReactNode;
}

export interface PaginationProps<TItem> {
  count: number;
  defaultPage?: number;
  activePage?: number;
  pageSize?: number;
  onPageChange?: (details: PageChangeDetails<TItem>) => void;
  onPageSizeChange?: (details: PageSizeChangeDetails<TItem>) => void;
  width?: PaginationWidth;
  variant?: PaginationItemVariant;
  size?: PageItemSize;
  siblingCount?: number;
  items?: PaginationItem<TItem>;
}

type PaginationContextValue = {
  count: number;
  currentPage: number;
  pageRange?: string[];
  visibleItems: unknown[];
  pageSize: number;
  totalPages: number;
  goToPage: (page: number) => void;
  changePageSize: (size: number) => void;
  width?: PaginationWidth;
  variant?: PaginationItemVariant;
  size?: PageItemSize;
};

const [PaginationContext, usePaginationContext] =
  createRequiredContext<PaginationContextValue>(
    "can only use PaginationContext in a Pagination Component",
  );

function PaginationComponent<TItem>({
  count,
  defaultPage,
  pageSize,
  siblingCount = 1,
  onPageChange,
  onPageSizeChange,
  width,
  variant,
  size,
  items,
}: PaginationProps<TItem>) {
  const {
    currentPage,
    pageSize: currentPageSize,
    totalPages,
    pageRange,
    visibleItems,
    goToPage,
    changePageSize,
  } = usePagination<TItem>(
    count,
    siblingCount,
    defaultPage,
    pageSize,
    items?.items,
    onPageChange,
    onPageSizeChange,
  );
  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        pageRange: pageRange(),
        totalPages,
        visibleItems: visibleItems(),
        goToPage,
        changePageSize,
        variant,
        width,
        size,
        count,
        pageSize: currentPageSize,
      }}
    >
      <div className="ui:flex ui:flex-col ui:gap-3">
        {items && <PaginationComponent.Content render={items.render} />}
        <PaginationComponent.PageIndicators />
      </div>
    </PaginationContext.Provider>
  );
}

PaginationComponent.PageIndicators = function PageIndicators() {
  const context = usePaginationContext();
  const { pageRange, width, currentPage, goToPage } = context;
  const style = paginationLayoutVariants({ width });

  return (
    <div role="pagination-indicator-layout" className={style}>
      <PaginationComponent.PageIndicatorItem
        key="pagination-navigate-left"
        label="<"
        onClick={() => {
          goToPage(currentPage - 1);
        }}
      />
      {pageRange?.map((page, index) => (
        <PaginationComponent.PageIndicatorItem
          value={page === "" ? undefined : parseInt(page)}
          label={page}
          key={`${index}`}
          onClick={() => {
            if (page !== "") {
              goToPage(parseInt(page));
            }
          }}
        />
      ))}
      <PaginationComponent.PageIndicatorItem
        key="pagination-navigate-right"
        label=">"
        onClick={() => {
          goToPage(currentPage + 1);
        }}
      />
    </div>
  );
};

interface PaginationIndicatorItemProps {
  value?: number;
  key: string;
  label: string;
  onClick?: () => void;
}

PaginationComponent.PageIndicatorItem = function PageIndicatorItem(
  props: PaginationIndicatorItemProps,
) {
  const context = usePaginationContext();
  const { variant, size, currentPage } = context;
  const style = paginationItemVariants({ variant, size });
  const isPageItem = props.value !== undefined;

  const renderIcon = (label: string) => {
    let icon: IconVariant = "ellipsisHorizontal";
    if (label === "<") {
      icon = "angleLeft";
    }
    if (label === ">") {
      icon = "angleRight";
    }
    return <Icon icon={icon} size={"md"} color={"inherit"} />;
  };

  return (
    <button
      data-active={currentPage === props.value ? "true" : "false"}
      key={props.key}
      className={style}
      onClick={props.onClick}
    >
      {isPageItem ? props.label : renderIcon(props.label)}
    </button>
  );
};

interface PaginationContentProps {
  render: (item: any) => React.ReactNode;
}
PaginationComponent.Content = function PaginationContent(
  props: PaginationContentProps,
) {
  const context = usePaginationContext();
  const { visibleItems } = context;

  return <>{visibleItems.map((item) => props.render(item))}</>;
};

export const Pagination = memo(PaginationComponent);
