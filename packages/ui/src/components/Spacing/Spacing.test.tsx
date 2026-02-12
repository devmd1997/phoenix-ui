import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spacing } from "./Spacing";

describe("Spacing", () => {
  it("renders base margin spacing from shorthand value", () => {
    const { container } = render(<Spacing m="md" />);

    expect(container.firstChild).toHaveClass("ui:m-4");
  });

  it("renders base padding spacing from axis object value", () => {
    const { container } = render(<Spacing p={{ x: "sm", b: "lg" }} />);

    expect(container.firstChild).toHaveClass("ui:px-2");
    expect(container.firstChild).toHaveClass("ui:pb-6");
  });

  it("renders responsive spacing overrides by breakpoint", () => {
    const { container } = render(
      <Spacing
        m="xs"
        responsive={{
          md: { m: { y: "lg" } },
          lg: { p: { x: "xl" } },
        }}
      />,
    );

    expect(container.firstChild).toHaveClass("ui:m-1");
    expect(container.firstChild).toHaveClass("md:ui:my-6");
    expect(container.firstChild).toHaveClass("lg:ui:px-8");
  });

  it("renders both base margin and base padding together", () => {
    const { container } = render(<Spacing m={{ y: "sm" }} p={{ all: "md" }} />);

    expect(container.firstChild).toHaveClass("ui:my-2");
    expect(container.firstChild).toHaveClass("ui:p-4");
  });
});
