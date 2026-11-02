import { describe, it, expect, expectTypeOf } from "vitest";
import { parseTime, minutesBetween, type Time } from "./a4-tuples.js";

describe("A4 tuples", () => {
  it("parses HH:MM", () => {
    expect(parseTime("13:45")).toEqual([13, 45]);
    expect(parseTime("00:00")).toEqual([0, 0]);
    expect(parseTime("23:59")).toEqual([23, 59]);
  });

  it("rejects bad times", () => {
    for (const bad of ["", "9:30", "24:00", "12:60", "12-30", "12:30:00", "ab:cd"]) {
      expect(parseTime(bad)).toBeNull();
    }
  });

  it("counts minutes between two times", () => {
    expect(minutesBetween([13, 0], [14, 30])).toBe(90);
    expect(minutesBetween([10, 30], [10, 30])).toBe(0);
  });

  it("Time is exactly two numbers", () => {
    expectTypeOf<Time["length"]>().toEqualTypeOf<2>();
    // @ts-expect-error three items is not a Time
    const t: Time = [1, 2, 3];
    const ok: Time = [9, 30];
    // @ts-expect-error Time is readonly
    ok[0] = 10;
    expect(t.length).toBe(3);
  });
});