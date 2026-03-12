import { cva, type VariantProps } from "class-variance-authority";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { cn } from "../../utlis/cn";
import { Text, type TextVariant } from "../Text";
import { Stack } from "../Stack";
import { Icon } from "../Icons";
import { Button } from "../Button";

const modalVariants = cva(
  "ui:relative ui:z-modal ui:w-full ui:rounded-md ui:drop-shadow-sm ui:bg-ui-surface ui:flex ui:flex-col",
  {
    variants: {
      size: {
        sm: "ui:w-100 ui:max-w-100 ui:p-2 ui:gap-2",
        md: "ui:w-200 ui:max-w-200 ui:p-3 ui:gap-3",
        lg: "ui:w-400 ui:max-2-400 ui:p-4 ui:gap-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ModalSize = NonNullable<VariantProps<typeof modalVariants>["size"]>;

export interface ModalFooter {
  cancelButtonLabel?: string;
  submitButtonLabel: string;
  onSubmit: () => void;
}

export interface ModalProps extends PropsWithChildren {
  title?: string;
  visible: boolean;
  size?: ModalSize;
  onDismiss?: () => void;
  footer?: ModalFooter;
}

type ModalContextType = {
  visible: boolean;
  handleVisability: (visability: boolean) => void;
  footer?: ModalFooter;
  title?: string;
  size?: ModalSize;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw Error("Component can only be used in a ModalComponent");
  }
  return context;
};

function ModalComponent({
  title,
  visible,
  size,
  onDismiss,
  footer,
  children,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(visible);

  const handleVisability = useCallback(
    (visabilityState: boolean) => {
      setIsVisible((prev) => {
        if (prev && onDismiss) {
          onDismiss();
        }
        return visabilityState;
      });
    },
    [onDismiss],
  );

  useEffect(() => {
    setIsVisible(visible);
  }, [visible, setIsVisible]);

  return (
    <ModalContext.Provider
      value={{ visible: isVisible, handleVisability, title, footer, size }}
    >
      <ModalComponent.Overlay>
        <ModalComponent.Content>{children}</ModalComponent.Content>
      </ModalComponent.Overlay>
    </ModalContext.Provider>
  );
}

ModalComponent.Overlay = function ModalOverlay(props: PropsWithChildren) {
  const context = useModalContext();
  const { visible, handleVisability } = context;

  return (
    <div
      className={cn([
        "ui:fixed",
        "ui:inset-0",
        "ui:z-modal",
        "ui:flex",
        "ui:items-center",
        "ui:justify-center",
        "ui:bg-black/25",
        "ui:p-4",
        "ui:overflow-y-auto",
        "ui:pointer-events-auto",
        "ui:w-full",
        visible
          ? "ui:visible ui:overflow-y-hidden"
          : "ui:hidden ui:pointer-events-none",
      ])}
      onClick={() => handleVisability(false)}
    >
      {props.children}
    </div>
  );
};

type ModalTitleSize = Record<ModalSize, TextVariant>;
const titleSizes: ModalTitleSize = {
  sm: "h6",
  md: "h5",
  lg: "h4",
};
ModalComponent.Content = function ModalContent(props: PropsWithChildren) {
  const context = useModalContext();
  const modalSize = modalVariants({ size: context.size });
  return (
    <div
      className={modalSize}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ModalComponent.Header />
      {props.children}
      <ModalComponent.Footer />
    </div>
  );
};

ModalComponent.Header = function ModalHeader() {
  const context = useModalContext();
  const { size, title, handleVisability } = context;
  const titleSize = titleSizes[size ?? "md"];

  return (
    <Stack
      gap={"md"}
      direction={"horizontal"}
      crossAxisAlignment={"center"}
      mainAxisAlignment={"spaceBetween"}
      width={"full"}
    >
      {title && (
        <div className="ui:flex-1">
          <Text variant={titleSize} tone={"default"}>
            {title}
          </Text>
        </div>
      )}
      <div className="ui:flex ui:justify-end ui:items-center">
        <div
          className="ui:cursor-pointer ui:text-ui-fg-muted ui:hover:text-ui-primary"
          onClick={() => {
            handleVisability(false);
          }}
        >
          <Icon icon={"close"} size={"md"} color={"inherit"} />
        </div>
      </div>
    </Stack>
  );
};

ModalComponent.Footer = function ModalFooter() {
  const context = useModalContext();
  const { footer, handleVisability, size } = context;
  if (!footer) {
    return <></>;
  }

  return (
    <Stack
      gap={"sm"}
      direction={"horizontal"}
      crossAxisAlignment={"center"}
      mainAxisAlignment={"end"}
      width={"full"}
    >
      {footer.cancelButtonLabel && (
        <Button
          size={size}
          variant={"outline"}
          intent={"secondary"}
          label={footer.cancelButtonLabel}
          onClick={() => {
            handleVisability(false);
          }}
        />
      )}
      <Button
        size={size}
        variant={"solid"}
        intent={"primary"}
        label={footer.submitButtonLabel}
        onClick={footer.onSubmit}
      />
    </Stack>
  );
};

export const Modal = memo(ModalComponent);
