// Format separate date parts into YYYY-MM-DD format
export default function formatDate(
  year: number,
  month: number,
  day: number
): string {
  return [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}