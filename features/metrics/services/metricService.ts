import * as metricRepository from "@/features/metrics/repositories/metricRepository";
import { Metric } from "../types/metric";

const MAX_METRICS = 20;
const MAX_METRIC_NAME_LENGTH = 50;

export async function getMetrics(): Promise<Metric[]> {
  return await metricRepository.getMetrics();
}

export async function addMetric(name: string): Promise<void> {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Metric name cannot be empty");
  }

  if (trimmedName.length > MAX_METRIC_NAME_LENGTH) {
    throw new Error(`Metric name must be less than ${MAX_METRIC_NAME_LENGTH} characters`);
  }

  // Check that metric with same name doesn't already exist
  const exists = await metricRepository.metricExists(trimmedName);
  if (exists) {
    throw new Error("Metric with that name already exists");
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

export async function renameMetric(id: number, newName: string): Promise<void> {
  const trimmedName = newName.trim();

  if (!trimmedName) {
    throw new Error("Metric name cannot be empty");
  }

  if (trimmedName.length > MAX_METRIC_NAME_LENGTH) {
    throw new Error(`Metric name must be less than ${MAX_METRIC_NAME_LENGTH} characters`);
  }

  const exists = await metricRepository.metricExists(trimmedName);
  if (exists) {
    throw new Error("Metric with that name already exists");
  }

  await metricRepository.renameMetric(id, trimmedName);
}