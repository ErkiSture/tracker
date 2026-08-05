import { useEntries } from "@/features/entries/contexts/entryContext";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as metricService from "../services/metricService";
import { Metric } from "../types/metric";

type MetricContextType = {
  metrics: Metric[]
  activeMetrics: Metric[]
  inactiveMetrics: Metric[]
  refreshMetrics: () => Promise<void>
  addMetric: (name: string) => Promise<void>
  removeMetric: (id: number) => Promise<void>
  renameMetric: (id: number, newName: string) => Promise<void>
  toggleMetricStatus: (id: number) => Promise<void>
}

const MetricContext = createContext<MetricContextType>({
  metrics: [],
  activeMetrics: [],
  inactiveMetrics: [],
  refreshMetrics: async () => {},
  addMetric: async () => {},
  removeMetric: async () => {},
  renameMetric: async () => {},
  toggleMetricStatus: async () => {}
})

export function MetricProvider({ children }: { children: React.ReactNode }) {

  const [metrics, setMetrics] = useState<Metric[]>([]);

  const activeMetrics = useMemo(() => metrics.filter(metric => metric.status === 'active'), [metrics]);
  const inactiveMetrics = useMemo(() => metrics.filter(metric => metric.status === 'inactive'), [metrics]);

  const { resetEntries } = useEntries()

  async function refreshMetrics() {
    const metrics = await metricService.getMetrics();
    setMetrics(metrics);
  }

  async function addMetric(name: string) {
    await metricService.addMetric(name);
    refreshMetrics();
  }

  async function toggleMetricStatus(id: number) {
    await metricService.toggleMetricStatus(id);
    resetEntries();
    refreshMetrics();
    console.log(`Toggled status for metric with id ${id}`);
  }

  async function removeMetric(id: number) {
    await metricService.removeMetric(id);
    resetEntries();
    refreshMetrics();
  }

  async function renameMetric(id: number, newName: string) {
    await metricService.renameMetric(id, newName);
    refreshMetrics();
  }

  useEffect(() => {
    refreshMetrics();
  }, [])
  
  return (
    <MetricContext.Provider value={{ metrics, activeMetrics, inactiveMetrics, refreshMetrics, addMetric, removeMetric, renameMetric, toggleMetricStatus }}>
      {children}
    </MetricContext.Provider>
  )
}

export const useMetrics = () => useContext(MetricContext);