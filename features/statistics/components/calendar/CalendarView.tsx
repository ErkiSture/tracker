import { useMetrics } from "@/features/metrics/contexts/metricContext";
import { Metric } from "@/features/metrics/types/metric";
import { useTheme } from "@/shared/contexts/themeContext";
import { createCommonStyles } from "@/shared/styles/common";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import DropDownMenu from "./DropDownMenu";

export default function CalendarView() {
  const { themeColors } = useTheme();
  const commonStyles = createCommonStyles(themeColors);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

  const { metrics } = useMetrics();

  useEffect(() => {
    if (metrics.length === 0) {
      setSelectedMetric(null);
      return;
    }

    const selectedStillExists = metrics.some(
      (metric) => metric.id === selectedMetric?.id
    );

    if (!selectedStillExists) {
      setSelectedMetric(metrics[0]);
    }
  }, [metrics]);

  function previousMonth() {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((year) => year - 1);
    } else {
      setSelectedMonth((month) => month - 1);
    }
  }

  function nextMonth() {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((year) => year + 1);
    } else {
      setSelectedMonth((month) => month + 1);
    }
  }

  if (!selectedMetric) return;

  return (
    <View style={commonStyles.sectionCard}>
      <CalendarHeader
        month={selectedMonth}
        year={selectedYear}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />

      <>
        <DropDownMenu
          options={metrics}
          selected={selectedMetric}
          onSelect={setSelectedMetric}
        />

        <CalendarGrid
          month={selectedMonth}
          year={selectedYear}
          metric={selectedMetric}
        />
      </>
    </View>
  )
}