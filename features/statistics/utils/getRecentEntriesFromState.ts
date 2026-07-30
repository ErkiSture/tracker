import { Entry } from "@/shared/types/entry";
import getDateFormattedFromDate from "@/shared/util/getDateFormattedFromDate";

export function getRecentEntriesFromState(
  entries: Record<string, Entry>,
  amount: number
): Entry[] {
  const start = performance.now();

  const result: Entry[] = [];
  const date = new Date();

  const maxDaysToSearch = 365 * 5; // safety limit

  for (let i = 0; i < maxDaysToSearch; i++) {
    if (result.length >= amount) {
      break;
    }

    const key = getDateFormattedFromDate(date)
    const entry = entries[key];

    if (entry) {
      result.push(entry);
    }

    date.setDate(date.getDate() - 1);
  }

  const end = performance.now();
  console.log(`getRecentEntriesFromState took ${end - start} ms`);
  return result;
}