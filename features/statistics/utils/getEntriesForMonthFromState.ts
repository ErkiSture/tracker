// import { Entry } from "@/shared/types/entry";

// export function getEntriesForMonth(
//   entries: Entry[],
//   year: number,
//   month: number
// ): Entry[] {
//   return entries.filter(entry => {
//     const date = new Date(entry.created_at);

//     return (
//       date.getFullYear() === year &&
//       date.getMonth() + 1 === month
//     );
//   });
// }





// import { Entry } from "@/shared/types/entry";

// export function getEntriesForMonthFromState(
//   entries: Record<string, Entry>,
//   year: number,
//   month: number
// ): Entry[] {
//   const start = performance.now();
//   const result = Object.values(entries).filter(entry => {
//     const date = new Date(entry.created_at);

//     return (
//       date.getFullYear() === year &&
//       date.getMonth() + 1 === month
//     );
//   });
//   const end = performance.now();
//   console.log(`getEntriesForMonthFromState took ${end - start} ms`);
//   return result
// }




import { Entry } from "@/shared/types/entry";

export function getEntriesForMonthFromState(
  entries: Record<string, Entry>,
  year: number,
  month: number
): Entry[] {
  const start = performance.now();

  const result: Entry[] = [];

  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const entry = entries[key];

    if (entry) {
      result.push(entry);
    }
  }

  const end = performance.now();
  console.log(`getEntriesForMonthFromState took ${end - start} ms`);

  return result;
}