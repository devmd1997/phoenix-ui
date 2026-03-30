import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Space } from "../../types/spacing.types";
import { GAP_ALL } from "../../types/spacing.types";
import { cn } from "../../utlis/cn";

const groupGapClasses: Record<Space, string> = GAP_ALL;

type GroupChildProps = {
  className?: string;
};

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  gap?: Space;
  attached?: boolean;
  grow?: boolean;
}

function getAttachedChildClasses(index: number, total: number) {
  if (total <= 1) {
    return "";
  }

  if (index === 0) {
    return "ui:relative ui:z-0 hover:ui:z-10 focus-within:ui:z-10 hover:ui:-mr-px focus-within:ui:-mr-px ui:rounded-r-none";
  }

  if (index === total - 1) {
    return "ui:relative ui:z-0 hover:ui:z-10 focus-within:ui:z-10 ui:-ml-px ui:rounded-l-none";
  }

  return "ui:relative ui:z-0 hover:ui:z-10 focus-within:ui:z-10 hover:ui:-mr-px focus-within:ui:-mr-px ui:-ml-px ui:rounded-none";
}

function GroupComponent({
  children,
  gap = "sm",
  attached = false,
  grow = false,
  className,
  ...props
}: GroupProps) {
  const childArray = Children.toArray(children);
  const content = childArray.map((child, index) => {
    if (!isValidElement(child)) {
      return child;
    }

    const element = child as ReactElement<GroupChildProps>;
    const childClassName = cn(
      grow && "ui:flex-1 ui:min-w-0",
      attached && getAttachedChildClasses(index, childArray.length),
      element.props.className,
    );

    return cloneElement(element, {
      className: childClassName,
    });
  });

  return (
    <div
      className={cn(
        "ui:flex ui:flex-row",
        attached && "ui:isolate",
        grow && "ui:w-full ui:items-stretch",
        attached ? "ui:gap-0" : groupGapClasses[gap],
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
}

export const Group = memo(GroupComponent);
Group.displayName = "Group";
