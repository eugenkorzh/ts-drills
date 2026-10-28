import { describe, it, expect, expectTypeOf } from "vitest";
import { Status, STATUSES, isStatus, nextStatus } from "./a5-as-const.js";

describe("A5 enum vs as const", () => {
  it("Status is a union of string literals", () => {
    expectTypeOf<Status>().toEqualTypeOf<"todo" | "in_progress" | "done">();
    expectTypeOf(Status.Done).toEqualTypeOf<"done">();
  });

  it("plain strings work where Status is expected", () => {
    expect(nextStatus("todo")).toBe("in_progress");
    expect(nextStatus(Status.InProgress)).toBe("done");
    expect(nextStatus("done")).toBe("done");
    // @ts-expect-error not a valid status
    nextStatus("blocked");
  });

  it("isStatus narrows a string", () => {
    const raw: string = "done";
    if (isStatus(raw)) expectTypeOf(raw).toEqualTypeOf<Status>();
    expect(isStatus("done")).toBe(true);
    expect(isStatus("blocked")).toBe(false);
  });

  it("lists every status", () => {
    expect(STATUSES).toEqual(["todo", "in_progress", "done"]);
  });
});