import * as entryService from "../services/entryService";

export function useEntries() {
  async function getAllEntries() {
    return await entryService.getAllEntries();
  }

  return { getAllEntries };
}