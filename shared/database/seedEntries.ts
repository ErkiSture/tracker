// database/seedEntries.ts
import { db } from "./sqlite";

export async function seedEntries() {
  const year = 2026;
  const month = 7; // July (1-12)

  const daysInMonth = new Date(year, month, 0).getDate();

  const entries = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;

    return {
      mood: Math.floor(Math.random() * 10) + 1,
      energy: Math.floor(Math.random() * 10) + 1,
      productivity: Math.floor(Math.random() * 10) + 1,
      comment: `Entry for ${year}-${month}-${day}`,
      created_at: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
  });

  for (const entry of entries) {
    await db.runAsync(
      `
      INSERT INTO entries (
        mood,
        energy,
        productivity,
        comment,
        created_at
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        entry.mood,
        entry.energy,
        entry.productivity,
        entry.comment,
        entry.created_at,
      ]
    );
  }

  console.log(`Seeded ${entries.length} entries`);
}