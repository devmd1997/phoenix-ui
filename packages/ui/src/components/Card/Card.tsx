import { cva, type VariantProps } from "class-variance-authority";
import { Stack, type StackProps } from "../Stack";
import { memo, type PropsWithChildren } from "react";
import type { ResponsiveProp } from "../../types";
import { useResponsiveVariantClass } from "../../hooks/useResponsiveVariants";
import { Text } from "../Text";
import { createRequiredContext } from "../../utlis/createRequiredContext";

const cardContainerVariant = cva("", {
  variants: {
    border: {
      true: "ui:border ui:border-ui-border",
      false: "",
    },
    elevated: {
      true: "ui:shadow",
      false: "",
    },
    rounded: {
      true: "ui:rounded-md",
      false: "",
    },
    surface: {
      default: "ui:bg-ui-surface",
      subtle: "ui:bg-ui-bg",
    },
    maxWidth: {
      sm: "ui:max-w-50",
      md: "ui:max-w-100",
      lg: "ui:max-w-200",
      xl: "ui:max-w-300",
      full: "ui:max-w-full",
    },
  },
  defaultVariants: {
    border: true,
    elevated: false,
    rounded: true,
    surface: "default",
    maxWidth: "md",
  },
});

type CardContainerVariants = NonNullable<
  VariantProps<typeof cardContainerVariant>
>;
export type CardContainerSurface = CardContainerVariants["surface"];
export type CardContainerMaxWidth = CardContainerVariants["maxWidth"];

export type CardHeaderSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type CardHeaderProps = {
  title: string;
  size?: CardHeaderSize;
};
export type CardBodyProps = StackProps & {
  header?: React.ReactNode | CardHeaderProps;
  description?: string;
  footer?: React.ReactNode;
};

export interface CardProps extends PropsWithChildren {
  border?: boolean;
  elevated?: boolean;
  rounded?: boolean;
  surface?: CardContainerSurface;
  maxWidth?: CardContainerMaxWidth;
  content?: CardBodyProps;
  responsive?: ResponsiveProp<CardContainerMaxWidth>;
}

type CardContextValue = {
  content?: CardBodyProps;
  children?: React.ReactNode;
};

const [CardContext, useCardContext] = createRequiredContext<CardContextValue>(
  "Card Context must be used within a Card Component",
);

function CardComponent({
  content,
  responsive,
  children,
  ...styles
}: CardProps) {
  const cardContainerStyles = useResponsiveVariantClass({
    variants: cardContainerVariant,
    base: {
      border: styles.border,
      elevated: styles.elevated,
      rounded: styles.rounded,
      surface: styles.surface,
      maxWidth: styles.maxWidth,
    },
    responsive: responsive,
    toVariantProps: (responsiveSize: CardContainerMaxWidth) => ({
      maxWidth: responsiveSize,
    }),
  });

  return (
    <CardContext.Provider value={{ content, children }}>
      <div className={cardContainerStyles}>
        <CardComponent.Body />
      </div>
    </CardContext.Provider>
  );
}

CardComponent.Header = function CardHeader() {
  const context = useCardContext();
  if (!context.content || !context.content.header) {
    return null;
  }

  const { header } = context.content;
  if (isCardHeaderProps(header)) {
    return <Text variant={header.size}>{header.title}</Text>;
  } else {
    return <div>{header}</div>;
  }
};

CardComponent.Body = function CardBody() {
  const context = useCardContext();
  if (!context.content) {
    return null;
  }
  const { header, description, footer, gap, direction, ...stackProps } =
    context.content;

  return (
    <Stack
      gap={gap ?? "sm"}
      direction={direction ?? "vertical"}
      {...stackProps}
    >
      <CardComponent.Header />
      {description && (
        <Text variant={"body-sm"} tone={"muted"}>
          {description}
        </Text>
      )}
      {context.children}
      {footer}
    </Stack>
  );
};

function isCardHeaderProps(
  value?: React.ReactNode | CardHeaderProps,
): value is CardHeaderProps {
  if (!value || typeof value !== "object") return false;
  const v = value as CardHeaderProps;
  return (
    typeof v.title === "string" &&
    (v.size === undefined ||
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes(v.size))
  );
}

export const Card = memo(CardComponent);
