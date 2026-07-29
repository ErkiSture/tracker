import setUpDatabase, { db } from "@/shared/database/sqlite";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";
import { getMonthDateRange } from "../util/getMonthDateRange";
import { mapRowsToEntries } from "../util/mapRowsToEntries";

export async function saveEntry(entry: CreateEntry, date: string): Promise<Entry> {
  const { values, comment } = entry;

  // Create the entry
  const result = await db.runAsync(
    `
    INSERT INTO entries (comment, created_at)
    VALUES (?, ?)

    `, 
    [comment, date]
  ); 

  const entryId = result.lastInsertRowId;

  // Add metric values
  for (const [metricId, value] of Object.entries(values)) {
    await db.runAsync(
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

  const savedEntry = await getEntryById(entryId);
  return savedEntry;
}

export async function getEntryById(id: number): Promise<Entry> {
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
    WHERE entries.id = ?
    `,
    [id]
  );
  const savedEntry = mapRowsToEntries(result)[0];

  if (!savedEntry) {
    throw new Error(`Entry ${id} not found`);
  }

  return savedEntry;
}

export async function getRecentEntries(amount: number): Promise<Entry[]> {
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
    FROM (
      SELECT *
      FROM entries
      ORDER BY created_at DESC
      LIMIT ?
    ) AS entries
    JOIN entry_values
      ON entry_values.entry_id = entries.id
    JOIN metrics
      ON entry_values.metric_id = metrics.id
    ORDER BY entries.created_at DESC
    `,
    [amount]
  );

  return mapRowsToEntries(result);
}

export async function removeEntry(id: number): Promise<boolean> {
  const result = await db.runAsync(
    `
    DELETE FROM entries
    WHERE id = ?
    `,
    [id]
  );
  
  return result.changes > 0;
}

//CHANGE NAME
export async function checkEntryExistsByDate(date: string): Promise<boolean> {
  const result = await db.getAllAsync<{ id: number }>(`
    SELECT id 
    FROM entries
    WHERE created_at = ?
    `,
    [date]
  )
  return result.length > 0;
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

  return mapRowsToEntries(result);
}