import type { useFormFieldContext } from "../components/Form/FormField";
import type { InputState } from "../components/Input/Input";

export const getFormSate = (
  context: ReturnType<typeof useFormFieldContext>,
  isDisabled?: boolean,
): InputState => {
  if (context?.disabled || isDisabled) {
    return "disabled";
  }
  if (context?.error) {
    return "error";
  }
  if (context?.success) {
    return "success";
  }
  return "default";
};
