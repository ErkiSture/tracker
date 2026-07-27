import { db } from "@/shared/database/sqlite";
import { Metric } from "../types/metric";

export async function getMetrics(): Promise<Metric[]> {
  const metrics = await db.getAllAsync<Metric>(`SELECT * FROM metrics`)
  return metrics
}