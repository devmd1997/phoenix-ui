import { createContext, useContext } from "react";

export function createRequiredContext<T>(errorMessage: string) {
  const context = createContext<T | undefined>(undefined);

  const useRequiredContext = () => {
    const value = useContext(context);

    if (value === undefined) {
      throw new Error(errorMessage);
    }

    return value;
  };

  return [context, useRequiredContext] as const;
}
