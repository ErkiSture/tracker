import { Metric } from "@/shared/types/metric";

export default function getColor(rating: number | null, theme, metric: Metric): string {
  if (rating === null) return theme.colors.text;

  const intensity = rating / 10; // 0.1 - 1

  return `rgba(0, 180, 0, ${intensity})`;
}