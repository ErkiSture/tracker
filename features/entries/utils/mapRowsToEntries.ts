import { Entry } from "../types/entry";

export function mapRowsToEntries(rows: {
  entryId: number;
  comment: string;
  created_at: string;
  metricId: number | null;
  name: string | null;
  value: number | null;
}[]): Entry[] {
  const entryMap = new Map<number, Entry>();

  for (const row of rows) {
    let entry = entryMap.get(row.entryId);

    if (!entry) {
      entry = {
        id: row.entryId,
        comment: row.comment,
        created_at: row.created_at,
        metrics: {},
      };

      entryMap.set(row.entryId, entry);
    }

    if (row.metricId !== null) {
      entry.metrics[row.metricId] = {
        name: row.name!,
        value: row.value!,
      };
    }
  }

  return [...entryMap.values()];
}