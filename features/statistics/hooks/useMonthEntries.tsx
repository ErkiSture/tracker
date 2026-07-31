import { useEntries } from "@/features/entries/contexts/entryContext";
import { Entry } from "@/features/entries/types/entry";
import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEffect, useMemo } from "react";
import { getEntriesForMonthFromState } from "../utils/getEntriesForMonthFromState";

export default function useMonthEntries(year: number, month: number): Entry[] {
  const { entries, ensureMonthLoaded, ensureRecentLoaded } = useEntries();
  const { metrics } = useMetrics()

  useEffect(() => {
    ensureMonthLoaded(year, month);
  }, [year, month, metrics]);

  const monthEntries = useMemo(
    () => getEntriesForMonthFromState(entries, year, month),
    [entries, year, month]
  );

  return monthEntries
}