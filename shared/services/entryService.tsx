import * as entryStorage from "../repositories/entryRepository";
import { getEntryByDate } from "../repositories/entryRepository";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";
import getCurrentDateFormatted from "../util/getCurrentDateFormatted";

export async function saveEntry(entry: CreateEntry) {
  
  for (const [key, value] of Object.entries(entry.values)) {
    if (value < 1 || value > 10) {
      throw new Error("Ratings must be between 1 and 10")
    }
  }
  
  if (entry.comment && entry.comment.length > 500) {
    throw new Error("Comment must be less than 500 characters");
  }

  // Convert empty comment to null before saving
  const raw = (entry.comment ?? "").trim();
  const comment = raw === "" ? null : raw;

  // Only let one entry per day exist
  const currentDate = getCurrentDateFormatted()
  const entryExists = await getEntryByDate(currentDate);

  if (entryExists) {
    throw new Error("An entry already exists for today");
  }

  const entryToSave: CreateEntry = {
    ...entry,
    comment,
  };

await entryStorage.saveEntry(entryToSave);}

export async function getAllEntries(): Promise<Entry[]> {
  const entries = await entryStorage.getAllEntries();
  return entries;
}

export async function getMonthEntries(year: number, month: number): Promise<Entry[]> {
  const entries = await entryStorage.getMonthEntries(year, month);
  return entries;
}