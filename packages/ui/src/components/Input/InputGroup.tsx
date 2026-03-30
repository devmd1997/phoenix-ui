import { createContext, useContext, type PropsWithChildren } from "react";
import { Icon, type IconVariant } from "../Icons/Icon";
import { Group } from "../Group";
import { isIconVariant } from "../../types/typeGuards";
import { Text } from "../Text";
import { cn } from "../../utlis/cn";

export type InputInlineElementType = string | IconVariant | React.ReactNode;
export type InputAddOnElementType = string | IconVariant;
export interface InputInlineElement {
  start?: InputInlineElementType;
  end?: InputInlineElementType;
}

export interface InputAddOnElement {
  start?: InputAddOnElementType;
  end?: InputAddOnElementType;
}

export interface InputGroupProps extends PropsWithChildren {
  inlineElement?: InputInlineElement;
  addOnElement?: InputAddOnElement;
}

type InputGroupContextValue = {
  inlineElement?: InputInlineElement;
};

const InputGroupContext = createContext<InputGroupContextValue | undefined>(
  undefined,
);

export function useInputGroupContext() {
  const context = useContext(InputGroupContext);
  return context;
}

export function InputGroup({
  children,
  inlineElement,
  addOnElement,
}: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={{ inlineElement }}>
      <Group attached>
        {addOnElement?.start && (
          <InputGroup.AddOn addOn={addOnElement?.start} />
        )}
        {children}
        {addOnElement?.end && <InputGroup.AddOn addOn={addOnElement?.end} />}
      </Group>
    </InputGroupContext.Provider>
  );
}

InputGroup.AddOn = function InputAddOn({
  addOn,
  className,
}: {
  addOn?: InputAddOnElementType;
  className?: string;
}) {
  if (!addOn) {
    return null;
  }
  if (isIconVariant(addOn)) {
    const element = <Icon size={"md"} icon={addOn} color={"inherit"} />;
    return renderAddOn(element, className);
  }
  if (typeof addOn === "string") {
    return renderAddOn(
      <Text variant={"label-md"} weight={"normal"} tone={"inherit"}>
        {addOn}
      </Text>,
      className,
    );
  }

  return null;
};

function renderAddOn(element: React.ReactNode, className?: string) {
  return (
    <div
      className={cn(
        "ui:inline-flex ui:items-center ui:justify-center ui:bg-ui-bg ui:text-ui-fg ui:px-3 ui:rounded-sm ui:border ui:border-ui-border",
        className,
      )}
    >
      {element}
    </div>
  );
}
