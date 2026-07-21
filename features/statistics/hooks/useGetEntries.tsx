import * as entryService from "../../../shared/services/entryService";

export default function useGetEntries() {
  async function getMonthEntries(month: number) {
    return entryService.getMonthEntries(month);
  }

  return { getMonthEntries }
}