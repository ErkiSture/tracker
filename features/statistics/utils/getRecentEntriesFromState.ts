// import { Entry } from "@/shared/types/entry";

import { Entry } from "@/shared/types/entry";

// export function getRecentEntries(
//   entries: Entry[],
//   amount: number
// ): Entry[] {
//   return [...entries]
//     .sort(
//       (a, b) =>
//         new Date(b.created_at).getTime() -
//         new Date(a.created_at).getTime()
//     )
//     .slice(0, amount);
// }





// import { Entry } from "@/shared/types/entry";

// export function getRecentEntriesFromState(
//   entries: Record<string, Entry>,
//   amount: number
// ): Entry[] {
//   const start = performance.now();
//   const result = Object.values(entries)
//     .sort(
//       (a, b) =>
//         new Date(b.created_at).getTime() -
//         new Date(a.created_at).getTime()
//     )
//     .slice(0, amount);
//   const end = performance.now();
//   console.log(`getRecentEntriesFromState took ${end - start} ms`);
//   return result
// }




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

    const key = date.toISOString().split("T")[0];
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