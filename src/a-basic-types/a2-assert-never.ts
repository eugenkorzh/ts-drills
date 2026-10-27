export type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "rect"; width: number; height: number };

export function assertNever(value: never): never {
  throw new Error("Unexpected value of type: never");
}

export function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    case "rect":
      return shape.width * shape.height;
    default:
      assertNever(shape);
  }

  throw new Error("TODO");
}