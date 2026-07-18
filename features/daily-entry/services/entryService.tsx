import * as entryStorage from "../storage/entryStorage";
import { Entry } from "../types/entry";

export async function saveEntry(entry: Entry) {
  // Perform any necessary validation or transformation of the entry data here
  await entryStorage.saveEntry(entry);
}

export async function getAllEntries(): Promise<Entry[]> {
  const entries = await entryStorage.getAllEntries();
  return entries;
}