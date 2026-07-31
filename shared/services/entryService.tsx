import * as entryRepository from "../repositories/entryRepository";
import { CreateEntry } from "../types/createEntry";
import { Entry } from "../types/entry";

export async function saveEntry(entry: CreateEntry): Promise<Entry> {
  
  for (const value of Object.values(entry.values)){
    if (value < 1 || value > 10) {
      throw new Error("Ratings must be between 1 and 10");
    }
  }
  
  const comment = (entry.comment ?? "").trim();

  if (comment.length > 500) {
    throw new Error("Comment must be less than 500 characters");
  }

  // Only let one entry per day exist
  const entryExists = await entryRepository.checkEntryExistsByDate(entry.date);

  if (entryExists) {
    throw new Error("An entry already exists for this date");  
  }

  const entryToSave: CreateEntry = {
    ...entry,
    comment,
  };

  const savedEntry = await entryRepository.saveEntry(entryToSave);
  return savedEntry;
}

export async function removeEntry(id: number): Promise<void> {
  const removed = await entryRepository.removeEntry(id);
  
  if (!removed) {
    throw new Error("Entry does not exist");
  }
}

export async function updateEntry(id: number, entry: CreateEntry): Promise<Entry> {
  return await entryRepository.updateEntry(id, entry);
}

export async function getMonthEntries(year: number, month: number): Promise<Entry[]> {
  if (month < 1 || month > 12) {
    throw new Error("Invalid month");
  }

  return await entryRepository.getMonthEntries(year, month);
}

export async function getRecentEntries(amount: number): Promise<Entry[]> {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await entryRepository.getRecentEntries(amount)
}

export async function getEntriesByDateRange(start: string, end: string): Promise<Entry[]> {
  return await entryRepository.getEntriesByDateRange(start, end);
}

export async function getEntries(offset: number, limit: number): Promise<Entry[]>{
  return await entryRepository.getEntries(offset, limit);
}

export async function checkEntryExistsByDate(date: string): Promise<boolean>{
  return await entryRepository.checkEntryExistsByDate(date);
}