import { useState } from "react";
import type { ChangeValueDetails } from "../components/Input/TagInput";

export const useTagValues = (
  initialValues?: string[],
  onHandleValueChange?: (details: ChangeValueDetails) => void,
) => {
  const [values, setValues] = useState(initialValues ?? []);

  const removeValue = (indexToRemove: number) => {
    const newValues = values.filter((_, index) => index !== indexToRemove);
    setValues(newValues);
    if (onHandleValueChange) {
      onHandleValueChange({ values: newValues });
    }
  };

  const addValues = (...newValues: string[]) => {
    const combinedValues = [...values, ...newValues];
    setValues(combinedValues);
    if (onHandleValueChange) {
      onHandleValueChange({ values: combinedValues });
    }
  };
  return { values, setValues, removeValue, addValues };
};
