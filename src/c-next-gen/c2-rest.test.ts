import { describe, it, expect } from "vitest";
import { sum, maxOf, joinPath } from "./c2-rest.js";

describe("C2 rest parameters", () => {
  it("sum takes any amount", () => {
    expect(sum()).toBe(0);
    expect(sum(5)).toBe(5);
    expect(sum(1, 2, 3, 4)).toBe(10);
    const list = [2, 3];
    expect(sum(...list)).toBe(5);
  });

  it("maxOf needs at least one number", () => {
    expect(maxOf(7)).toBe(7);
    expect(maxOf(3, 9, 2)).toBe(9);
    expect(maxOf(-5, -1)).toBe(-1);
    expect(maxOf(0, -5)).toBe(0);
    // @ts-expect-error at least one number is required
    expect(() => maxOf()).toThrow();
  });

  it("joinPath skips empty parts", () => {
    expect(joinPath("src", "domain", "brand.ts")).toBe("src/domain/brand.ts");
    expect(joinPath("src", "", "a.ts")).toBe("src/a.ts");
    expect(joinPath()).toBe("");
  });
});
