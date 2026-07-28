import { Entry } from "@/shared/types/entry";

export function getEntriesForMonth(
  entries: Entry[],
  year: number,
  month: number
): Entry[] {
  return entries.filter(entry => {
    const date = new Date(entry.created_at);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month
    );
  });
}