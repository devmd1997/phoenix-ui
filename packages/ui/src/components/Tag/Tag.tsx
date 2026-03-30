import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utlis/cn";
import { Icon } from "../Icons";

const tagComponentVariants = cva(
  "ui:inline-flex ui:flex-row ui:w-fit ui:items-center ui:gap-1 ui:rounded-sm ui:border ui:cursor-pointer ui:disabled:cursor-not-allowed ui:disabled:pointer-events-none",
  {
    variants: {
      size: {
        sm: "ui:p-1 ui:text-caption",
        md: "ui:p-2 ui:text-label-xs",
        lg: "ui:p-3 ui:text-label-sm",
      },
      variant: {
        subtle:
          "ui:text-ui-fg ui:bg-ui-bg ui:border-transparent ui:hover:bg-ui-primary/40 ui:disabled:bg-ui-disabled/40 ui:disabled:text-ui-fg-muted",
        solid:
          "ui:text-ui-fg ui:bg-ui-bg ui:border-transparent ui:hover:bg-ui-primary ui:hover:text-ui-fg-surface ui:disabled:bg-ui-disabled ui:disabled:text-ui-fg-muted",
        outline:
          "ui:text-ui-fg ui:bg-ui-surface ui:border-ui-border ui:hover:border-ui-primary ui:hover:text-ui-primary ui:disabled:border-ui-disabled ui:disabled:text-ui-fg-muted",
        surface:
          "ui:text-ui-fg ui:bg-ui-bg ui:border-ui-border ui:hover:bg-ui-primary/60 ui:hover:border-ui-primary/60 ui:hover:text-ui-fg-surface ui:disabled:border-ui-disabled",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "outline",
    },
  },
);

export type TagComponentSize = NonNullable<
  VariantProps<typeof tagComponentVariants>
>["size"];

export type TagComponentVariant = NonNullable<
  VariantProps<typeof tagComponentVariants>
>["variant"];

export interface TagProps {
  id: string | number;
  value: string;
  disabled?: boolean;
  size?: TagComponentSize;
  className?: string;
  as?: React.ElementType;
  variant?: TagComponentVariant;
  closable?: boolean;
  onClick?: () => void;
  maxWidth?: string;
}

export function Tag(props: TagProps) {
  const style = tagComponentVariants({
    size: props.size,
    variant: props.variant,
  });

  return (
    <button
      key={props.id}
      className={cn(style, props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ maxWidth: props.maxWidth }}
    >
      <span className={cn("ui:text-inherit ui:min-w-0 ui:flex-1 ui:truncate")}>
        {props.value}
      </span>
      {props.closable && <Icon icon={"close"} size={"md"} color={"inherit"} />}
    </button>
  );
}
