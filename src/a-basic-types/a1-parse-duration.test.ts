import { describe, it, expect, expectTypeOf } from "vitest";
import { parseDuration } from "./a1-parse-duration.js";

describe("A1 parseDuration", () => {
  it("parses hours, minutes and both", () => {
    expect(parseDuration("45m")).toBe(45);
    expect(parseDuration("2h")).toBe(120);
    expect(parseDuration("1h30m")).toBe(90);
    expect(parseDuration("0h15m")).toBe(15);
  });

  it("returns null for bad input", () => {
    for (const bad of ["", "30", "m", "h", "1.5h", "30m1h", "1h 30m", "abc", "0m", "-5m"]) {
      expect(parseDuration(bad)).toBeNull();
    }
  });

  it("forces callers to handle null", () => {
    expectTypeOf(parseDuration).returns.toEqualTypeOf<number | null>();
    const d = parseDuration("45m");
    // @ts-expect-error d might be null
    d.toFixed(0);
  });
});