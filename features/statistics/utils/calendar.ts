import { Entry } from "@/features/entries/types/entry";

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function mapEntriesByDay(entries: Entry[]) {
  return new Map(
    entries.map((entry) => [
      new Date(entry.created_at).getDate(),
      entry,
    ])
  );
}