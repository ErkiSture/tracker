import { db } from "@/shared/database/sqlite";
import { Metric } from "../types/metric";

export async function getMetrics(): Promise<Metric[]> {
  const metrics = await db.getAllAsync<Metric>(`SELECT * FROM metrics`);
  return metrics;
}

export async function addMetric(name: string): Promise<void> {
  await db.runAsync(
    `
    INSERT INTO metrics (name)
    VALUES (?)
    `,
    [name]
  );
}

export async function metricExists(name: string): Promise<boolean> {
  const result = await db.getFirstAsync<{ id: number }>(
    `
    SELECT id
    FROM metrics
    WHERE name = ?
    `,
    [name]
  );

  return result !== null;
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

export async function toggleMetricStatus(id: number) {
  const metric = await db.getFirstAsync<Metric>(
    `
    SELECT *
    FROM metrics
    WHERE id = ?
    `,
    [id]
  );
  
  const newStatus = metric.status === 'active' ? 'inactive' : 'active';
  await db.runAsync(
    `
    UPDATE metrics
    SET status = ?
    WHERE id = ?
    `,
    [newStatus, id]
  );
}
