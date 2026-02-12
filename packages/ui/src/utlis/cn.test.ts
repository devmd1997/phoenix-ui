import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class values", () => {
    expect(cn("alpha", false && "beta", undefined, "gamma")).toBe(
      "alpha gamma",
    );
  });

  it("merges tailwind conflicts by keeping the last class", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
