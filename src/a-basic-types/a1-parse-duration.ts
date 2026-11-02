export function parseDuration(input: string): number | null {
  const regex = /^(?=\d+[hm])(?:(\d+)h)?(?:(\d+)m)?$/;
  const match = input.match(regex);
  let total = 0;

  if (match) {
    const h = Number(match[1]) * 60 || 0;
    const m = Number(match[2]) || 0;

    total = h+m;
  }

  return total === 0 ? null : total;
}
