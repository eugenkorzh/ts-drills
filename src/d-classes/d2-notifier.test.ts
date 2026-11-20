import { describe, it, expect } from "vitest";
import { Notifier, EmailNotifier, SmsNotifier, type HasChannel } from "./d2-notifier.js";

describe("D2 abstract class + interface", () => {
  it("email wraps the message", () => {
    const n = new EmailNotifier("studylog");
    expect(n.notify("Hi")).toBe("studylog: <p>Hi</p>");
    expect(n.channel).toBe("email");
  });

  it("sms keeps 20 characters", () => {
    const n = new SmsNotifier("bot");
    expect(n.notify("This message is longer than twenty")).toBe("bot: This message is long");
    expect(n.channel).toBe("sms");
  });

  it("both are Notifiers with a channel", () => {
    const all: (Notifier & HasChannel)[] = [new EmailNotifier("a"), new SmsNotifier("b")];
    expect(all.map((n) => n.channel)).toEqual(["email", "sms"]);
  });

  it("Notifier itself can't be created", () => {
    // @ts-expect-error Notifier is abstract
    expect(() => new Notifier("x")).not.toThrow();
  });
});