import { db } from "./sqlite";

export async function seedEntries() {
  const amount = 20000;

  const metricNames = [
    "Mood",
    "Energy",
    "Productivity",
    "Stress",
    "Sleep",
    "Exercise",
    "Focus",
    "Motivation",
    "Happiness",
    "Anxiety",
    "Confidence",
    "Creativity",
    "Social",
    "Nutrition",
    "Hydration",
    "Work",
    "Study",
    "Relaxation",
    "Discipline",
    "Patience",
    "Gratitude",
    "Pain",
    "Health",
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
      SELECT id FROM metrics WHERE name = ?
      `,
      [name]
    );

    if (metric) {
      metricIds[name] = metric.id;
    }
  }

  const metrics = Object.values(metricIds);

  const placeholders = metrics
    .map(() => "(?, ?, ?)")
    .join(", ");

  const start = performance.now();

  await db.execAsync("BEGIN TRANSACTION");

  try {
    const date = new Date();

    // Start from yesterday (not today)
    date.setDate(date.getDate() - 1);

    let created = 0;

    while (created < amount) {
      // Randomly skip days (around 30% chance of no entry)
      const shouldSkip = Math.random() < 0.3;

      if (!shouldSkip) {
        const createdAt = date.toISOString().split("T")[0];

        const result = await db.runAsync(
          `
          INSERT INTO entries (
            comment,
            created_at
          )
          VALUES (?, ?)
          `,
          [
            `Generated entry ${created + 1}`,
            createdAt,
          ]
        );

        const entryId = result.lastInsertRowId;

        const values = metrics.flatMap(metricId => [
          entryId,
          metricId,
          Math.floor(Math.random() * 10) + 1,
        ]);

        await db.runAsync(
          `
          INSERT INTO entry_values (
            entry_id,
            metric_id,
            value
          )
          VALUES ${placeholders}
          `,
          values
        );

        created++;
      }

      // Always move backwards one day
      date.setDate(date.getDate() - 1);
    }

    await db.execAsync("COMMIT");

    console.log(
      `Seeded ${amount} entries in ${(performance.now() - start).toFixed(0)}ms`
    );
  } catch (error) {
    await db.execAsync("ROLLBACK");
    throw error;
  }
}