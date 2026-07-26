import { Metric, metrics } from "@/shared/types/metric";
import { useState } from "react";
import { View } from "react-native";
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import DropDownMenu from "./DropDownMenu";

export default function CalendarView() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedMetric, setSelectedMetric] = useState<Metric>("mood");

  function previousMonth() {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  }

  return (
    <View>
    <CalendarHeader
      month={selectedMonth}
      year={selectedYear}
      onPreviousMonth={previousMonth}
      onNextMonth={nextMonth}
    />      
      {/* <DropDownMenu options={months} selected={selectedMonth} onSelect={setSelectedMetric} ></DropDownMenu> */}
      {/* <CalendarMetricSelector selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric}></CalendarMetricSelector> */}
      <DropDownMenu options={metrics} selected={selectedMetric} onSelect={setSelectedMetric} ></DropDownMenu>
      <CalendarGrid month={selectedMonth} year={selectedYear} metric={selectedMetric}></CalendarGrid>
    </View>
  )
}