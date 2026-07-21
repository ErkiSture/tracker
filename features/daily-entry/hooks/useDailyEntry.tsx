import { CreateEntry } from "@/shared/types/createEntry";
import * as entryService from "../../../shared/services/entryService";

export function useDailyEntry() {
  // TODO: add load and error handling states

  async function saveDailyEntry(entry: CreateEntry) {
    await entryService.saveEntry(entry);
  }

  return { saveDailyEntry };
}