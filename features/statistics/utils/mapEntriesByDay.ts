import { Entry } from "@/features/entries/types/entry";

export function mapEntriesByDay(entries: Entry[]): Map<number, Entry> {
  return new Map(
    entries.map((entry) => [
      new Date(entry.created_at).getDate(),
      entry,
    ])
  );
}