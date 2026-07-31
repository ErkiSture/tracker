import { Entry } from "@/features/entries/types/entry";
import { Metric } from "@/features/metrics/types/metric";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import getDateFormatted from "@/shared/util/getDateFormatted";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import useMonthEntries from "../../hooks/useMonthEntries";
import { getDaysInMonth, mapEntriesByDay } from "../../utils/calendar";
import CalendarGridCell from "./CalendarGridCell";
import DetailsModal from "./detailsModal/DetailsModal";

type Props = {
  month: number;
  year: number;
  metric: Metric;
}

export default function CalendarGrid({ month, year, metric }: Props) {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);
  
  const [ selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [ selectedDate, setSelectedDate ] = useState<string | null>(null);
  const [ showDetails, setShowDetails ] = useState<boolean>(false);

  const monthEntries = useMonthEntries(year, month)

  const entryMap = useMemo(
    () => mapEntriesByDay(monthEntries),
    [monthEntries]
  );

  const daysInMonth = getDaysInMonth(year, month);

  // Create cells for the grid
  const cells = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const entry = entryMap.get(day);

    const entryDate = getDateFormatted(year, month, day);

    cells.push(
      <CalendarGridCell 
        key={day} 
        rating={entry?.metrics[metric.id]?.value ?? null}
        metric={metric}
        onPress={() => {
          setSelectedEntry(entry ?? null);
          setSelectedDate(entryDate);
          setShowDetails(true);
        }}
      />
    );
  }

  return (
    <>
      <View style={styles.grid}>
        {cells}
      </View>

      { selectedDate && (
        <DetailsModal
          entry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          date={selectedDate}
        />
      )}
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