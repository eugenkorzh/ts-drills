import { describe, it, expect, expectTypeOf } from "vitest";
import { toNumber, ROUTES } from "./e2-overloads.js";

describe("E2 overloads + satisfies", () => {
  it("overloads give the exact return type", () => {
    expect(toNumber("5")).toBe(5);
    expect(toNumber(["1", "2"])).toEqual([1, 2]);
    expectTypeOf(toNumber("5")).toEqualTypeOf<number>();
    expectTypeOf(toNumber(["1"])).toEqualTypeOf<number[]>();
  });

  it("satisfies checks values but keeps exact keys and literals", () => {
    expectTypeOf<keyof typeof ROUTES>().toEqualTypeOf<"home" | "sessions" | "stats">();
    expectTypeOf(ROUTES.home).toEqualTypeOf<"/">();
  });
});