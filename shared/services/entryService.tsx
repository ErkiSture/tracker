import * as entryRepository from "../repositories/entryRepository";
import { checkEntryExistsByDate } from "../repositories/entryRepository";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";

export async function saveEntry(entry: CreateEntry, date: string): Promise<Entry> {
  
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
  const entryExists = await checkEntryExistsByDate(date);

  if (entryExists) {
    throw new Error("An entry already exists for today");
  }

  const entryToSave: CreateEntry = {
    ...entry,
    comment,
  };

  const savedEntry = await entryRepository.saveEntry(entryToSave, date);
  return savedEntry 
}

export async function getRecentEntries(amount: number): Promise<Entry[]> {
  return await entryRepository.getRecentEntries(amount)
}

export async function removeEntry(id: number): Promise<void> {
  const removed = await entryRepository.removeEntry(id);
  
  if (!removed) {
    throw new Error("Entry does not exist");
  }
}

export async function getMonthEntries(year: number, month: number): Promise<Entry[]> {
  return await entryRepository.getMonthEntries(year, month);
}

// export async function getAllEntries() {
//   return await entryRepository.getAllEntries();
// }

