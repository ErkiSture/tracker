import * as entryService from "../services/entryService";
import { Entry } from "../types/entry";

export function useDailyEntry() {
  async function saveDailyEntry(entry: Entry) {
    await entryService.saveEntry(entry);
  }

  return { saveDailyEntry };
}