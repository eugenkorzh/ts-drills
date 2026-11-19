
export function sum(...args: number[]): number {
  return args.reduce((result, currentValue) => result + currentValue, 0);
}

export function maxOf(firstNumber: number, ...args: number[]): number {
  if (firstNumber == null) {
    throw new Error('at least one number is required');
  }

  return Math.max(firstNumber, ...args);
}

export function joinPath(...args: string[]): string {
  return args.filter(chunk => chunk.length > 0).join('/');
}