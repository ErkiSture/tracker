import * as metricRepository from "@/features/metrics/repositories/metricRepository";
import { Metric } from "../types/metric";

const MAX_METRICS = 20;

export async function getMetrics(): Promise<Metric[]> {
  return await metricRepository.getMetrics();
}

export async function addMetric(name: string): Promise<void> {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Metric name cannot be empty");
  }

  // Check that metric with same name doesn't already exist
  const exists = await metricRepository.metricExists(trimmedName);
  if (exists) {
    throw new Error("Metric already exists");
  }

  // Limit number of metrics
  const metricCount = await metricRepository.getMetricCount();
  if (metricCount >= MAX_METRICS) {
    throw new Error(`Maximum of ${MAX_METRICS} metrics reached`);
  }

  await metricRepository.addMetric(trimmedName);
}

export async function removeMetric(id: number): Promise<void> {
  const removed = await metricRepository.removeMetric(id);

  if (!removed) {
    throw new Error("Metric doesn't exist");
  }
}

export async function toggleMetricStatus(id: number) {
  await metricRepository.toggleMetricStatus(id);
}
