export const Status = {
  Todo: "todo",
  InProgress: "in_progress",
  Done: "done",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const STATUSES = Object.values(Status);

export function isStatus(value: string): value is Status {
  return (STATUSES as readonly string[]).includes(value);
}

export function nextStatus(s: Status): Status {
  switch (s) {
    case Status.Todo:
      return Status.InProgress;
    case Status.InProgress:
    case Status.Done:
      return Status.Done;
  }
}