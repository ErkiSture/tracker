import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { useEntries } from "@/shared/contexts/entryContext";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Text } from "react-native";
import CalendarView from "./calendar/CalendarView";
import EntryHistory from "./History/EntryHistory";

export default function StatisticsScreen() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const { metrics } = useMetrics()
  const { entries } = useEntries();

  const hasMetrics = metrics.length > 0;
  const hasEntries = Object.keys(entries).length > 0;
  
  //Can't wrap EntryHistory in hasEntries check because then it wouldn't be able to check for metric changes(since it wouldn't be loaded)
  //Instead, returns nothing if no entries are found
  return (
    <>
      { hasMetrics && (
        <CalendarView/>
      )}

      <EntryHistory/> 

      { !hasEntries && !hasMetrics && (
        <Text style= {commonStyles.text}>Create a metric and save your daily form to see statistics</Text>
      )}
    </>
  )
}