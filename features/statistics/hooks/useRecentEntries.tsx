import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEntries } from "@/shared/contexts/entryContext";
import { useEffect, useMemo, useState } from "react";
import { getRecentEntriesFromState } from "../utils/getRecentEntriesFromState";

export default function useRecentEntries(amount: number) {
  const { entries, ensureRecentLoaded, entriesOrdered } = useEntries();
  const { metrics } = useMetrics();
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      await ensureRecentLoaded(amount);
      setLoading(false);
    }
    load();
  }, [amount, metrics]);

  const recentEntries = useMemo(
    () => getRecentEntriesFromState(entriesOrdered, amount),
    [entries, amount]
  );

  return { recentEntries, loading }
}