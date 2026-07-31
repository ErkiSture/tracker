import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEntries } from "@/shared/contexts/entryContext";
import { Entry } from "@/shared/types/entry";
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