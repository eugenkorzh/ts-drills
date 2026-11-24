export function toNumber(input: string): number;
export function toNumber(input: string[]): number[];

export function toNumber(input: string | string[]): number | number[] {
  if (typeof input === 'string') {
    return Number(input);
  }
  
  return input.map(num => Number(num));
}

export const ROUTES = {
  home: "/",
  sessions: "/sessions",
  stats: "/stats",
} as const satisfies Record<string, `/${string}`>;