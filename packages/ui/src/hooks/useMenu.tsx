import { useState } from "react";

export interface MenuChangeDetails<TItem> {
  isOpen: boolean;
  items: TItem[];
}

export function useMenu<TItem>(
  items: TItem[],
  initialOpen?: boolean,
  onMenuChange?: (details: MenuChangeDetails<TItem>) => void,
) {
  const [isOpen, setIsOpen] = useState(initialOpen ?? false);

  const toggleMenu = (open?: boolean) => {
    const openedState = open !== undefined ? open : !isOpen;
    setIsOpen(openedState);

    if (onMenuChange) {
      onMenuChange({ isOpen: openedState, items });
    }
  };

  return { isOpen, toggleMenu };
}
