import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utlis/cn";
import { Icon } from "../Icons";

const tagComponentVariants = cva(
  "ui:flex ui:flex-row ui:items-center ui:gap-1 ui:rounded-sm ui:border",
  {
    variants: {
      size: {
        sm: "ui:p-1 ui:text-label-xs",
        md: "ui:p-2 ui:text-body-sm",
        lg: "ui:p-3 ui:text-body-md",
      },
      disabled: {
        true: "ui:text-ui-fg-muted ui:bg-ui-disabled ui:border-ui-disabled ui:cursor-not-allowed",
        false:
          "ui:text-ui-fg ui:bg-ui-surface ui:border-ui-border ui:hover:bg-ui-primary/60 ui:hover:text-ui-fg-surface ui:hover:border-ui-primary ui:cursor-pointer",
      },
    },
  },
);

export type TagComponentSize = NonNullable<
  VariantProps<typeof tagComponentVariants>
>["size"];

export interface TagProps {
  id: string | number;
  value: string;
  disabled?: boolean;
  size?: TagComponentSize;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
}

export function Tag(props: TagProps) {
  const style = tagComponentVariants({
    size: props.size,
    disabled: props.disabled ?? false,
  });

  const Tag = (props.as ?? "span") as React.ElementType;

  return (
    <Tag
      key={props.id}
      className={cn(style, props.className)}
      onClick={props.onClick}
    >
      <span className="ui:text-inherit">{props.value}</span>
      <Icon icon={"close"} size={props.size} color={"inherit"} />
    </Tag>
  );
}
