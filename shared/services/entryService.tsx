import * as entryStorage from "../storage/entryRepository";
import { getEntryByDate } from "../storage/entryRepository";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";
import getTodayDateFormatted from "../util/getTodayDateFormatted";

export async function saveEntry(entry: CreateEntry) {  
  if (entry.mood < 1 || entry.mood > 10) {
    throw new Error("Mood must be between 1 and 10");
  }

  if (entry.energy < 1 || entry.energy > 10) {
    throw new Error("Energy must be between 1 and 10");
  }

  if (entry.productivity < 1 || entry.productivity > 10) {
    throw new Error("Productivity must be between 1 and 10");
  }

  if (entry.comment && entry.comment.length > 500) {
    throw new Error("Comment must be less than 500 characters");
  }

  // Convert empty comment to null before saving
  const raw = (entry.comment ?? "").trim();
  const comment = raw === "" ? null : raw;

  // Only let one entry per day exist
  const currentDate = getTodayDateFormatted()
  const entryExists = await getEntryByDate(currentDate);

  if (entryExists) {
    console.log(3424234)
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

export async function getMonthEntries(month: number): Promise<Entry[]> {
  const entries = await entryStorage.getMonthEntries(month);
  return entries;
}