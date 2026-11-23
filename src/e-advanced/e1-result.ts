import { assertNever } from "../a-basic-types/a2-assert-never.js";

export type Result<T, E> = {
  ok: true,
  value: T
} | {
  ok: false,
  error: E
}

export type AgeError = "empty" | "not-a-number" | "negative" | "not-whole";

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function parseAge(input: string): Result<number, AgeError> {
  if (input.trim() === '') {
    return err("empty");
  }

  const parsedNumber = Number(input);

  if (Number.isNaN(parsedNumber)) {
    return err("not-a-number");
  }

  if (parsedNumber < 0) {
    return err("negative");
  }

  if (!Number.isInteger(parsedNumber)) {
    return err("not-whole");
  }

  return ok(parsedNumber);
}

// 1.  ageMessage(result) turns any result into text.
//  Use a switch on the error with assertNever from your A2 drill in default,
//  so adding a new AgeError later breaks the build until you handle it.

export function ageMessage(result: Result<number, AgeError>): string {
  if (result.ok) {
    return "Age: " + result.value;
  }

  switch(result.error) {
    case "empty":
      return "Please enter an age";
    case "not-a-number":
      return "Age must be a number";
    case "negative":
      return "Age can't be negative";
    case "not-whole":
      return "Age must be a whole number";
    default: 
      assertNever(result.error);
  }
}