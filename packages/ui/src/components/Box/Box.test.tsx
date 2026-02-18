import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Box } from "./Box";

describe("Box", () => {
  it("renders as a div by default with default variant classes", () => {
    render(<Box responsive={{}}>Default Box</Box>);

    const el = screen.getByText("Default Box");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("ui:block");
    expect(el).toHaveClass("ui:text-ui-fg");
    expect(el).toHaveClass("ui:border-none");
    expect(el).toHaveClass("ui:rounded-none");
    expect(el).toHaveClass("ui:bg-none");
  });

  it("respects explicit tag and base variant props", () => {
    render(
      <Box
        as="span"
        display="inlineFlex"
        variant="primary"
        border="md"
        borderRadius="lg"
        backgroundColor="surface"
        responsive={{}}
      >
        Styled Box
      </Box>,
    );

    const el = screen.getByText("Styled Box");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("ui:inline-flex");
    expect(el).toHaveClass("ui:text-ui-primary");
    expect(el).toHaveClass("ui:border-ui-primary");
    expect(el).toHaveClass("ui:border-2");
    expect(el).toHaveClass("ui:rounded-lg");
    expect(el).toHaveClass("ui:bg-ui-surface");
  });

  it("renders base spacing classes", () => {
    render(
      <Box spacing={{ m: { y: "sm" }, p: { x: "md" } }} responsive={{}}>
        Spaced Box
      </Box>,
    );

    const el = screen.getByText("Spaced Box");
    expect(el).toHaveClass("ui:my-2");
    expect(el).toHaveClass("ui:px-4");
  });

  it("renders responsive variant and spacing classes by breakpoint", () => {
    render(
      <Box
        responsive={{
          sm: { display: "inline", variant: "muted" },
          md: {
            border: "sm",
            borderRadius: "xl",
            spacing: { p: { all: "lg" }, m: { t: "md" } },
          },
        }}
      >
        Responsive Box
      </Box>,
    );

    const el = screen.getByText("Responsive Box");
    expect(el).toHaveClass("sm:ui:inline");
    expect(el).toHaveClass("sm:ui:text-ui-fg-muted");
    expect(el).toHaveClass("md:ui:border");
    expect(el).toHaveClass("md:ui:rounded-xl");
    expect(el).toHaveClass("md:ui:p-6");
    expect(el).toHaveClass("md:ui:mt-4");
  });
});
