import { Metric } from "@/shared/types/metric";
import { useState } from "react";
import { View } from "react-native";
import CalendarGrid from "./CalendarGrid";
import CalendarMonthSelector from "./CalendarMetricSelector";
import CalendarMetricSelector from "./CalendarMonthSelector";
export default function CalendarView() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedMetric, setSelectedMetric] = useState<Metric>("mood");

  return (
    <View>
      <CalendarMonthSelector></CalendarMonthSelector>
      <CalendarMetricSelector></CalendarMetricSelector>
      <CalendarGrid month={currentMonth} year={currentYear} metric={"mood"}></CalendarGrid>
    </View>
  )
}