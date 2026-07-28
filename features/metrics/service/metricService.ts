import * as metricRepository from "@/features/metrics/repositories/metricRepository";

export async function getMetrics() {
  return await metricRepository.getMetrics();
}