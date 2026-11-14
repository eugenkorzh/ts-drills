import { describe, it, expect, expectTypeOf } from "vitest";
import { total, firstWord, findUser, withVerbose } from "./b1-strict.js";

describe("B1 strict fixes", () => {
  it("total takes numbers", () => {
    expect(total([1, 2, 3])).toBe(6);
    expectTypeOf(total).parameter(0).toEqualTypeOf<number[]>();
  });

  it("firstWord handles any string", () => {
    expect(firstWord("hello world")).toBe("HELLO");
    expect(firstWord("")).toBe("");
  });

  it("findUser returns null when missing", () => {
    const users = [{ id: 1, name: "Ann" }];
    expect(findUser(users, 1)).toBe("Ann");
    expect(findUser(users, 2)).toBeNull();
  });

  it("withVerbose leaves verbose alone for undefined", () => {
    expect(withVerbose({ verbose: true }, undefined)).toEqual({ verbose: true });
    expect(withVerbose({}, undefined)).toEqual({});
    expect(withVerbose({}, false)).toEqual({ verbose: false });
  });
});