import { createContext, useContext, useEffect, useState } from "react";
import * as metricService from "../services/metricService";
import { Metric } from "../types/metric";

type MetricContextType = {
  metrics: Metric[]
  refreshMetrics: () => Promise<void>
}

const MetricContext = createContext<MetricContextType>({
  metrics: [],
  refreshMetrics: async () => {}
})

export function MetricProvider({ children }: { children: React.ReactNode }) {

  const [metrics, setMetrics] = useState<Metric[]>([])

  async function refreshMetrics() {
    const metrics = await metricService.getMetrics();
    setMetrics(metrics);
  }
  
  useEffect(() => {
    refreshMetrics();
  }, [])
  
  return (
    <MetricContext.Provider value={{ metrics, refreshMetrics }}>
      {children}
    </MetricContext.Provider>
  )
}

export const useMetrics = () => useContext(MetricContext);