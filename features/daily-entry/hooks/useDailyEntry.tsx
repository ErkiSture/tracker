import * as entryService from "../../../shared/services/entryService";
import { Entry } from "../../../shared/types/entry";

export function useDailyEntry() {
  // TODO: add load and error handling states

  async function saveDailyEntry(entry: Entry) {
    await entryService.saveEntry(entry);
  }

  return { saveDailyEntry };
}