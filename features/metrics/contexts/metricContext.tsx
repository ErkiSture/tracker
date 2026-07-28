import { createContext, useContext, useEffect, useState } from "react";
import * as metricService from "../service/metricService";
import { Metric } from "../types/metric";

type MetricContextType = {
  metrics: Metric[]
  refreshMetrics: () => Promise<void>
  addMetric: () => Promise<void>
  removeMetric: () => Promise<void>
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

  function addMetric() {
    
  }

  function removeMetric() {

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