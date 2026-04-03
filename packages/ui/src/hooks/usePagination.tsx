import { useCallback, useEffect, useState } from "react";

export interface PageChangeDetails<TItem> {
  page: number;
  items: TItem[];
}

export interface PageSizeChangeDetails<TItem> {
  pageSize: number;
  page: number;
  items: TItem[];
}

export function usePagination<TItem>(
  count: number,
  siblingCount: number,
  initialPage?: number,
  initialPageSize?: number,
  items?: TItem[],
  onPageChange?: (details: PageChangeDetails<TItem>) => void,
  onPageSizeChange?: (details: PageSizeChangeDetails<TItem>) => void,
) {
  const [currentPage, setCurrentPage] = useState(initialPage ?? 0);
  const [pageSize, setPageSize] = useState(initialPageSize ?? 10);
  const [totalPages, setTotalPages] = useState(Math.ceil(count / pageSize));

  useEffect(() => {
    setTotalPages(Math.ceil(count / pageSize));
  }, [count, pageSize]);

  const pageRange = useCallback(() => {
    return getPageRange(currentPage, totalPages, siblingCount);
  }, [currentPage, totalPages, siblingCount]);

  const visibleItems = useCallback(() => {
    if (!items) return [];
    return getVisibleItems(items, pageSize, currentPage);
  }, [items, pageSize, currentPage]);

  const goToPage = (page: number) => {
    let nextPage = page;
    if (nextPage < 1) nextPage = 1;
    if (nextPage > totalPages) nextPage = totalPages;
    setCurrentPage(nextPage);
    if (onPageChange) {
      onPageChange({ page: nextPage, items: visibleItems() });
    }
  };
  const changePageSize = (size: number) => {
    setPageSize(size);
    if (onPageSizeChange) {
      onPageSizeChange({
        page: currentPage,
        pageSize: size,
        items: visibleItems(),
      });
    }
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    pageRange,
    visibleItems,
    goToPage,
    changePageSize,
  };
}

function getVisibleItems<TItem>(
  items: TItem[],
  pageSize: number,
  page: number,
) {
  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  return items.slice(startRange, endRange);
}

export function getPageRange(
  page: number,
  totalPages: number,
  sibilingCount: number,
) {
  const allPages = Array.from(
    { length: totalPages },
    (_, index) => `${index + 1}`,
  );
  const rangeLength = sibilingCount * 2 + 3;
  const pageIndexArray = [];
  if (rangeLength + sibilingCount >= totalPages) {
    pageIndexArray.push(...allPages);
  } else if (page < rangeLength) {
    pageIndexArray.push(...allPages.slice(0, rangeLength));
    if (rangeLength < totalPages) {
      pageIndexArray.push("", allPages[totalPages - 1]);
    }
  } else {
    pageIndexArray.push(
      "1",
      "",
      ...allPages.slice(page - 1 - sibilingCount, page - 1 + sibilingCount),
    );
    if (page < totalPages - rangeLength) {
      pageIndexArray.push("", allPages[totalPages - 1]);
    }
  }
  return pageIndexArray;
}
