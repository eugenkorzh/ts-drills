export type Time = readonly [hours: number, minutes: number];
const TIME = /^(\d{2}):(\d{2})$/;

  export function parseTime(s: string): Time | null {
    const match = s.match(TIME);

    if (!match) {
      return null;
    }

    const [, h, m] = match;

    if (typeof h !== "string" || typeof m !== "string") {
      return null;
    }

    const hours = Number(h);
    const minutes = Number(m);

    if (hours > 23 || minutes > 59) {
      return null;
    }

    return [hours, minutes];
  }

export function minutesBetween(from: Time, to: Time): number {
  const [fromHours, fromMinutes] = from;
  const [toHours, toMinutes] = to;

  return 60 * (toHours - fromHours ) + toMinutes - fromMinutes;
}