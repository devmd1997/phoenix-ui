import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders default classes", () => {
    render(
      <Stack gap="sm">
        <span>Default</span>
      </Stack>,
    );
    const el = screen.getByText("Default").parentElement;
    expect(el).toBeTruthy();
    expect(el).toHaveClass("ui:flex-row");
    expect(el).toHaveClass("ui:gap-2");
  });
  it("renders children with base layout and gap classes", () => {
    render(
      <Stack direction="vertical" gap="md">
        <span>Item A</span>
      </Stack>,
    );

    const el = screen.getByText("Item A").parentElement;
    expect(el).toBeTruthy();
    expect(el).toHaveClass("ui:flex-col");
    expect(el).toHaveClass("ui:gap-4");
  });

  it("applies alignment variants", () => {
    render(
      <Stack
        direction="horizontal"
        crossAxisAlignment="center"
        mainAxisAlignment="spaceBetween"
        gap="sm"
      >
        <span>Aligned</span>
      </Stack>,
    );

    const el = screen.getByText("Aligned").parentElement;
    expect(el).toHaveClass("ui:flex-row");
    expect(el).toHaveClass("ui:items-center");
    expect(el).toHaveClass("ui:justify-between");
    expect(el).toHaveClass("ui:gap-2");
  });

  it("applies base spacing classes", () => {
    render(
      <Stack gap="sm" spacing={{ m: { y: "sm" }, p: { x: "lg" } }}>
        <span>Spaced</span>
      </Stack>,
    );

    const el = screen.getByText("Spaced").parentElement;
    expect(el).toHaveClass("ui:my-2");
    expect(el).toHaveClass("ui:px-6");
  });

  it("applies responsive variant, gap, and spacing classes", () => {
    render(
      <Stack
        direction="vertical"
        gap="xs"
        responsive={{
          sm: { direction: "horizontal", gap: "md" },
          md: {
            crossAxisAlignment: "end",
            mainAxisAlignment: "center",
            spacing: { p: { all: "lg" }, m: { t: "md" } },
          },
        }}
      >
        <span>Responsive</span>
      </Stack>,
    );

    const el = screen.getByText("Responsive").parentElement;
    expect(el).toHaveClass("ui:gap-1");
    expect(el).toHaveClass("sm:ui:flex-row");
    expect(el).toHaveClass("sm:ui:gap-4");
    expect(el).toHaveClass("md:ui:items-end");
    expect(el).toHaveClass("md:ui:justify-center");
    expect(el).toHaveClass("md:ui:p-6");
    expect(el).toHaveClass("md:ui:mt-4");
  });
});
