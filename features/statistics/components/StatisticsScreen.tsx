import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text } from "react-native";
import CalendarView from "./calendar/CalendarView";

export default function StatisticsScreen() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { metrics } = useMetrics()

  return (
    <>
      <Text style= {commonStyles.title}>Stats</Text>
      { metrics.length === 0 ? (
        <Text style={commonStyles.text}>
          No metrics created yet
        </Text>
      ) : (
        <CalendarView></CalendarView>  
      )}
    </>
  )
}