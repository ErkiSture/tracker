import { useEntries } from "@/shared/contexts/entryContext";
import { createContext, useContext, useEffect, useState } from "react";
import * as metricService from "../service/metricService";
import { Metric } from "../types/metric";

type MetricContextType = {
  metrics: Metric[]
  refreshMetrics: () => Promise<void>
  addMetric: (name: string) => Promise<void>
  removeMetric: (id: number) => Promise<void>
}

const MetricContext = createContext<MetricContextType>({
  metrics: [],
  refreshMetrics: async () => {},
  addMetric: async () => {},
  removeMetric: async () => {},
})

export function MetricProvider({ children }: { children: React.ReactNode }) {

  const [metrics, setMetrics] = useState<Metric[]>([])
  const { resetEntries } = useEntries()

  async function refreshMetrics() {
    const metrics = await metricService.getMetrics();
    setMetrics(metrics);
  }

  async function addMetric(name: string) {
    await metricService.addMetric(name);
    refreshMetrics();
  }

  async function removeMetric(id: number) {
    await metricService.removeMetric(id);
    await resetEntries();
    refreshMetrics();
    console.log("metriContext removeMetric")
  }
  
  useEffect(() => {
    refreshMetrics();
  }, [])
  
  return (
    <MetricContext.Provider value={{ metrics, refreshMetrics, addMetric, removeMetric }}>
      {children}
    </MetricContext.Provider>
  )
}

export const useMetrics = () => useContext(MetricContext);