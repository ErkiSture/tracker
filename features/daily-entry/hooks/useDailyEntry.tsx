import * as entryService from "../services/entryService";
import { Entry } from "../types/entry";

export function useDailyEntry() {
  // TODO: add load and error handling states

  async function saveDailyEntry(entry: Entry) {
    await entryService.saveEntry(entry);
  }

  return { saveDailyEntry };
}