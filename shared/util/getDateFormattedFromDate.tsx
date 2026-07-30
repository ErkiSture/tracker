import getDateFormatted from "./getDateFormatted";

export default function getDateFormattedFromDate(date: Date): string {
  return getDateFormatted(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
}