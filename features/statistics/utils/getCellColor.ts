import { Metric } from "@/shared/types/metric";
import { ThemeColors } from "@/shared/types/themeColors";

const RGB = {
  r: 0,
  g: 55,
  b: 255,
}

export default function getCellColor(rating: number | null, themeColors: ThemeColors, metric: Metric): string {
  if (rating === null) return "transparent";

  const intensity = rating / 10; // 0.1 - 1

  return `rgba(${RGB.r}, ${RGB.g}, ${RGB.b}, ${intensity})`;
}