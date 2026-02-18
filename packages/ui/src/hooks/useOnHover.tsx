import { useCallback, useState } from "react";

type HoverHandlers = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function useOnHover(onHover?: (active: boolean) => void) {
  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHover?.(true);
  }, [onHover]);
  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHover?.(false);
  }, [onHover]);

  return {
    isHovered,
    hoverHandlers: { onMouseEnter, onMouseLeave } as HoverHandlers,
  };
}
