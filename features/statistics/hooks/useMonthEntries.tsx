import { useEntries } from "@/shared/contexts/entryContext";
import { Entry } from "@/shared/types/entry";
import { useEffect, useMemo } from "react";
import { getEntriesForMonthFromState } from "../utils/getEntriesForMonthFromState";

export default function useMonthEntries(year: number, month: number): Entry[] {
  const { entries, ensureMonthLoaded } = useEntries()

  useEffect(() => {
    ensureMonthLoaded(year, month);
  }, [year, month])

  const monthEntries = useMemo(
    () => getEntriesForMonthFromState(entries, year, month),
    [entries, year, month]
  );

  return monthEntries
}