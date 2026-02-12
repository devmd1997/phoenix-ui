import { describe, expect, it } from "vitest";
import { axisSpaceToClasses, responsiveClass } from "./responsive";

describe("responsiveClass", () => {
  it("returns empty string for undefined", () => {
    expect(responsiveClass(undefined)).toBe("");
  });

  it("applies breakpoint prefixes for string map values", () => {
    expect(
      responsiveClass({
        sm: "ui:text-body-sm",
        md: "ui:text-body-md",
        lg: "ui:text-body-lg",
      }),
    ).toBe("sm:ui:text-body-sm md:ui:text-body-md lg:ui:text-body-lg");
  });

  it("applies breakpoint prefixes for array map values", () => {
    expect(
      responsiveClass({
        sm: ["ui:text-body-sm", "ui:font-medium"],
        lg: ["ui:text-body-lg", "ui:uppercase"],
      }),
    ).toBe(
      "sm:ui:text-body-sm sm:ui:font-medium lg:ui:text-body-lg lg:ui:uppercase",
    );
  });

  it("supports mixed string and array values in the same map", () => {
    expect(
      responsiveClass({
        sm: "ui:text-body-sm",
        md: ["ui:text-body-md", "ui:truncate"],
      }),
    ).toBe("sm:ui:text-body-sm md:ui:text-body-md md:ui:truncate");
  });

  it("ignores empty breakpoint values", () => {
    expect(
      responsiveClass({
        sm: "",
        md: [],
        lg: "ui:text-body-lg",
      }),
    ).toBe("lg:ui:text-body-lg");
  });
});

describe("axisSpaceToClasses", () => {
  it("returns empty array for undefined value", () => {
    expect(axisSpaceToClasses("m", undefined)).toEqual([]);
  });

  it("handles shorthand string spacing with breakpoint prefix", () => {
    expect(axisSpaceToClasses("m", "md", "lg")).toEqual(["lg:ui:m-4"]);
  });

  it("handles object spacing without a breakpoint", () => {
    expect(axisSpaceToClasses("p", { x: "sm", b: "lg" })).toEqual([
      "ui:px-2",
      "ui:pb-6",
    ]);
  });

  it("handles object spacing with breakpoint", () => {
    expect(axisSpaceToClasses("m", { all: "xs", y: "md" }, "md")).toEqual([
      "md:ui:m-1",
      "md:ui:my-4",
    ]);
  });
});
