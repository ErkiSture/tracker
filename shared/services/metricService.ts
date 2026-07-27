import * as metricRepository from "../repositories/metricRepository";

export async function getMetrics() {
  return await metricRepository.getMetrics();
}