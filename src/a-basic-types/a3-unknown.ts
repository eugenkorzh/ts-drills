export type User = { name: string; age: number; email?: string };

function isPlainObject (value: unknown): value is Record<string, unknown>{
  if (typeof value !== 'object' || value === null) return false;

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}

export function parseUser(input: unknown): User | null {

  if (!isPlainObject(input)) return null;

  const {name, age, email} = input;

  if (typeof name !== "string" || name === "") return null;
  if (typeof age !== "number" || !Number.isInteger(age) || age < 0) return null;

  if (email === undefined) return { name, age };

  if (typeof email !== "string" || email.includes("@")) return null;

  return { name, age, email };
}