import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import { Metric } from "@/shared/types/metric";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import useGetEntries from "../../hooks/useGetEntries";
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
  const [ entries, setEntries ] = useState<Entry[] | null>(null);
  const { getMonthEntries } = useGetEntries()
  
  async function loadEntries() {
    const start = Date.now();
    const entries = await getMonthEntries(year, month);
    const end = Date.now();
    console.log(`Loading entries: ${end - start} ms`);
    setEntries(entries);
  }
  
  // Cells are reloaded on page visit since a new entry might have been added
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [year, month])
  );  
  
  const daysInMonth = getDaysInMonth(year, month)
  const entryMap = mapEntriesByDay(entries ?? []);
  const cells = [];
  
  if (entries) {
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