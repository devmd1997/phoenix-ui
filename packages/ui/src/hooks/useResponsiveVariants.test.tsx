import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ResponsiveProp } from "../types";
import { useResponsiveVariantClass } from "./useResponsiveVariants";

type MockVariants = {
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "danger";
};
type VariantOverride = Partial<MockVariants>;

function mockVariantFn(props?: MockVariants) {
  const classes: string[] = [];

  if (props?.size) classes.push(`ui:size-${props.size}`);
  if (props?.tone) classes.push(`ui:tone-${props.tone}`);

  return classes.join(" ");
}

describe("useResponsiveVariantClass", () => {
  it("returns base classes when responsive is not provided", () => {
    const { result } = renderHook(() =>
      useResponsiveVariantClass({
        variants: mockVariantFn,
        base: { size: "md", tone: "neutral" },
      }),
    );

    expect(result.current).toBe("ui:size-md ui:tone-neutral");
  });

  it("merges responsive classes with breakpoint prefixes", () => {
    const responsive: ResponsiveProp<VariantOverride> = {
      sm: { size: "sm" },
      lg: { size: "lg" },
    };

    const { result } = renderHook(() =>
      useResponsiveVariantClass({
        variants: mockVariantFn,
        base: { size: "md", tone: "neutral" },
        responsive,
      }),
    );

    expect(result.current).toBe(
      "ui:size-md ui:tone-neutral sm:ui:size-sm lg:ui:size-lg",
    );
  });

  it("passes responsive value and base props into toVariantProps", () => {
    const toVariantProps = vi.fn((value: MockVariants["size"] | undefined) => ({
      size: value,
    }));

    renderHook(() =>
      useResponsiveVariantClass({
        variants: mockVariantFn,
        base: { size: "md", tone: "danger" },
        responsive: {
          sm: "sm",
          md: "md",
        },
        toVariantProps,
      }),
    );

    expect(toVariantProps).toHaveBeenCalledTimes(2);
    expect(toVariantProps).toHaveBeenNthCalledWith(1, "sm", {
      size: "md",
      tone: "danger",
    });
    expect(toVariantProps).toHaveBeenNthCalledWith(2, "md", {
      size: "md",
      tone: "danger",
    });
  });
});
