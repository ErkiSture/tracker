// Format a Date object into YYYY-MM-DD format
import formatDate from "./formatDate";

export default function formatDateObject(date: Date): string {
  return formatDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
}