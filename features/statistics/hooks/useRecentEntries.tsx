import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEntries } from "@/shared/contexts/entryContext";
import { Entry } from "@/shared/types/entry";
import { useEffect, useMemo } from "react";
import { getRecentEntriesFromState } from "../utils/getRecentEntriesFromState";

export default function useRecentEntries(amount: number): Entry[] {
  const { entries, ensureRecentLoaded } = useEntries();
  const { metrics } = useMetrics();

  useEffect(() => {
    ensureRecentLoaded(amount);
  }, [amount, metrics]);

  return useMemo(
    () => getRecentEntriesFromState(entries, amount),
    [entries, amount]
  );
}