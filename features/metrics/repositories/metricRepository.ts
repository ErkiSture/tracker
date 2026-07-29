import { db } from "@/shared/database/sqlite";
import { Metric } from "../types/metric";

const MAX_METRICS = 15;

export async function getMetrics(): Promise<Metric[]> {
  const metrics = await db.getAllAsync<Metric>(`SELECT * FROM metrics`)
  return metrics
}

export async function metricExists(name: string): Promise<boolean> {
  const result = await db.getFirstAsync<{ count: number }>(
    `
    SELECT COUNT(*) as count
    FROM metrics
    WHERE name = ?
    `,
    [name]
  );

  return (result?.count ?? 0) > 0;
}

export async function addMetric(name: string): Promise<void> {
  const result = await db.runAsync(
    `
    INSERT INTO metrics (name)
    VALUES (?)
    `,
    [name]
  );
}

export async function removeMetric(id: number): Promise<boolean> {
  const result = await db.runAsync(
    `
    DELETE FROM metrics
    WHERE id = ?
    `,
    [id]
  );

  return result.changes > 0
}

export async function getMetricCount(): Promise<number> {
  const result = await db.getFirstAsync<{ count: number }>(
    `
    SELECT COUNT(*) as count
    FROM metrics
    `
  );

  return result?.count ?? 0;
}