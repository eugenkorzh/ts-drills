import { describe, it, expect, expectTypeOf } from "vitest";
import { area, assertNever, type Shape } from "./a2-assert-never.js";

describe("A2 assertNever", () => {
  it("computes areas", () => {
    expect(area({ kind: "square", side: 3 })).toBe(9);
    expect(area({ kind: "rect", width: 2, height: 5 })).toBe(10);
    expect(area({ kind: "circle", radius: 1 })).toBeCloseTo(Math.PI);
  });

  it("throws on an impossible value at runtime", () => {
    expect(() => area({ kind: "hexagon" } as unknown as Shape)).toThrow(/Unexpected/);
  });

  it("only accepts never", () => {
    expectTypeOf(assertNever).parameter(0).toBeNever();
    // @ts-expect-error a string is not never
    expect(() => assertNever("oops")).toThrow();
  });
});