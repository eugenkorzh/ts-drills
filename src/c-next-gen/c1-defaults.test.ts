import { describe, it, expect } from "vitest";
import { mergeSettings, fontSizeOf, type Settings } from "./c1-defaults.js";

const defaults: Settings = { theme: "light", fontSize: 14, autosave: true };

describe("C1 spread, ?. and ??", () => {
  it("overrides win, defaults stay untouched", () => {
    expect(mergeSettings(defaults, { theme: "dark" })).toEqual({ theme: "dark", fontSize: 14, autosave: true });
    expect(mergeSettings(defaults, {})).toEqual(defaults);
    expect(defaults.theme).toBe("light");
  });

  it("rejects unknown keys and wrong types", () => {
    // @ts-expect-error no such setting
    mergeSettings(defaults, { color: "red" });
    // @ts-expect-error fontSize is a number
    mergeSettings(defaults, { fontSize: "16" });
  });

  it("reads nested values safely", () => {
    expect(fontSizeOf({ display: { fontSize: 18 } })).toBe(18);
    expect(fontSizeOf({ display: {} })).toBe(14);
    expect(fontSizeOf({})).toBe(14);
    expect(fontSizeOf(undefined)).toBe(14);
    expect(fontSizeOf({ display: { fontSize: 0 } })).toBe(0);
  });
});