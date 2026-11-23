import { describe, it, expect, expectTypeOf } from "vitest";
import { ok, err, parseAge, ageMessage, type AgeError } from "./e1-result.js";

describe("E1 Result", () => {
  it("ok and err build the two shapes", () => {
    expect(ok(5)).toEqual({ ok: true, value: 5 });
    expect(err("boom")).toEqual({ ok: false, error: "boom" });
  });

  it("parseAge returns typed errors, never throws", () => {
    expect(parseAge("35")).toEqual({ ok: true, value: 35 });
    expect(parseAge("")).toEqual({ ok: false, error: "empty" });
    expect(parseAge("abc")).toEqual({ ok: false, error: "not-a-number" });
    expect(parseAge("-3")).toEqual({ ok: false, error: "negative" });
  });

  it("checking ok narrows the type", () => {
    const r = parseAge("35");
    if (r.ok) expectTypeOf(r.value).toEqualTypeOf<number>();
    else expectTypeOf(r.error).toEqualTypeOf<AgeError>();
    // @ts-expect-error value only exists after checking ok
    void r.value;
  });

  it("ageMessage covers every case", () => {
    expect(ageMessage(parseAge("35"))).toBe("Age: 35");
    expect(ageMessage(parseAge(""))).toBe("Please enter an age");
    expect(ageMessage(parseAge("x"))).toBe("Age must be a number");
    expect(ageMessage(parseAge("-1"))).toBe("Age can't be negative");
  });
});