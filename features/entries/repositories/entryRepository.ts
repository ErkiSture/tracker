import setUpDatabase, { db } from "@/shared/database/sqlite";
import { getMonthDateRange } from "../../../shared/util/getMonthDateRange";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";
import { mapRowsToEntries } from "../utils/mapRowsToEntries";

type EntryRow = {
  entryId: number
  comment: string
  created_at: string
  metricId: number | null
  name: string | null
  value: number | null
}

async function insertEntryAndValues(entry: CreateEntry): Promise<number> {
  const { values, comment, date } = entry;

  const result = await db.runAsync(
    `
    INSERT INTO entries (comment, created_at)
    VALUES (?, ?)
    `,
    [comment, date]
  );

  const entryId = result.lastInsertRowId;

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

  return entryId;
}

export async function saveEntry(entry: CreateEntry): Promise<Entry> {
  let entryId: number | null = null;

  await db.withTransactionAsync(async () => {
    entryId = await insertEntryAndValues(entry)
  });

  if (entryId === null) {
    throw new Error("Failed to create entry");
  }

  return getEntryById(entryId); 
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

export async function updateEntry(id: number, entry: CreateEntry): Promise<Entry> {
  let newEntryId: number | null = null;

  await db.withTransactionAsync(async () => {
    const deleted = await db.runAsync(
      `
      DELETE FROM entries
      WHERE id = ?
      `,
      [id]
    );

    if (deleted.changes === 0) {
      throw new Error(`Entry ${id} does not exist`);
    }

    newEntryId = await insertEntryAndValues(entry);
  });

  if (newEntryId === null) {
    throw new Error("Failed to update entry");
  }

  return getEntryById(newEntryId);
}


export async function getMonthEntries(year: number, month: number): Promise<Entry[]> {
  const { start, end } = getMonthDateRange(year, month);
  
  const result = await db.getAllAsync<EntryRow>(
    `
    SELECT
      entries.id as entryId,
      entries.comment,
      entries.created_at,
      metrics.id as metricId,
      metrics.name,
      entry_values.value 
    FROM entries
    LEFT JOIN entry_values
      ON entry_values.entry_id = entries.id
    LEFT JOIN metrics
      ON entry_values.metric_id = metrics.id
    WHERE created_at >= ?
    AND created_at < ?
    `,
    [start, end]
  );
  
  return mapRowsToEntries(result);
}

export async function getRecentEntries(amount: number): Promise<Entry[]> {
  const result = await db.getAllAsync<EntryRow>(
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
    LEFT JOIN entry_values
      ON entry_values.entry_id = entries.id
    LEFT JOIN metrics
      ON entry_values.metric_id = metrics.id
    ORDER BY entries.created_at DESC
      `,
      [amount]
    );

  return mapRowsToEntries(result);
}

export async function getEntriesByDateRange(start: string, end: string): Promise<Entry[]> {
  const result = await db.getAllAsync<EntryRow>(
    `
    SELECT
      entries.id as entryId,
      entries.comment,
      entries.created_at,
      metrics.id as metricId,
      metrics.name,
      entry_values.value
    FROM entries
    LEFT JOIN entry_values
      ON entry_values.entry_id = entries.id
    LEFT JOIN metrics
      ON entry_values.metric_id = metrics.id
    WHERE created_at >= ?
    AND created_at < ?
    ORDER BY created_at DESC
    `,
    [start, end]
  );

  return mapRowsToEntries(result);
}

export async function getEntries(offset: number, limit: number): Promise<Entry[]> {
    const result = await db.getAllAsync<EntryRow>(
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
      OFFSET ?
    ) AS entries
    LEFT JOIN entry_values
      ON entry_values.entry_id = entries.id
    LEFT JOIN metrics
      ON entry_values.metric_id = metrics.id
    ORDER BY entries.created_at DESC;
    `,
    [limit, offset]
  );

  // console.log("repo", offset, limit);
  return mapRowsToEntries(result);
}
  
export async function getEntryById(id: number): Promise<Entry> {
  const result = await db.getAllAsync<EntryRow>(
    `
    SELECT
      entries.id as entryId,
      entries.comment,
      entries.created_at,
      metrics.id as metricId,
      metrics.name,
      entry_values.value 
    FROM entries
    LEFT JOIN entry_values
      ON entry_values.entry_id = entries.id
    LEFT JOIN metrics
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
  
export async function checkEntryExistsByDate(date: string): Promise<boolean> {
  const result = await db.getFirstAsync<{ id: number }>(
    `
    SELECT id
    FROM entries
    WHERE created_at = ?
    `,
    [date]
  );

  return result !== null;
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

  await setUpDatabase();
}
