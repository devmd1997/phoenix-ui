import { useEffect, useState } from "react";

export interface OpenChangeDetails {
  open: boolean;
}

export const useCollapsible = (
  initalOpen?: boolean,
  onOpenChange?: (details: OpenChangeDetails) => void,
  collapsibleRef?: React.RefObject<HTMLDivElement | null>,
) => {
  const [isOpen, setIsOpen] = useState(initalOpen ?? false);
  const [height, setHeight] = useState<number | undefined>(
    initalOpen ? undefined : 0,
  );

  useEffect(() => {
    if (!height || !isOpen || !collapsibleRef?.current) return;

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(collapsibleRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHeight(collapsibleRef?.current?.getBoundingClientRect().height);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const toggleCollapsible = (open?: boolean) => {
    const collapisbleState = open === undefined ? !isOpen : open;
    setIsOpen(collapisbleState);
    if (onOpenChange) {
      onOpenChange({ open: collapisbleState });
    }
  };

  return { isOpen, toggleCollapsible, contentHeight: height };
};
