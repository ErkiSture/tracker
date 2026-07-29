import { Metric } from "@/features/metrics/types/metric";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import useMonthEntries from "../../hooks/useMonthEntries";
import { getDaysInMonth, mapEntriesByDay } from "../../utils/calendar";
import CalendarGridCell from "./CalendarGridCell";
import EntryDetailsModal from "./EntryDetailsModal";

type Props = {
  month: number;
  year: number;
  metric: Metric;
}

export default function CalendarGrid({ month, year, metric }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  const [ selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const monthEntries = useMonthEntries(year, month)

  const entryMap = useMemo(
    () => mapEntriesByDay(monthEntries),
    [monthEntries]
  );

  const daysInMonth = getDaysInMonth(year, month);
  
  const cells = [];
  // Create cells for the grid
  for (let day = 1; day <= daysInMonth; day++) {
    const entry = entryMap.get(day);

    cells.push(
      <CalendarGridCell 
        key={day} 
        rating={entry?.metrics[metric.id]?.value ?? null}
        metric={metric}
        onPress={() => setSelectedEntry(entry ?? null)}
      />
    );
  }

  return (
    <>
      <View style={styles.grid}>
        {cells}
      </View>
      <EntryDetailsModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
  }
});