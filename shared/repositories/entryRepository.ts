import setUpDatabase, { db } from "@/shared/database/sqlite";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";
import { getMonthDateRange } from "../util/getMonthDateRange";

export async function saveEntry(entry: CreateEntry) {
  const { values, comment } = entry;

  // Create the entry
  const result = await db.runAsync(
    `
    INSERT INTO entries (comment)
    VALUES (?)
    `, 
    [comment]
  ); 

  const entryId = result.lastInsertRowId;

  // Add metric values
  for (const [metricId, value] of Object.entries(values)) {
    db.runAsync(
      `
      INSERT INTO entry_values (
        entry_id,
        metric_id,
        value
      )
      VALUES (?, ?, ?)
      `, 
      [entryId, metricId, value]
    );
  }
}

export async function getAllEntries(): Promise<Entry[]> {
  const result = await db.getAllAsync<Entry>("SELECT * FROM entries");
  console.log(result);
  return result;
}

export async function resetDatabase() {
  db.execSync(
    `
    PRAGMA foreign_keys = OFF;

    DROP TABLE IF EXISTS entry_values;
    DROP TABLE IF EXISTS entries;
    DROP TABLE IF EXISTS metrics;

    PRAGMA foreign_keys = ON;
    `);
  setUpDatabase();
}

// export async function getMonthEntries(year: number, month: number): Promise<Entry[]>{
//   const { start, end } = getMonthDateRange(year, month);

//   const entries = await db.getAllAsync<{
//     id: number
//     comment: string
//     created_at: string
//   }>(
//     `
//     SELECT *
//     FROM entries
//     WHERE created_at >= ?
//       AND created_at < ?
//     `, 
//     [start, end]
//   );

//   // For typescript to know we are adding field "metrics" to entries
//   const entriesWithMetrics: Entry[] = [];

//   for (const entry of entries) {
//     const values = await db.getAllAsync<{
//       metricsId: number
//       name: string
//       value: number
//     }>(
//       `
//       SELECT
//         metrics.id as metricsId,
//         metrics.name,
//         entry_values.value
//       FROM entry_values
//       JOIN metrics
//         ON metrics.id = entry_values.metric_id
//       WHERE entry_values.entry_id = ?
//       `,
//       [entry.id]
//     );

//     entriesWithMetrics.push({
//       ...entry,
//       metrics: Object.fromEntries(
//         values.map(metricInfo => [
//           metricInfo.metricsId,
//           {
//             name: metricInfo.name,
//             value: metricInfo.value,
//           },
//         ])
//       ),
//     });
//   }

//   return entriesWithMetrics;
// }

export async function getMonthEntries(year: number, month: number): Promise<Entry[]> {
  const { start, end } = getMonthDateRange(year, month);

  const result = await db.getAllAsync<{
    entryId: number
    comment: string
    created_at: string
    metricId: number
    name: string
    value: number
  }>(
    `
    SELECT
      entries.id as entryId,
      entries.comment,
      entries.created_at,
      metrics.id as metricId,
      metrics.name,
      entry_values.value 
    FROM entries
    JOIN entry_values
    ON entry_values.entry_id = entries.id
    JOIN metrics
    ON entry_values.metric_id = metrics.id
    WHERE created_at >= ?
      AND created_at < ?
    `,
    [start, end]
  );

  const entryMap = new Map<number, Entry>(); // Map<entry_id, Entry>
  
  // Map every new entry_id to an Entry object
  for (const row of result) {
    let entry = entryMap.get(row.entryId);
    if (!entry) {
      entry = {
        id: row.entryId,
        comment: row.comment,
        created_at: row.created_at,
        metrics: {}
      }
      entryMap.set(row.entryId, entry)
    }
    
    entry.metrics[row.metricId] = {
      name: row.name,
      value:  row.value
    }
  }
  
  const entries = [...entryMap.values()]

  return entries
}

export async function getEntryByDate(date: string): Promise<boolean> {
  const result = await db.getAllAsync<Entry>(`
    SELECT * 
    FROM entries
    WHERE created_at = ?
    `,
    [date]
  )
  return result.length > 0;
}