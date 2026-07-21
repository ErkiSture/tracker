import setUpDatabase, { db } from "@/shared/database/sqlite";
import { Entry } from "../types/entry";

export async function saveEntry(entry: Entry) {
  const { mood, energy, productivity, comment } = entry;
  db.runSync(
    "INSERT INTO entries (mood, energy, productivity, comment) VALUES (?, ?, ?, ?)",
    [mood, energy, productivity, comment]
  );
}

export async function getAllEntries(): Promise<Entry[]> {
  const result = await db.getAllAsync<Entry>("SELECT * FROM entries");
  console.log(result);
  return result;
}

export async function resetDatabase() {
  db.execSync("DROP TABLE IF EXISTS entries");
  setUpDatabase();
}

export async function getMonthEntries(month: number): Promise<Entry[]>{
  const result = await db.getAllAsync<Entry>("SELECT * FROM entries")
  // console.log(result);
  return result
}