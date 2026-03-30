import { useState } from "react";
import type { InputValueChangeDetails } from "../components/Input/TagInput";

export const useInputValue = (
  initialValue?: string,
  onHandleInputChange?: (details: InputValueChangeDetails) => void,
) => {
  const [inputValue, setInputValue] = useState(initialValue ?? "");

  const handleInputChange = (details: InputValueChangeDetails) => {
    setInputValue(details.value);
    if (onHandleInputChange) {
      onHandleInputChange(details);
    }
  };
  return { inputValue, setInputValue, handleInputChange };
};
