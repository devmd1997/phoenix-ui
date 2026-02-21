import type { Breakpoint, ResponsiveProp } from "../types";
import { useMemo } from "react";
import { responsiveClass } from "../utlis/responsive";
import { cn } from "../utlis/cn";

type VariantFn<T> = (props?: T) => string;

type UseResponsiveVariantClassArgs<TVariants, TResponsiveValue> = {
  variants: VariantFn<TVariants>;
  base: TVariants;
  responsive?: ResponsiveProp<TResponsiveValue>;
  toVariantProps?: (
    value: TResponsiveValue | undefined,
    base: TVariants,
  ) => Partial<TVariants>;
};

export function useResponsiveVariantClass<TVariants, TResponsiveValue>({
  variants,
  base,
  responsive,
  toVariantProps,
}: UseResponsiveVariantClassArgs<TVariants, TResponsiveValue>) {
  return useMemo(() => {
    const baseClasses = variants(base);

    if (!responsive) return baseClasses;

    const map = {} as ResponsiveProp<string[]>;

    (Object.keys(responsive) as Breakpoint[]).forEach((bp) => {
      const value = responsive[bp];
      const variantProps = (
        toVariantProps
          ? toVariantProps(value, base)
          : (value as Partial<TVariants> | undefined)
      ) as TVariants;
      map[bp] = variants(variantProps).split(" ");
    });

    return cn(baseClasses, responsiveClass(map));
  }, [variants, base, responsive, toVariantProps]);
}
