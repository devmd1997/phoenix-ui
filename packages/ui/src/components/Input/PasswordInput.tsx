import { memo, useCallback, useEffect, useState } from "react";
import { IconButton } from "../Button";
import { Input, type InputProps } from "./Input";
import { InputGroup } from "./InputGroup";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

function PasswordInputComponent({
  visible,
  onVisibleChange,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(visible ?? false);

  useEffect(() => {
    if (visible) {
      setIsVisible(visible);
    }
  }, [visible]);
  const toggleVisability = useCallback(() => {
    setIsVisible(!isVisible);
    if (onVisibleChange) {
      onVisibleChange(!isVisible);
    }
  }, [onVisibleChange]);
  return (
    <InputGroup
      inlineElement={{
        end: (
          <PasswordInputComponent.ShowPasswordButton
            visible={isVisible}
            onClick={toggleVisability}
          />
        ),
      }}
    >
      <Input {...props} type={isVisible ? "text" : "password"} />
    </InputGroup>
  );
}

interface VisibilityButtonProps {
  onClick: () => void;
  visible: boolean;
}
PasswordInputComponent.ShowPasswordButton = function VisibilityButton({
  visible,
  onClick,
}: VisibilityButtonProps) {
  return (
    <IconButton
      icon={visible ? "eyeSlash" : "eye"}
      intent={"secondary"}
      variant={"ghost"}
      onClick={onClick}
      size={"md"}
    />
  );
};

export const PasswordInput = memo(PasswordInputComponent);
