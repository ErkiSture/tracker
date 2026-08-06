import { Entry } from "@/features/entries/types/entry";

export function getRecentEntriesFromState(
  entriesOrdered: Entry[],
  amount: number
): Entry[] {
  const start = performance.now();

  const result = entriesOrdered.slice(0, amount);

  const end = performance.now();
  console.log(`getRecentEntriesFromState took ${end - start} ms`);

  return result;
}