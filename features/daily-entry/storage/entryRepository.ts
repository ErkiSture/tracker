import { db } from "@/shared/database/sqlite";
import { Entry } from "../types/entry";

export async function saveEntry(entry: Entry) {
  const { mood, energy, productivity } = entry;
  db.runSync(
    "INSERT INTO entries (mood, energy, productivity) VALUES (?, ?, ?)",
    [mood, energy, productivity]
  );
}

export async function getAllEntries(): Promise<Entry[]> {
  const result = await db.getAllAsync<Entry>("SELECT * FROM entries");
  // console.log(result);
  return result;
}