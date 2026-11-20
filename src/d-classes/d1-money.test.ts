import { describe, it, expect } from "vitest";
import { Money } from "./d1-money.js";

describe("D1 Money", () => {
  it("creates and formats", () => {
    expect(Money.of(12.5, "UAH").format()).toBe("12.50 UAH");
    expect(Money.of(0, "USD").format()).toBe("0.00 USD");
  });

  it("adds exactly, only in the same currency", () => {
    expect(Money.of(0.1, "UAH").add(Money.of(0.2, "UAH")).format()).toBe("0.30 UAH");
    expect(() => Money.of(1, "UAH").add(Money.of(1, "USD"))).toThrow();
  });

  it("add does not change the original", () => {
    const a = Money.of(1, "UAH");
    a.add(Money.of(2, "UAH"));
    expect(a.format()).toBe("1.00 UAH");
  });

  it("compares by value", () => {
    expect(Money.of(5, "UAH").equals(Money.of(5, "UAH"))).toBe(true);
    expect(Money.of(5, "UAH").equals(Money.of(5, "USD"))).toBe(false);
  });

  it("rejects bad amounts", () => {
    expect(() => Money.of(1.234, "UAH")).toThrow(RangeError);
    expect(() => Money.of(Number.NaN, "UAH")).toThrow(RangeError);
  });

  it("compile-time rules", () => {
    // @ts-expect-error the constructor is private
    new Money(100, "UAH");
    const m = Money.of(1, "UAH");
    // @ts-expect-error cents is readonly
    m.cents = 5;
    // @ts-expect-error not a supported currency
    Money.of(1, "EUR");
  });
});