import * as entryService from "../../../shared/services/entryService";

export default function useGetEntries() {
  async function getMonthEntries(year: number, month: number) {
    return entryService.getMonthEntries(year, month);
  }

  return { getMonthEntries }
}