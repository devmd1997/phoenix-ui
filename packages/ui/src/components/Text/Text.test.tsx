import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("renders body text as a paragraph by default", () => {
    render(<Text>Hello</Text>);

    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
    expect(el).toHaveClass("ui:text-body-md");
    expect(el).toHaveClass("ui:text-ui-fg");
  });

  it("renders heading variants with semantic heading tags", () => {
    render(<Text variant="h2">Heading</Text>);

    const el = screen.getByText("Heading");
    expect(el.tagName).toBe("H2");
    expect(el).toHaveClass("ui:text-h2");
  });

  it("respects explicit tag override", () => {
    render(
      <Text as="span" variant="h1">
        Inline heading
      </Text>,
    );

    const el = screen.getByText("Inline heading");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("ui:text-h1");
  });

  it("applies truncate and uppercase flags", () => {
    render(
      <Text truncate uppercase>
        Flags
      </Text>,
    );

    const el = screen.getByText("Flags");
    expect(el).toHaveClass("ui:truncate");
    expect(el).toHaveClass("ui:uppercase");
  });

  it("appends custom className", () => {
    render(<Text className="custom-text">Custom class</Text>);

    expect(screen.getByText("Custom class")).toHaveClass("custom-text");
  });

  it("applies responsive variant/tone modifiers by breakpoint", () => {
    render(
      <Text
        responsive={{
          sm: { variant: "body-sm", tone: "muted" },
          md: { variant: "h4", tone: "primary", uppercase: true },
        }}
      >
        Responsive text
      </Text>,
    );

    const el = screen.getByText("Responsive text");
    expect(el).toHaveClass("sm:ui:text-body-sm");
    expect(el).toHaveClass("sm:ui:text-ui-fg-muted");
    expect(el).toHaveClass("md:ui:text-h4");
    expect(el).toHaveClass("md:ui:text-ui-primary");
    expect(el).toHaveClass("md:ui:uppercase");
  });

  it("renders responsive truncate flag", () => {
    render(
      <Text responsive={{ lg: { truncate: true } }}>
        Truncated at lg
      </Text>,
    );

    expect(screen.getByText("Truncated at lg")).toHaveClass("lg:ui:truncate");
  });
});
