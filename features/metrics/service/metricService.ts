import * as metricRepository from "@/features/metrics/repositories/metricRepository";
import { Metric } from "../types/metric";

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

  await metricRepository.addMetric(trimmedName);
}

export async function removeMetric(id: number): Promise<void> {
  const removed = await metricRepository.removeMetric(id);

  if (!removed) {
    throw new Error("Metric doesn't exist");
  }
}