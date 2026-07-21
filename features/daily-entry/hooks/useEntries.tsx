import * as entryService from "../../../shared/services/entryService";

export function useEntries() {
  async function getAllEntries() {
    return await entryService.getAllEntries();
  }

  return { getAllEntries };
}