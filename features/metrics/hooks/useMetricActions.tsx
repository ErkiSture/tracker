import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useState } from "react";

export default function useMetricActions() {
  const {
    addMetric: save,
    removeMetric: remove,
    renameMetric: update,
    toggleMetricStatus: toggleStatus,
  } = useMetrics();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function createMetric(name: string) {
    try {
      setLoading(true);      
      await save(name);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function removeMetric(id: number) {
    try {
      setLoading(true);
      await remove(id);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateMetric(id: number, name: string) {
    try {
      setLoading(true);
      await update(id, name);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function toggleMetricStatus(id: number) {
    try {
      setLoading(true);
      await toggleStatus(id);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  
  return {
    createMetric,
    removeMetric,
    updateMetric,
    toggleMetricStatus,
    setError,
    loading,
    error,
  };
}
