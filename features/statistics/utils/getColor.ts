import { Metric } from "@/shared/types/metric";
import { ThemeColors } from "@/shared/types/themeColors";

export default function getColor(rating: number | null, themeColors: ThemeColors, metric: Metric): string {
  if (rating === null) return themeColors.text;

  const intensity = rating / 10; // 0.1 - 1

  return `rgba(0, 180, 0, ${intensity})`;
}