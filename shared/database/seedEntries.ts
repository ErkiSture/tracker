// database/seedEntries.ts
import { db } from "./sqlite";

export async function seedEntries() {
  const year = 2026;
  const month = 7;

  // Create metrics
  const metricNames = [
    "Mood",
    "Energy",
    "Productivity",
  ];

  const metricIds: Record<string, number> = {};

  for (const name of metricNames) {
    await db.runAsync(
      `
      INSERT OR IGNORE INTO metrics (name)
      VALUES (?)
      `,
      [name]
    );

    const metric = await db.getFirstAsync<{ id: number }>(
      `
      SELECT id 
      FROM metrics
      WHERE name = ?
      `,
      [name]
    );

    if (metric) {
      metricIds[name] = metric.id;
    }
  }


  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const createdAt = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Create entry
    const result = await db.runAsync(
      `
      INSERT INTO entries (
        comment,
        created_at
      )
      VALUES (?, ?)
      `,
      [
        `Entry for ${createdAt}`,
        createdAt,
      ]
    );

    const entryId = result.lastInsertRowId;


    // Add metric values
    await db.runAsync(
      `
      INSERT INTO entry_values (
        entry_id,
        metric_id,
        value
      )
      VALUES (?, ?, ?)
      `,
      [
        entryId,
        metricIds["Mood"],
        Math.floor(Math.random() * 10) + 1,
      ]
    );

    await db.runAsync(
      `
      INSERT INTO entry_values (
        entry_id,
        metric_id,
        value
      )
      VALUES (?, ?, ?)
      `,
      [
        entryId,
        metricIds["Energy"],
        Math.floor(Math.random() * 10) + 1,
      ]
    );

    await db.runAsync(
      `
      INSERT INTO entry_values (
        entry_id,
        metric_id,
        value
      )
      VALUES (?, ?, ?)
      `,
      [
        entryId,
        metricIds["Productivity"],
        Math.floor(Math.random() * 10) + 1,
      ]
    );
  }

  console.log(`Seeded ${daysInMonth} entries`);
}