// "noImplicitAny": true
export function total(prices: number[]) {
  let sum = 0;
  for (const p of prices) sum += p;
  return sum;
}

// "noUncheckedIndexedAccess": false,
export function firstWord(text: string): string {
  const textChunk = text.split(" ")[0] ?? '';

  return textChunk.toUpperCase();
}

// "noUncheckedIndexedAccess": false,
export function findUser(users: { id: number; name: string }[], id: number): string | null {
  return users.find((u) => u.id === id)?.name ?? null;
}

export type Options = { verbose?: boolean };

// "exactOptionalPropertyTypes": false,
export function withVerbose(o: Options, v: boolean | undefined): Options {
  if (typeof v === 'boolean') {
    return { ...o, verbose: v };
  }

  return o;
}