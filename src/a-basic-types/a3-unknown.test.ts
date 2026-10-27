import { describe, it, expect, expectTypeOf } from "vitest";
import { parseUser, type User } from "./a3-unknown.js";

describe("A3 unknown narrowing", () => {
  it("accepts valid users", () => {
    expect(parseUser({ name: "Yevhen", age: 35 })).toEqual({ name: "Yevhen", age: 35 });
    expect(parseUser(JSON.parse('{"name":"A","age":1,"email":"a@b.c"}'))).toEqual({
      name: "A",
      age: 1,
      email: "a@b.c",
    });
  });

  it("rejects bad input", () => {
    const bad = [
      null, undefined, 42, "x", [], {},
      { name: "", age: 1 },
      { name: "A", age: "35" },
      { name: "A", age: -1 },
      { name: "A", age: 1.5 },
      { name: "A", age: 1, email: "nope" },
    ];
    for (const b of bad) expect(parseUser(b)).toBeNull();
  });

  it("does not copy extra keys", () => {
    expect(parseUser({ name: "A", age: 1, admin: true })).toEqual({ name: "A", age: 1 });
  });

  it("has the right signature", () => {
    expectTypeOf(parseUser).parameter(0).toBeUnknown();
    expectTypeOf(parseUser).returns.toEqualTypeOf<User | null>();
  });
});