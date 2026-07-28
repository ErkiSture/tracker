import { Entry } from "@/shared/types/entry";

export function getRecentEntries(
  entries: Entry[],
  amount: number
): Entry[] {
  return [...entries]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, amount);
}