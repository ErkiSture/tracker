// import { Entry } from "@/shared/types/entry";
// import getDateFormattedFromDate from "@/shared/util/getDateFormattedFromDate";

// export function getRecentEntriesFromState(
//   entries: Record<string, Entry>,
//   amount: number
// ): Entry[] {
//   const start = performance.now();

//   const result: Entry[] = [];
//   const date = new Date();

//   const maxDaysToSearch = 365 * 20; // safety limit

//   for (let i = 0; i < maxDaysToSearch; i++) {
//     if (result.length >= amount) {
//       break;
//     }

//     const key = getDateFormattedFromDate(date)
//     const entry = entries[key];

//     if (entry) {
//       result.push(entry);
//     }

//     date.setDate(date.getDate() - 1);
//   }

//   const end = performance.now();
//   console.log(`getRecentEntriesFromState took ${end - start} ms`);
//   return result;
// }



import { Entry } from "@/shared/types/entry";

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