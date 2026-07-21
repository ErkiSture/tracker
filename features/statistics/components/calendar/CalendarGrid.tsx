import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { Entry } from "@/shared/types/entry";
import { Metric } from "@/shared/types/metric";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import useGetEntries from "../../hooks/useGetEntries";
import CalendarGridCell from "./CalendarGridCell";

type Props = {
  month: number;
  year: number;
  metric: Metric;
}

export default function CalendarGrid({ month, year, metric }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const [ entries, setEntries ] = useState<Entry[] | null>(null);
  const { getMonthEntries } = useGetEntries()
  
  async function loadEntries() {
    const entries = await getMonthEntries(month);
    setEntries(entries);
  }
  
  useEffect(() => {
    loadEntries();
  }, [])

  // Cells are reloaded on page visit since a new entry might have been added
  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );  

  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [];
  
  if (entries) {
    // Map every entry to day of month
    const entryMap = new Map(
      entries.map(entry => [
        new Date(entry.created_at).getDate(), 
        entry,
      ])
    );
    
    // Create cells for the grid
    for (let day = 1; day <= daysInMonth; day++) {
      const entry = entryMap.get(day);
      const rating = entry?.[metric] ?? null;
      const cell = <CalendarGridCell key={day} rating={rating} metric={metric}/>;
      cells.push(cell);
    }
  }

  return (
    <View style={styles.grid}>
      {cells}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
  }
});