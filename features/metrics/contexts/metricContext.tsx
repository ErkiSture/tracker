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

  async function refreshMetrics() {
    const metrics = await metricService.getMetrics();
    setMetrics(metrics);
  }

  async function addMetric(name: string) {
    console.log(name);
    await metricService.addMetric(name);
    refreshMetrics();
  }

  async function removeMetric(id: number) {
    console.log(id);
    await metricService.removeMetric(id);
    refreshMetrics();
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